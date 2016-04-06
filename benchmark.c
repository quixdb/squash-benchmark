/* Copyright (c) 2013-2016 The Squash Authors
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use, copy,
 * modify, merge, publish, distribute, sublicense, and/or sell copies
 * of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
 * BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * Authors:
 *   Evan Nemerson <evan@nemerson.com>
 */

#include <stdlib.h>
#include <unistd.h>
#include <stdio.h>
#include <string.h>
#include <strings.h>
#include <assert.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <sys/wait.h>

#include <squash/squash.h>
#include "timer.h"

static double min_exec_time = 5.0;

static FILE* squash_tmpfile (void);
static FILE*
squash_tmpfile (void) {
  /* char template[] = "squash-benchmark-XXXXXX"; */
  /* int fd = mkstemp (template); */
  /* FILE* res = NULL; */

  /* if (fd != -1) { */
  /*   unlink (template); */
  /*   res = fdopen (fd, "w+b"); */
  /* } */

  /* return res; */
  return tmpfile ();
}

static void
print_help_and_exit (const char* executable, int exit_code) {
  fprintf (stdout, "Usage: %s [OPTION]... FILE...\n", executable);
  fprintf (stdout, "Benchmark Squash plugins.\n");
  fprintf (stdout, "\n");
  fprintf (stdout, "Options:\n");
  fprintf (stdout, "\t-h            Print this help screen and exit.\n");
  fprintf (stdout, "\t-c codec      Benchmark the specified codec and exit.\n");
  fprintf (stdout, "\t-o outfile    CSV output file.\n");
  fprintf (stdout, "\t-t time       Minumum execution time in seconds(default: 5.0)\n");

  exit (exit_code);
}

struct BenchmarkContext {
  FILE* input;
  FILE* csv;
  char* input_name;
  long input_size;
};

typedef struct {
  long int compressed_size;
  double compress_cpu;
  double compress_wall;
  double decompress_cpu;
  double decompress_wall;
} SquashBenchmarkResult;

static bool
benchmark_codec_with_options (struct BenchmarkContext* context, SquashCodec* codec, SquashOptions* opts) {
  SquashBenchmarkResult result = { 0, 0.0, 0.0, 0.0, 0.0 };
  bool success = false;
  SquashStatus res = SQUASH_OK;
  const int level = squash_options_get_int (opts, codec, "level");

#if !defined(SQUASH_BENCHMARK_NO_FORK)
  char fifo_name[] = ".squash-benchmark-fifo-XXXXXX";

  assert (mkfifo (mktemp (fifo_name), 0600) == 0);

  if (fork () == 0) {
    int out_descriptor = open (fifo_name, O_WRONLY);
#else
    int descriptors[2];
    assert (pipe (descriptors) == 0);
    int out_descriptor = descriptors[1];
#endif
    FILE* compressed = squash_tmpfile ();
    FILE* decompressed = squash_tmpfile ();
    SquashTimer* timer = squash_timer_new ();
    int iterations = 0;

    if (level < 0) {
      fputs ("    compressing: ", stdout);
    } else {
      fprintf (stdout, "    level %d: ", level);
    }

    if (fseek (context->input, 0, SEEK_SET) != 0) {
      perror ("Unable to seek to beginning of input file");
      exit (-1);
    }

    for ( iterations = 0 ; squash_timer_get_elapsed_cpu (timer) < min_exec_time ; iterations++ ) {


      
      fseek (context->input, 0, SEEK_SET);
      fseek (compressed, 0, SEEK_SET);

      rewind (compressed);
      squash_timer_start (timer);
      res = squash_splice_with_options (codec, SQUASH_STREAM_COMPRESS, compressed, context->input, 0, opts);
      squash_timer_stop (timer);
      rewind (context->input);

      if (res != SQUASH_OK) {
	fprintf (stderr, "ERROR: %s (%d) squash_splice_with_options (%s, compress, %p, %p, 0, %p)\n", squash_status_to_string (res), res, squash_codec_get_name (codec), compressed, context->input, opts);
        break;
      }
    }

    if (res == SQUASH_OK) {
      result.compressed_size = ftell (compressed);
      result.compress_cpu = squash_timer_get_elapsed_cpu (timer) / iterations;
      result.compress_wall = squash_timer_get_elapsed_wall (timer) / iterations;
      squash_timer_reset (timer);

      if (result.compressed_size == 0) {
        fprintf (stdout, "failed (0 byte output, %s [%d]).\n", squash_status_to_string (res), res);
      } else {
        fprintf (stdout, "compressed (%.6fs CPU, %.6fs wall, %ld bytes)... ",
                 result.compress_cpu,
                 result.compress_wall,
                 result.compressed_size);

        for ( iterations = 0 ; squash_timer_get_elapsed_cpu (timer) < min_exec_time ; iterations++ ) {
          fseek (compressed, 0, SEEK_SET);
          fseek (decompressed, 0, SEEK_SET);

          squash_timer_start (timer);
	  res = squash_splice_with_options (codec, SQUASH_STREAM_DECOMPRESS, decompressed, compressed, 0, opts);
          squash_timer_stop (timer);
	  rewind (compressed);

          if (res != SQUASH_OK) {
            break;
          }
        }

        if (res != SQUASH_OK) {
          fprintf (stderr, "Failed (%s [%d]).\n", squash_status_to_string (res), res);
        } else {
          result.decompress_cpu = squash_timer_get_elapsed_cpu (timer) / iterations;
          result.decompress_wall = squash_timer_get_elapsed_wall (timer) / iterations;
          squash_timer_reset (timer);

          if (ftell (decompressed) != context->input_size) {
            /* Should never happen. */
            fprintf (stderr, "Failed (size mismatch; expected %ld, got %ld.\n", context->input_size, ftell (decompressed));
          } else {
            fprintf (stdout, "decompressed (%.6fs CPU, %.6fs wall).\n",
                     result.decompress_cpu,
                     result.decompress_wall);

            write (out_descriptor, &result, sizeof (SquashBenchmarkResult));
          }
        }
      }
    }

    squash_timer_free (timer);
    fclose (compressed);
    fclose (decompressed);

    close (out_descriptor);
#if !defined(SQUASH_BENCHMARK_NO_FORK)
    exit (0);
  } else {
    int in_descriptor = open (fifo_name, O_RDONLY);
#else
    int in_descriptor = descriptors[0];
#endif
    size_t bytes_read = read (in_descriptor, &result, sizeof (SquashBenchmarkResult));
    wait (NULL);
    if (bytes_read == sizeof (SquashBenchmarkResult)) {
      if (context->csv != NULL) {
        if (level >= 0) {
          fprintf (context->csv, "%s,%s,%s,%d,%ld,%ld,%f,%f,%f,%f\r\n",
                   context->input_name,
                   squash_plugin_get_name (squash_codec_get_plugin (codec)),
                   squash_codec_get_name (codec),
                   level,
		   context->input_size,
                   result.compressed_size,
                   result.compress_cpu,
                   result.compress_wall,
                   result.decompress_cpu,
                   result.decompress_wall);
        } else {
          fprintf (context->csv, "%s,%s,%s,,%ld,%ld,%f,%f,%f,%f\r\n",
                   context->input_name,
                   squash_plugin_get_name (squash_codec_get_plugin (codec)),
                   squash_codec_get_name (codec),
		   context->input_size,
                   result.compressed_size,
                   result.compress_cpu,
                   result.compress_wall,
                   result.decompress_cpu,
                   result.decompress_wall);
        }
      }

      success = true;
    }
    close (in_descriptor);
#if !defined(SQUASH_BENCHMARK_NO_FORK)
    unlink (fifo_name);
  }
#endif

  return success;
}

static void
benchmark_codec (SquashCodec* codec, void* data) {
  struct BenchmarkContext* context = (struct BenchmarkContext*) data;
  SquashOptions* opts;
  int level = 0;
  char level_s[4];
  bool have_results = false;

  umask (0100);

  fprintf (stdout, "  %s:%s\n",
           squash_plugin_get_name (squash_codec_get_plugin (codec)),
           squash_codec_get_name (codec));

  opts = squash_options_new (codec, NULL);
  if (opts != NULL) {
    squash_object_ref_sink (opts);
    for ( level = 0 ; level <= 999 ; level++ ) {
      snprintf (level_s, 4, "%d", level);
      if (squash_options_parse_option (opts, "level", level_s) == SQUASH_OK) {
        if (benchmark_codec_with_options (context, codec, opts)) {
          have_results = true;
        }
      }
    }
    squash_object_unref (opts);
  }

  if (!have_results) {
    benchmark_codec_with_options (context, codec, NULL);
  }
}

static void
benchmark_plugin (SquashPlugin* plugin, void* data) {
  /* Since we're often running against the source dir, we will pick up
     plugins which have not been compiled.  This should bail us out
     before trying to actually use them. */
  if (squash_plugin_init (plugin) != SQUASH_OK) {
    return;
  }

  squash_plugin_foreach_codec (plugin, benchmark_codec, data);
}

static SquashCodec*
benchmark_parse_codec (const char* str, SquashOptions** options) {
  SquashCodec* codec;
  char* s = strdup (str);
  char* sp_outer = NULL;
  char* sp_inner = NULL;
  char* cur_opt = NULL;
  char* cur_key = NULL;
  char* cur_val = NULL;
  SquashStatus res;

  char* name = strtok_r (s, "/", &sp_outer);
  codec = squash_get_codec (name);
  if (codec == NULL)
    return NULL;

  while ((cur_opt = strtok_r (NULL, ",", &sp_outer)) != NULL) {
    if (*options == NULL) {
      assert (codec != NULL);
      *options = squash_options_new (codec, NULL);
      squash_object_ref_sink (*options);
    }

    cur_key = strtok_r (cur_opt, "=", &sp_inner);
    cur_val = strtok_r (NULL,    "=", &sp_inner);

    if (cur_val == NULL) {
      cur_val = cur_key;
      cur_key = "level";
    }

    assert (*options != NULL);
    res = squash_options_parse_option (*options, cur_key, cur_val);
    if (res != SQUASH_OK) {
      fprintf (stderr, "Unable to parse options: %s (%d)\n", squash_status_to_string (res), res);
      exit (EXIT_FAILURE);
    }
  }

  free (s);

  return codec;
}

int main (int argc, char** argv) {
  struct BenchmarkContext context = { NULL, NULL, NULL, 0 };
  int opt;
  int optc = 0;
  SquashCodec* codec = NULL;
  SquashOptions* opts = NULL;

  setvbuf (stdout, NULL, _IONBF, 0);

  while ( (opt = getopt(argc, argv, "hc:o:t:")) != -1 ) {
    switch ( opt ) {
      case 'h':
        print_help_and_exit (argv[0], 0);
        break;
      case 'o':
        context.csv = fopen (optarg, "w+b");
        if (context.csv == NULL) {
          perror ("Unable to open output file");
          return -1;
        }
        setbuf (context.csv, NULL);
        break;
      case 'c':
	codec = benchmark_parse_codec (optarg, &opts);
        if (codec == NULL) {
          fprintf (stderr, "Unable to find codec.\n");
          return -1;
        }
        break;
      case 't':
	min_exec_time = strtod (optarg, NULL);
	break;
    }

    optc++;
  }

  if ( optind >= argc ) {
    fputs ("No input files specified.\n", stderr);
    return -1;
  }

  if (context.csv != NULL)
    fprintf (context.csv, "dataset,plugin,codec,level,raw_size,compressed_size,compress_cpu,compress_wall,decompress_cpu,decompress_wall\r\n");

  while ( optind < argc ) {
    context.input_name = argv[optind];
    context.input = fopen (context.input_name, "rb");
    if (context.input == NULL) {
      perror ("Unable to open input data");
      return -1;
    }

    if (fseek (context.input, 0, SEEK_END) != 0) {
      perror ("Unable to seek to end of input file");
      exit (-1);
    }
    context.input_size = ftell (context.input);

    fprintf (stdout, "Using %s:\n", context.input_name);

    if (opts != NULL) {
      benchmark_codec_with_options (&context, codec, opts);
    } else if (codec == NULL) {
      squash_foreach_plugin (benchmark_plugin, &context);
    } else {
      benchmark_codec (codec, &context);
    }

    optind++;
  }

  if (context.csv != NULL) {
    fclose (context.csv);
  }
  fclose (context.input);

  return 0;
}

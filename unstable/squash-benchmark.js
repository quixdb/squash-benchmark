(function(){
    function decimalAdjust(type, value, exp) {
	if (typeof exp === 'undefined' || +exp === 0) {
	    return Math[type](value);
	}
	value = +value;
	exp = +exp;
	if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
	    return NaN;
	}
	value = value.toString().split('e');
	value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
	value = value.toString().split('e');
	return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
    }

    if (!Math.round10) {
	Math.round10 = function(value, exp) {
	    return decimalAdjust('round', value, exp);
	};
    }
    if (!Math.floor10) {
	Math.floor10 = function(value, exp) {
	    return decimalAdjust('floor', value, exp);
	};
    }
    if (!Math.ceil10) {
	Math.ceil10 = function(value, exp) {
	    return decimalAdjust('ceil', value, exp);
	};
    }
    if (!Array.prototype.forEach) {
	Array.prototype.forEach = function (fn, scope) {
	    'use strict';
	    var i, len;
	    for (i = 0, len = this.length; i < len; ++i) {
		if (i in this) {
		    fn.call(scope, this[i], i, this);
		}
	    }
	};
    }
})();

$(function () {
    $('.failure-popover').popover({
        html: true,
        content: function() {
            var contents = '';
            var failures = jQuery.parseJSON($(this).attr('data-failures'));
            failures.forEach (function (e, i, a) {
                var issue;
                if (e.issue == 'OOM')
                    issue = '<abbr title="Out Of Memory">OOM</abbr>';
                else
                    issue = '<a href="' + e.issue + '"><i class="fa fa-bug"></i></a>';

                contents +=
                    '<tr>' +
                        '<td>' + e.plugin + '</td>' +
                        '<td>' + e.codec + '</td>' +
                        '<td>' + e.dataset + '</td>' +
                        '<td style="text-align: center">' + issue + '</td>' +
                    '</tr>';
            });
            return $("<table class='table table-striped'><thead><th>Plugin</th><th>Codec</th><th>Dataset</th><th>Issue</th></thead><tbody>" + contents + "</tdody></table>");
        }
    });
})

var datasets = [
    { id: 'alice29.txt',
      source: 'Canterbury Corpus',
      sourceUrl: 'http://corpus.canterbury.ac.nz/descriptions/#cantrbry',
      description: 'English text',
      size: 152089 },
    { id: 'asyoulik.txt',
      source: 'Canterbury Corpus',
      sourceUrl: 'http://corpus.canterbury.ac.nz/descriptions/#cantrbry',
      description: 'Shakespeare',
      size: 125179 },
    { id: 'cp.html',
      source: 'Canterbury Corpus',
      sourceUrl: 'http://corpus.canterbury.ac.nz/descriptions/#cantrbry',
      description: 'HTML source',
      size: 24603 },
    { id: 'dickens',
      source: 'Silesia Corpus',
      sourceUrl: 'http://sun.aei.polsl.pl/~sdeor/index.php?page=silesia',
      description: 'Collected works of Charles Dickens',
      size: 10192446 },
    { id: 'enwik8',
      source: 'Large Text Compression Benchmark',
      sourceUrl: 'http://www.mattmahoney.net/dc/textdata.html',
      description: 'The first 10⁸ bytes of the English Wikipedia dump on Mar. 3, 2006',
      size: 100000000 },
    { id: 'fields.c',
      source: 'Canterbury Corpus',
      sourceUrl: 'http://corpus.canterbury.ac.nz/descriptions/#cantrbry',
      description: 'C source',
      size: 11150 },
    { id: 'fireworks.jpeg',
      source: 'Snappy',
      sourceUrl: 'https://github.com/google/snappy/tree/master/testdata',
      description: 'A JPEG image',
      size: 123093 },
    { id: 'geo.protodata',
      source: 'Snappy',
      sourceUrl: 'https://github.com/google/snappy/tree/master/testdata',
      description: 'A set of Protocol Buffer data',
      size: 118588 },
    { id: 'grammar.lsp',
      source: 'Canterbury Corpus',
      sourceUrl: 'http://corpus.canterbury.ac.nz/descriptions/#cantrbry',
      description: 'LISP source',
      size: 3721 },
    { id: 'kennedy.xls',
      source: 'Canterbury Corpus',
      sourceUrl: 'http://corpus.canterbury.ac.nz/descriptions/#cantrbry',
      description: 'Excel Spreadsheet',
      size: 1029744 },
    { id: 'lcet10.txt',
      source: 'Canterbury Corpus',
      sourceUrl: 'http://corpus.canterbury.ac.nz/descriptions/#cantrbry',
      description: 'Technical writing',
      size: 426754 },
    { id: 'mozilla',
      source: 'Silesia Corpus',
      sourceUrl: 'http://sun.aei.polsl.pl/~sdeor/index.php?page=silesia',
      description: 'Tarred executables of Mozilla 1.0 (Tru64 UNIX edition)',
      size: 51220480 },
    { id: 'mr',
      source: 'Silesia Corpus',
      sourceUrl: 'http://sun.aei.polsl.pl/~sdeor/index.php?page=silesia',
      description: 'Medical magnetic resonanse image',
      size: 9970564 },
    { id: 'nci',
      source: 'Silesia Corpus',
      sourceUrl: 'http://sun.aei.polsl.pl/~sdeor/index.php?page=silesia',
      description: 'Chemical database of structures',
      size: 33553445 },
    { id: 'ooffice',
      source: 'Silesia Corpus',
      sourceUrl: 'http://sun.aei.polsl.pl/~sdeor/index.php?page=silesia',
      description: 'A dll from Open Office.org 1.01',
      size: 6152192 },
    { id: 'osdb',
      source: 'Silesia Corpus',
      sourceUrl: 'http://sun.aei.polsl.pl/~sdeor/index.php?page=silesia',
      description: 'Sample database in MySQL format from Open Source Database Benchmark',
      size: 10085684 },
    { id: 'paper-100k.pdf',
      source: 'Snappy',
      sourceUrl: 'https://github.com/google/snappy/tree/master/testdata',
      description: 'A PDF',
      size: 102400 },
    { id: 'plrabn12.txt',
      source: 'Canterbury Corpus',
      sourceUrl: 'http://corpus.canterbury.ac.nz/descriptions/#cantrbry',
      description: 'Poetry',
      size: 481861 },
    { id: 'ptt5',
      source: 'Canterbury Corpus',
      sourceUrl: 'http://corpus.canterbury.ac.nz/descriptions/#cantrbry',
      description: 'CCITT test set',
      size: 513216 },
    { id: 'reymont',
      source: 'Silesia Corpus',
      sourceUrl: 'http://sun.aei.polsl.pl/~sdeor/index.php?page=silesia',
      description: 'Text of the book Chłopi by Władysław Reymont',
      size: 6627202 },
    { id: 'samba',
      source: 'Silesia Corpus',
      sourceUrl: 'http://sun.aei.polsl.pl/~sdeor/index.php?page=silesia',
      description: 'Tarred source code of Samba 2-2.3 ',
      size: 21606400 },
    { id: 'sao',
      source: 'Silesia Corpus',
      sourceUrl: 'http://sun.aei.polsl.pl/~sdeor/index.php?page=silesia',
      description: 'The SAO star catalog',
      size: 7251944 },
    { id: 'sum',
      source: 'Canterbury Corpus',
      sourceUrl: 'http://corpus.canterbury.ac.nz/descriptions/#cantrbry',
      description: 'SPARC Executable',
      size: 38240 },
    { id: 'urls.10K',
      source: 'Snappy',
      sourceUrl: 'https://github.com/google/snappy/tree/master/testdata',
      description: 'List of 10000 URLs',
      size: 702087 },
    { id: 'xargs.1',
      source: 'Canterbury Corpus',
      sourceUrl: 'http://corpus.canterbury.ac.nz/descriptions/#cantrbry',
      description: 'GNU manual page',
      size: 4227 },
    { id: 'webster',
      source: 'Silesia Corpus',
      sourceUrl: 'http://sun.aei.polsl.pl/~sdeor/index.php?page=silesia',
      description: 'The 1913 Webster Unabridged Dictionary',
      size: 41458703 },
    { id: 'xml',
      source: 'Silesia Corpus',
      sourceUrl: 'http://sun.aei.polsl.pl/~sdeor/index.php?page=silesia',
      description: 'Collected XML files',
      size: 5345280 },
    { id: 'x-ray',
      source: 'Silesia Corpus',
      sourceUrl: 'http://sun.aei.polsl.pl/~sdeor/index.php?page=silesia',
      description: 'X-ray medical picture',
      size: 8474240 }
];

var dataset_map = {};
datasets.forEach (function (e, i, a) {
    dataset_map[e.id] = e;
});

var machines = [
    { name: "s-desktop",
      cpu: "Intel® Core™ i5-2400",
      cpuUrl: "http://ark.intel.com/products/52207",
      architecture: "x86_64",
      speed: 3100 * 1000000,
      memory: 1024 * 4,
      platform: "Asus P8Z68-V",
      platformUrl: "http://www.asus.com/Motherboards/P8Z68V/",
      distro: "Fedora 22",
      kernel: "4.4.13",
      compiler: "clang-3.5.0" },
];

var machine_map = {};
machines.forEach (function (e, i, a) {
    machine_map[e.name] = e;
});

var plugins = [
    { id: "brieflz",
      name: "BriefLZ",
      libraryUrl: "https://github.com/jibsen/brieflz",
      license: "MIT",
      revision: "bcaa6a1ee7ccf005512b5c23aa92b40cf75f9ed1",
      codecs: [ { name: "brieflz" } ], },
    { id: "brotli",
      name: "Brotli",
      libraryUrl: "https://github.com/google/brotli",
      license: "Apache 2.0",
      revision: "1dd66ef114fd244778d9dcb5da09c28b49a0df33",
      codecs: [ { name: "brotli",
		  levels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
		  streaming: true } ], },
    { id: "bsc",
      name: "bsc",
      libraryUrl: "http://libbsc.com/",
      license: "Apache 2.0",
      revision: "b2b07421381b19b2fada8b291f3cdead10578abc",
      codecs: [ { name: "bsc" } ] },
    { id: "bzip2",
      name: "bzip2",
      libraryUrl: "http://bzip.org/",
      license: "zlib & 3-clause BSD hybrid",
      version: "1.0.6",
      codecs: [
	  { name: "bzip2",
	    levels: [1, 2, 3, 4, 5, 6, 7, 8, 9],
	    streaming: true } ] },
    { id: "copy",
      name: "Copy",
      codecs: [
	  { name: "copy",
	    streaming: true,
	    flushing: true  } ]},
    { id: "crush",
      name: "CRUSH",
      libraryUrl: "http://compressme.net/",
      license: "Public Domain",
      version: "1.0",
      codecs: [
	  { name: "crush",
	    levels: [0, 1, 2] } ],
	    streaming: true },
    // { id: "csc",
    //   name: "CSC",
    //   libraryUrl: "https://github.com/fusiyuan2010/CSC",
    //   license: "MIT",
    //   revision: "c8f1580bd765c8e77d6cffb6bf900bf70e31aa0c",
    //   codecs: [ { name: "csc",
    // 		  levels: [1, 2, 3, 4, 5],
    // 		  streaming: true } ] },
    // { id: "density",
    //   name: "DENSITY",
    //   libraryUrl: "https://github.com/centaurean/density",
    //   license: "3-clause BSD",
    //   revesion: "b252a3260cd7a727b0f7b69d1bf3b82e1da7d89a",
    //   codecs: [
    // 	  { name: "density",
    // 	    levels: [1, 7, 9] } ],
    // 	    streaming: true },
    // { id: "doboz",
    //   name: "Doboz",
    //   libraryUrl: "https://bitbucket.org/attila_afra/doboz",
    //   codecs: [ { name: "doboz" } ] },
    { id: "fari",
      name: "FastARI",
      libraryUrl: "https://github.com/davidcatt/FastARI",
      license: "MIT",
      revision: "19845efa6294c8af4f9d5bd1d3e46dfbd0c0c1c5",
      codecs: [ { name: "fari" } ] },
    { id: "fastlz",
      name: "FastLZ",
      libraryUrl: "http://fastlz.org/",
      license: "MIT",
      revision: "12",
      codecs: [
	  { name: "fastlz",
	    levels: [1, 2] } ] },
    { id: "gipfeli",
      name: "Gipfeli",
      libraryUrl: "https://github.com/google/gipfeli",
      license: "3-clause BSD",
      revision: "65b9721308a357f6aa261c11d0af291d10d0b96c",
      codecs: [ { name: "gipfeli" } ] },
    { id: "heatshrink",
      name: "Heatshrink",
      libraryUrl: "https://github.com/atomicobject/heatshrink",
      license: "MIT",
      revision: "7d419e1fa4830d0b919b9b6a91fe2fb786cf3280",
      codecs: [ { name: "heatshrink" } ] },
    { id: "libdeflate",
      name: "libdeflate",
      libraryUrl: "https://github.com/ebiggers/libdeflate/",
      license: "CC0",
      revision: "f649a4b8db1df8b0e26242e92361376d4a729f42",
      codecs: [ { name: "deflate",
		  levels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]} ] },
    { id: "lz4",
      name: "LZ4",
      libraryUrl: "https://cyan4973.github.io/lz4/",
      license: "3-clause BSD",
      revision: "d86dc916771c126afb797637dda9f6421c0cb998",
      codecs: [
	  { name: "lz4",
	    levels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16] },
	  { name: "lz4-raw",
	    levels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] } ],
	    streaming: true,
	    flushing: true },
    { id: "lzf",
      name: "liblzf",
      libraryUrl: "http://oldhome.schmorp.de/marc/liblzf.html",
      license: "2-clause BSD or GPLv2+",
      version: "3.8",
      codecs: [ { name: "lzf" } ] },
    { id: "lzfse",
      name: "lzfse",
      libraryUrl: "https://github.com/lzfse/lzfse",
      license: "3-clause BSD",
      revision: "9014692a0fcccef119f8f2fd50e19428dac01d99",
      codecs: [
	  { name: "lzfse" },
	  { name: "lzvn" }
      ] },
    { id: "lzg",
      name: "liblzg",
      libraryUrl: "http://liblzg.bitsnbites.eu/",
      license: "zlib",
      version: "1.0.8",
      codecs: [
	  { name: "lzg",
	    levels: [1, 2, 3, 4, 5, 6, 7, 8, 9] } ] },
    { id: "lzham",
      name: "LZHAM",
      libraryUrl: "https://github.com/richgel999/lzham_codec/",
      license: "MIT",
      revision: "fb1a9b0a28d5194ad6a643ed89d704a6ffe1d91a",
      codecs: [
	  { name: "lzham",
	    levels: [0, 1, 2, 3, 4],
	    streaming: true,
	    flushing: true } ] },
    { id: "lzjb",
      name: "LZJB",
      libraryUrl: "https://en.wikipedia.org/wiki/LZJB",
      license: "CDDL",
      codecs: [ { name: "lzjb" } ] },
    { id: "lzma",
      name: "XZ Utils",
      libraryUrl: "http://tukaani.org/xz/",
      license: "Public Domain",
      version: "5.2.1",
      codecs: [
	  { name: "lzma",
	    levels: [1, 2, 3, 4, 5, 6, 7, 8, 9],
	    streaming: true },
	  { name: "lzma1",
	    levels: [1, 2, 3, 4, 5, 6, 7, 8, 9],
	    streaming: true },
	  { name: "lzma2",
	    levels: [1, 2, 3, 4, 5, 6, 7, 8, 9],
	    streaming: true,
	    flushing: true },
	  { name: "xz",
	    levels: [1, 2, 3, 4, 5, 6, 7, 8, 9] } ],
	    streaming: true,
	    flushing: true },
    { id: "lzo",
      name: "LZO",
      libraryUrl: "http://www.oberhumer.com/opensource/lzo/",
      license: "GPLv2+",
      version: "2.09",
      codecs: [
	  // { name: "lzo1",
	  //   levels: [1, 99] },
	  // { name: "lzo1a",
	  //   levels: [1, 99] },
	  { name: "lzo1b",
	    levels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 99, 999] },
	  { name: "lzo1c",
	    levels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 99, 999] },
	  { name: "lzo1f",
	    levels: [1, 999] },
	  { name: "lzo1x",
	    levels: [1, 11, 12, 15, 999] },
	  { name: "lzo1y",
	    levels: [1, 999] },
	  { name: "lzo1z",
	    levels: [999] } ] },
    { id: "miniz",
      name: "MiniZ",
      libraryUrl: "https://github.com/richgel999/miniz",
      license: "Public Domain",
      revision: "28f5066e332590c8a68fa4870e89233e72ce7a44",
      codecs: [ { name: 'zlib' } ] },
    { id: "ms-compress",
      name: "ms-compress",
      libraryUrl: "https://github.com/coderforlife/ms-compress/",
      license: "GPLv3+",
      revision: "8ba2fb09499c0623d78997f11db6b3062d99785c",
      codecs: [
    	  { name: "lznt1",
	    streaming: true,
	    flushing: true },
    	  { name: "xpress" },
    	  { name: "xpress-huffman" },
      ] },
    { id: "ncompress",
      name: "ncompress",
      libraryUrl: "http://ncompress.sourceforge.net/",
      license: "Public Domain",
      version: "4.2.4.4",
      codecs: [
	  { name: 'compress' }
      ] },
    // { id: "pithy",
    //   name: "Pithy",
    //   libraryUrl: "https://github.com/johnezang/pithy",
    //   license: "3-clause BSD",
    //   revision: "d7d5bd3a20f97d46454f9e651ec6b3dd5801885e",
    //   codecs: [
    //       { name: "pithy",
    // 	    levels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]},
    //   ] },
    { id: "quicklz",
      name: "QuickLZ",
      libraryUrl: "http://www.quicklz.com/",
      license: "GPL v1, v2, or v3",
      version: "1.5.0",
      codecs: [ { name: "quicklz" } ] },
    { id: "snappy",
      name: "Snappy",
      libraryUrl: "https://google.github.io/snappy/",
      license: "3-clause BSD",
      revision: "0852af76065ba0f35944527e14787f7ae5e0b3ac",
      codecs: [
    	  { name: "snappy" },
    	  // { name: "snappy-framed",
	  //   streaming: true,
	  //   flushing: true }
      ] },
    { id: "wflz",
      name: "wfLZ",
      libraryUrl: "https://github.com/ShaneWF/wflz",
      revision: "cfbb02d7a87ab3e39c6a4394da2281744a671ed2",
      codecs: [
    	  { name: "wflz",
    	    levels: [1, 2] },
    	  { name: "wflz-chunked",
    	    levels: [1, 2] },
      ] },
    { id: "yalz77",
      name: "yalz77",
      libraryUrl: "https://bitbucket.org/tkatchev/yalz77",
      revision: "36429ac62e9991b5d52fc37d326d50b6e59a895a",
      codecs: [
	  { name: "yalz77" },
      ] },
    { id: "zlib",
      name: "zlib",
      libraryUrl: "http://zlib.net/",
      license: "zlib",
      version: "1.2.8",
      codecs: [
    	  { name: "deflate",
    	    levels: [1, 2, 3, 4, 5, 6, 7, 8, 9],
	    streaming: true,
	    flushing: true },
    	  { name: "gzip",
    	    levels: [1, 2, 3, 4, 5, 6, 7, 8, 9],
	    streaming: true,
	    flushing: true },
    	  { name: "zlib",
    	    levels: [1, 2, 3, 4, 5, 6, 7, 8, 9],
	    streaming: true,
	    flushing: true },
      ] },
    { id: "zlib-ng",
      name: "zlib-ng",
      libraryUrl: "https://github.com/Dead2/zlib-ng/",
      license: "zlib",
      revision: "c81cad987823f5f0bbb9aabda387ca94066e4ab9",
      codecs: [
    	  { name: "deflate",
    	    levels: [1, 2, 3, 4, 5, 6, 7, 8, 9],
	    streaming: true,
	    flushing: true },
    	  { name: "gzip",
    	    levels: [1, 2, 3, 4, 5, 6, 7, 8, 9],
	    streaming: true,
	    flushing: true },
    	  { name: "zlib",
    	    levels: [1, 2, 3, 4, 5, 6, 7, 8, 9],
	    streaming: true,
	    flushing: true },
      ] },
    { id: "zling",
      name: "libzling",
      libraryUrl: "https://github.com/richox/libzling",
      revision: "07a80c767d32a26c72336c635573c531cc3dd6d6",
      codecs: [
    	  { name: "zling",
    	    levels: [0, 1, 2, 3, 4] },
      ] },
    { id: "zpaq",
      name: "ZPAQ",
      libraryUrl: "http://mattmahoney.net/dc/zpaq.html",
      license: "Public Domain",
      version: "7.05",
      codecs: [
    	  { name: "zpaq",
    	    levels: [1, 2, 3, 4, 5],
	    streaming: true },
      ] },
    { id: "zstd",
      name: "Zstandard",
      libraryUrl: "https://github.com/Cyan4973/zstd",
      license: "2-clause BSD",
      revision: "9c57b424d6f24629de7c7249e4e847900846887b",
      codecs: [
    	  { name: "zstd",
	    levels: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22 ] },
      ] }
];

var plugins_map = {};
plugins.forEach (function (e, i, a) {
    plugins_map[e.id] = e;
});

function formatSize(size, precision) {
    if (precision == undefined)
	precision = -2;

    if (size < 1024) {
	return size + " B";
    } else if (size < (1024 * 1024)) {
	return Math.round10(size / 1024, precision) + " KiB";
    } else if (size < (1024 * 1024 * 1024)) {
	return Math.round10(size / (1024 * 1024), precision) + " MiB";
    } else if (size < (1024 * 1024 * 1024 * 1024)) {
	return Math.round10(size / (1024 * 1024 * 1024), precision) + " GiB";
    } else {
	return Math.round10(size / (1024 * 1024 * 1024 * 1024), precision) + " TiB";
    }
}

function formatSpeed(speed, precision) {
    return formatSize(speed, precision) + "/s";
}

function formatFrequency(size, precision) {
    if (precision == undefined)
	precision = -2;

    if (size < 1000) {
	return size + " Hz";
    } else if (size < 1000000) {
	return Math.round10(size / 1000, precision) + " KHz";
    } else if (size < 1000000000) {
	return Math.round10(size / 1000000, precision) + " MHz";
    } else if (size < 1000000000000) {
	return Math.round10(size / 1000000000, precision) + " GHz";
    } else {
	return Math.round10(size / 1000000000000, precision) + " THz";
    }
}

function formatDuration(seconds) {
    var res = "";
    var w = false;

    function zeroPad (n, width, z) {
	n = n + '';
	return n.length >= width ? n : new Array(width - n.length + 1).join(z || '0') + n;
    }

    [60*60*24, 60*60, 60, 1].forEach (function (d) {
	if ((seconds >= d) || w) {
	    x = Math.floor (seconds / d);
	    seconds -= d * x;
	    res += (w ? ':' : '') + zeroPad (x, 2);
	    w = true;
	}
    });

    if (res == '') {
	if (seconds == 0)
	    return '0';

	var remaining = seconds;
	res = '0.';

	while (remaining < 0.1) {
	    res += '0';
	    remaining *= 10;
	}
	res += Math.round10(remaining * 1000);
    }

    return res;
}

var squashBenchmarkApp = angular.module("squashBenchmark", []);

squashBenchmarkApp.factory('squashBenchmarkData', function($q) {
    return function(machineId) {
	return $q(function (resolve, reject) {
	    d3.csv ("data/" + machineId + ".csv", function(data) {
		resolve(data.map (function (val) {
		    var input_size = dataset_map[val.dataset].size;
		    return {
			dataset: val.dataset,
			plugin: val.plugin,
			codec: val.codec,
			level: val.level,

			input_size: input_size,
			compressed_size: parseInt(val.compressed_size),

			compressed_size: parseInt(val.compressed_size),
			compress_cpu: parseFloat(val.compress_cpu),
			compress_wall: parseFloat(val.compress_wall),
			decompress_cpu: parseFloat(val.decompress_cpu),
			decompress_wall: parseFloat(val.decompress_wall),

			ratio: input_size / val.compressed_size,
			compression_rate: input_size / val.compress_cpu,
			decompression_rate: input_size / val.decompress_cpu
		    };
		}));
	    });
	});
    };
});

squashBenchmarkApp.filter('formatSpeed', function() {
    return function(input, precision) {
	return formatSpeed(input, precision);
    };
})

squashBenchmarkApp.filter('formatSize', function() {
    return function(input, precision) {
	return formatSize(input, precision);
    };
})

squashBenchmarkApp.filter('formatFrequency', function() {
    return function(input, precision) {
	return formatFrequency(input, precision);
    };
})

squashBenchmarkApp.filter('formatDuration', function() {
    return function(input) {
	return formatDuration(input);
    };
})

squashBenchmarkApp.controller("SquashBenchmarkCtrl", function ($scope, squashBenchmarkData) {
    $scope.datasets = datasets;
    $scope.machines = machines;
    $scope.plugins = plugins;

    $scope.location = window.location.href.split ("?")[0];

    $scope.query_string = function () {
	// http://stackoverflow.com/a/979995
	var query_string = {};
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i=0;i<vars.length;i++) {
	    var pair = vars[i].split("=");
	    if (typeof query_string[pair[0]] === "undefined") {
		query_string[pair[0]] = pair[1];
	    } else if (typeof query_string[pair[0]] === "string") {
		var arr = [ query_string[pair[0]], pair[1] ];
		query_string[pair[0]] = arr;
	    } else {
		query_string[pair[0]].push(pair[1]);
	    }
	}
	return query_string;
    } ();

    $scope.random_dataset = true;
    if ($scope.query_string.dataset != undefined && dataset_map[$scope.query_string.dataset] != undefined) {
	$scope.dataset = $scope.query_string.dataset;
	$scope.random_dataset = false;
    } else {
	do {
	    $scope.dataset = datasets[Math.floor (Math.random () * datasets.length)].id;
	} while ($scope.dataset == "fireworks.jpeg");
    }

    $scope.random_machine = true;
    if ($scope.query_string.machine != undefined && machine_map[$scope.query_string.machine] != undefined) {
	$scope.machine = $scope.query_string.machine;
	$scope.random_machine = false;
    } else {
	$scope.machine = machines[Math.floor (Math.random () * machines.length)].name;
    }

    $scope.datasetSort = 'id';
    $scope.machineSort = 'name';
    $scope.rawSort = 'plugin';

    $scope.data_points_per_machine = 0;
    $scope.codec_plugin_map = {};
    $scope.codecs = [];
    plugins.forEach (function (plugin, i, a) {
	plugin.codecs.forEach (function (codec, ci, ca) {
	    $scope.codecs.push (codec);
	    $scope.codec_plugin_map[plugin.id + ":" + codec.id];
	    $scope.data_points_per_machine += (codec.levels == undefined) ? 1 : codec.levels.length;
	});
    });

    $scope.speedScale = "linear";
    if ($scope.query_string["speed-scale"] != undefined) {
	$scope.speedScale = ($scope.query_string["speed-scale"] == "logarithmic") ? "logarithmic" : "linear";
    }

    $scope.transferProcessVisible = 125;

    if ($scope.query_string.speed != undefined) {
	$scope.transferSpeedUnits = "KiB/s";
	var speed = parseInt ($scope.query_string.speed);
	if (speed > 1024 && (speed % 256 == 0)) {
	    speed /= 1024;
	    $scope.transferSpeedUnits = "MiB/s";

	    if (speed > 1024 && (speed % 256 == 0)) {
		speed /= 1024;
		$scope.transferSpeedUnits = "GiB/s";

		if (speed > 1024 && (speed % 256 == 0)) {
		    speed /= 1024;
		    $scope.transferSpeedUnits = "TiB/s";
		}
	    }
	}
	$scope.transferSpeed = speed;
    } else {
	$scope.transferSpeedUnits = "MiB/s";
	$scope.transferSpeed = 125;
    }

    if ($scope.query_string["hidden-plugins"] != undefined) {
	var hidden_plugins = $scope.query_string["hidden-plugins"].toLowerCase ().split (",");
	plugins.forEach (function (plugin) {
	    plugin.visible = hidden_plugins.indexOf (plugin.id) == -1;
	});
    } else if ($scope.query_string["visible-plugins"] != undefined) {
	var visible_plugins = $scope.query_string["visible-plugins"].toLowerCase ().split (",");
	plugins.forEach (function (plugin) {
	    plugin.visible = visible_plugins.indexOf (plugin.id) != -1;
	});
    } else {
	plugins.forEach (function (plugin) {
	    plugin.visible = true;
	});
    }

    $scope.$watchGroup (['transferSpeed', 'transferSpeedUnits'], function (newData, oldData, scope) {
	scope.calculatedTransferSpeed = scope.transferSpeed;

	switch (scope.transferSpeedUnits) {
  	case "KiB/s":
	    scope.calculatedTransferSpeed = scope.calculatedTransferSpeed * 1024;
	    break;
  	case "MiB/s":
	    scope.calculatedTransferSpeed = scope.calculatedTransferSpeed * (1024 * 1024);
	    break;
  	case "GiB/s":
	    scope.calculatedTransferSpeed = scope.calculatedTransferSpeed * (1024 * 1024 * 1024);
	    break;
	}
    });

    $scope.transferProcessSort = "time";
    $scope.transferProcessDirection = "decompress";

    var colors = d3.scale.category20().range()
	.concat (d3.scale.category20b().range(),
		 d3.scale.category20c().range());
    var chartData = [];

    function drawRatioCompressionChart (xAxis, yAxis) {
	if (xAxis == undefined)
	    xAxis = $scope.speedScale;
	if (yAxis == undefined)
	    yAxis = 'linear';

	var chart = $("#ratio-compression-chart").highcharts({
            chart: { type: 'scatter' },
            title: { text: null },
            xAxis: {
		title: {
                    enabled: true,
                    text: 'Compression Speed'
		},
		startOnTick: true,
		endOnTick: true,
		min: (xAxis == 'logarithmic') ? undefined : 0,
		labels: {
		    rotation: -45,
		    formatter: function() { return formatSpeed(this.value); }
		},
		type: xAxis
            },
            yAxis: {
		title: {
                    text: 'Ratio'
		},
		type: yAxis
            },
            legend: {
		layout: 'vertical',
		align: 'right',
		verticalAlign: 'top'
            },
            plotOptions: {
		scatter: {
                    tooltip: {
			headerFormat: '<b>{series.name}</b>',
			pointFormatter: function () {
			    res = ":<b>" + this.codec + "</b><hr/><br/>";
			    if (this.level != "")
			    	res += "Level: " + this.level + "<br/>";
			    res += "Ratio: " + Math.round10(this.y, -2) + "<br/>";
			    res += "Compression speed: " + formatSpeed(this.x) + "<br/>";
			    res += "Decompression speed: " + formatSpeed(this.z) + "<br/>";
			    return res;
			}
                    }
		}
            },
            series: chartData.map(function (e, i, a) {
		return {
		    visible: (plugins_map[e.plugin] == undefined) ? false : plugins_map[e.plugin].visible,
		    name: e.plugin,
		    color: colors[i % colors.length],
		    data: e.values.map (function (p) {
			return { x: p.compression_rate,
				 y: p.ratio,
				 z: p.decompression_rate,
				 codec: p.codec,
				 level: p.level };
		    })
		};
	    })
	}).highcharts();

	$("#ratio-compression-chart .highcharts-xaxis-title").click(function (e) {
	    drawRatioCompressionChart(chart.userOptions.xAxis.type == "linear" ? "logarithmic" : "linear",
				      chart.userOptions.yAxis.type);
	});
	$("#ratio-compression-chart .highcharts-yaxis-title").click(function (e) {
	    drawRatioCompressionChart(chart.userOptions.xAxis.type,
				      chart.userOptions.yAxis.type == "linear" ? "logarithmic" : "linear");
	});
    }

    function drawRatioDecompressionChart (xAxis, yAxis) {
	if (xAxis == undefined)
	    xAxis = $scope.speedScale;
	if (yAxis == undefined)
	    yAxis = 'linear';

	var chart = $("#ratio-decompression-chart").highcharts({
            chart: { type: 'scatter' },
            title: { text: null },
            xAxis: {
		title: {
                    enabled: true,
                    text: 'Decompression Speed'
		},
		startOnTick: true,
		endOnTick: true,
		min: (xAxis == 'logarithmic') ? undefined : 0,
		labels: {
		    rotation: -45,
		    formatter: function() { return formatSpeed(this.value); }
		},
		type: xAxis
            },
            yAxis: {
		title: {
                    text: 'Ratio'
		},
		type: yAxis
            },
            legend: {
		layout: 'vertical',
		align: 'right',
		verticalAlign: 'top'
            },
            plotOptions: {
		scatter: {
                    tooltip: {
			headerFormat: '<b>{series.name}</b>',
			pointFormatter: function () {
			    res = ":<b>" + this.codec + "</b><hr/><br/>";
			    if (this.level != "")
			    	res += "Level: " + this.level + "<br/>";
			    res += "Ratio: " + Math.round10(this.y, -2) + "<br/>";
			    res += "Compression speed: " + formatSpeed(this.z) + "<br/>";
			    res += "Decompression speed: " + formatSpeed(this.x) + "<br/>";
			    return res;
			}
                    }
		}
            },
            series: chartData.map(function (e, i, a) {
		return {
		    name: e.plugin,
		    visible: (plugins_map[e.plugin] == undefined) ? false : plugins_map[e.plugin].visible,
		    color: colors[i % colors.length],
		    data: e.values.map (function (p) {
			return { z: p.compression_rate,
				 y: p.ratio,
				 x: p.decompression_rate,
				 codec: p.codec,
				 level: p.level };
		    })
		};
	    })
	}).highcharts();

	$("#ratio-decompression-chart .highcharts-xaxis-title").click(function (e) {
	    drawRatioDecompressionChart(chart.userOptions.xAxis.type == "linear" ? "logarithmic" : "linear",
					chart.userOptions.yAxis.type);
	});
	$("#ratio-decompression-chart .highcharts-yaxis-title").click(function (e) {
	    drawRatioDecompressionChart(chart.userOptions.xAxis.type,
					chart.userOptions.yAxis.type == "linear" ? "logarithmic" : "linear");
	});
    }

    function drawCompressionDecompressionChart (xAxis, yAxis) {
	if (xAxis == undefined)
	    xAxis = $scope.speedScale;
	if (yAxis == undefined)
	    yAxis = $scope.speedScale;

	var chart = $("#compression-decompression-chart").highcharts({
            chart: { type: 'scatter' },
            title: { text: null },
            xAxis: {
		title: {
                    enabled: true,
                    text: 'Decompression Speed'
		},
		endOnTick: true,
		min: (xAxis == 'logarithmic') ? undefined : 0,
		labels: {
		    rotation: -45,
		    formatter: function() { return formatSpeed(this.value); }
		},
		type: xAxis
            },
            yAxis: {
		title: {
                    text: 'Compression Speed'
		},
		startOnTick: true,
		endOnTick: true,
		min: (yAxis == 'logarithmic') ? undefined : 0,
		labels: {
		    formatter: function() { return formatSpeed(this.value); }
		},
		type: yAxis
            },
            legend: {
		layout: 'vertical',
		align: 'right',
		verticalAlign: 'top'
            },
            plotOptions: {
		scatter: {
                    tooltip: {
			headerFormat: '<b>{series.name}</b>',
			pointFormatter: function () {
			    res = ":<b>" + this.codec + "</b><hr/><br/>";
			    if (this.level != "")
			    	res += "Level: " + this.level + "<br/>";
			    res += "Ratio: " + Math.round10(this.z, -2) + "<br/>";
			    res += "Compression speed: " + formatSpeed(this.y) + "<br/>";
			    res += "Decompression speed: " + formatSpeed(this.x) + "<br/>";
			    return res;
			}
                    }
		}
            },
            series: chartData.map(function (e, i, a) {
		if (plugins_map[e.plugin] == undefined)
		    console.log ("Plugin " + e.plugin + " undefined");
		return {
		    name: e.plugin,
		    visible: (plugins_map[e.plugin] == undefined) ? false : plugins_map[e.plugin].visible,
		    color: colors[i % colors.length],
		    data: e.values.map (function (p) {
			return { y: p.compression_rate,
				 z: p.ratio,
				 x: p.decompression_rate,
				 codec: p.codec,
				 level: p.level };
		    })
		};
	    })
	}).highcharts();

	$("#compression-decompression-chart .highcharts-xaxis-title").click(function (e) {
	    drawCompressionDecompressionChart(chart.userOptions.xAxis.type == "linear" ? "logarithmic" : "linear",
					      chart.userOptions.yAxis.type);
	});
	$("#compression-decompression-chart .highcharts-yaxis-title").click(function (e) {
	    drawCompressionDecompressionChart(chart.userOptions.xAxis.type,
					      chart.userOptions.yAxis.type == "linear" ? "logarithmic" : "linear");
	});
    }

    function drawRTTRatioChart (xAxis, yAxis) {
	if (xAxis == undefined)
	    xAxis = $scope.speedScale;
	if (yAxis == undefined)
	    yAxis = 'linear';

	var chart = $("#rtt-ratio-chart").highcharts({
            chart: { type: 'scatter' },
            title: { text: null },
            xAxis: {
		title: {
                    enabled: true,
                    text: 'Round Trip Speed'
		},
		endOnTick: true,
		min: (xAxis == 'logarithmic') ? undefined : 0,
		labels: {
		    rotation: -45,
		    formatter: function() { return formatSpeed(this.value); }
		},
		type: xAxis
            },
            yAxis: {
		title: {
                    text: 'Compression Ratio'
		},
		startOnTick: true,
		endOnTick: true,
		min: (yAxis == 'logarithmic') ? undefined : 1,
		type: yAxis
            },
            legend: {
		layout: 'vertical',
		align: 'right',
		verticalAlign: 'top'
            },
            plotOptions: {
		scatter: {
                    tooltip: {
			headerFormat: '<b>{series.name}</b>',
			pointFormatter: function () {
			    res = ":<b>" + this.codec + "</b><hr/><br/>";
			    if (this.level != "")
			    	res += "Level: " + this.level + "<br/>";
			    res += "Ratio: " + Math.round10(this.y, -2) + "<br/>";
			    res += "Compression speed: " + formatSpeed(this.compression_rate) + "<br/>";
			    res += "Decompression speed: " + formatSpeed(this.decompression_rate) + "<br/>";
			    return res;
			}
                    }
		}
            },
            series: chartData.map(function (e, i, a) {
		return {
		    name: e.plugin,
		    visible: (plugins_map[e.plugin] == undefined) ? false : plugins_map[e.plugin].visible,
		    color: colors[i % colors.length],
		    data: e.values.map (function (p) {
			return { y: p.ratio,
				 x: (2 * p.input_size) / (p.compress_cpu + p.decompress_cpu),
				 compression_rate: p.compression_rate,
				 decompression_rate: p.decompression_rate,
				 codec: p.codec,
				 level: p.level };
		    })
		};
	    })
	}).highcharts();

	$("#rtt-ratio-chart .highcharts-xaxis-title").click(function (e) {
	    drawRTTRatioChart(chart.userOptions.xAxis.type == "linear" ? "logarithmic" : "linear",
			      chart.userOptions.yAxis.type);
	});
	$("#rtt-ratio-chart .highcharts-yaxis-title").click(function (e) {
	    drawRTTRatioChart(chart.userOptions.xAxis.type,
			      chart.userOptions.yAxis.type == "linear" ? "logarithmic" : "linear");
	});
    }

    function drawTransferDecompressionChart () {
	var transferSpeed = $scope.calculatedTransferSpeed;

	var direction = $scope.transferProcessDirection;
	var uncompressedSize = dataset_map[$scope.dataset].size;
	var uncompressedTime = uncompressedSize / transferSpeed;
	var cutoff = 0;
	if ($scope.transferProcessVisible != 0)
	    cutoff = uncompressedTime * ($scope.transferProcessVisible / 100);

	seriesData = [
	    {
		name: 'Decompression',
		data: [0]
	    }, {
		name: 'Transfer',
		data: [uncompressedSize / transferSpeed]
	    }, {
		name: 'Compression',
		data: [0]
	    }
	];
	categoriesData = ["No compression"];

	var sortedData = [];
	chartData.forEach (function (plugin) {
	    plugin.values.forEach (function (value) {
		var desc = plugin.plugin + ":" + value.codec;
		if (plugin.values.length > 1)
		    desc += " | " + value.level;

		sortedData.push ({
		    name: desc,
		    plugin: plugin.plugin,
		    codec: value.codec,
		    level: value.level,
		    ratio: value.ratio,
		    transferTime: value.compressed_size / transferSpeed,
		    decompressTime: value.decompress_cpu,
		    decompressTotalTime: (value.compressed_size / transferSpeed) + value.decompress_cpu,
		    compressTime: value.compress_cpu,
		    compressTotalTime: (value.compressed_size / transferSpeed) + value.compress_cpu,
		    totalTime: (value.compressed_size / transferSpeed) + value.compress_cpu + value.decompress_cpu
		});
	    });
	});

	if ($scope.transferProcessSort == "time") {
	    sortedData.sort (function (a, b) {
		var field;
		switch (direction) {
		case "decompress":
		    field = "decompressTotalTime";
		    break;
		case "compress":
		    field = "compressTotalTime";
		    break;
		case "both":
		    field = "totalTime";
		    break;
		}
		return a[field] - b[field];
	    });
	}

	sortedData.forEach (function (e) {
	    var value;
	    switch (direction) {
	    case "decompress":
		value = e.decompressTotalTime;
		break;
	    case "compress":
		value = e.compressTotalTime;
		break;
	    case "both":
		value = e.totalTime;
		break;
	    }

	    if (cutoff == 0 || value <= cutoff) {
		categoriesData.push (e.name);
		seriesData[2].data.push ({
		    y: e.compressTime,
		    data: e
		});
		seriesData[1].data.push ({
		    y: e.transferTime,
		    data: e
		});
		seriesData[0].data.push ({
		    y: e.decompressTime,
		    data: e
		});
	    }
	});

	if (direction != "both") {
	    if (direction == "decompress")
		seriesData = seriesData.slice (0, 2);
	    else
		seriesData = seriesData.slice (1, 3);
	}

	$("#transfer-decompression-chart").height (100 + (categoriesData.length * 20));

	var chart = $("#transfer-decompression-chart").highcharts({
            chart: { type: 'bar' },
            title: { text: null },
            xAxis: {
	    	title: {
                    enabled: false
	    	},
		categories: categoriesData
            },
            yAxis: {
		title: {
                    text: 'Transfer + Decompression Time'
		},
		min: 0
            },
	    tooltip: {
		headerFormat: "",
		pointFormatter: function () {
		    if (this.data == undefined) {
			var res = "No compression<br/>";
			res += "Size: " + formatSize (dataset_map[$scope.dataset].size) + "<br/>";
			res += "Total time: <b>" + formatDuration(dataset_map[$scope.dataset].size / transferSpeed) + " seconds</b><br/>";
			return res;
		    }

		    var res = this.data.plugin + ":" + this.data.codec;
		    if (this.data.level != "")
			res += " level " + this.data.level;
		    res += '<br/>';

		    res += "Ratio: " + Math.round10(this.data.ratio, -2) + "<br/>";

		    if (this.series.name == "Compression") {
			res += "Compression time: <b>" + formatDuration(this.data.compressTime) + " seconds</b><br/>";
		    } else {
			res += "Compression time: " + formatDuration(this.data.compressTime) + " seconds<br/>";
		    }

		    if (this.series.name == "Transfer") {
			res += "Transfer time: <b>" + formatDuration(this.data.transferTime) + " seconds</b><br/>";
		    } else {
			res += "Transfer time: " + formatDuration(this.data.transferTime) + " seconds<br/>";
		    }

		    if (this.series.name == "Decompression") {
			res += "Decompression time: <b>" + formatDuration(this.data.decompressTime) + " seconds</b><br/>";
		    } else {
			res += "Decompression time: " + formatDuration(this.data.decompressTime) + " seconds<br/>";
		    }

		    var totalTime;
		    switch (direction) {
		    case "decompress":
			totalTime = this.data.decompressTotalTime;
			break;
		    case "compress":
			totalTime = this.data.compressTotalTime;
			break;
		    case "both":
			totalTime = this.data.totalTime;
			break;
		    }
		    res += "Total time: " + formatDuration(totalTime) + " seconds<br/>";

		    if (totalTime < uncompressedTime) {
			res += "Time savings: " + formatDuration(uncompressedTime - totalTime) + " seconds (" +
			    formatDuration(((uncompressedTime - totalTime) / uncompressedTime) * 100) + "%)";
		    } else {
			res += "Time lost: " + formatDuration(totalTime - uncompressedTime) + " seconds (" +
			    formatDuration(((totalTime / uncompressedTime) - 1.0) * 100) + "%)";
		    }

		    return res;
		}
	    },
            plotOptions: {
		series: {
		    stacking: 'normal'
		}
            },
	    series: seriesData
	}).highcharts();
    }

    function drawOptimalCodecChart (xAxis, yAxis) {
	if (xAxis == undefined)
	    xAxis = $scope.speedScale;
	if (yAxis == undefined)
	    yAxis = 'linear';

	var seriesData = [
	    {
		name: "Compression",
		data: []
	    }, {
		name: "Decompression",
		data: []
	    }, {
		name: "Average",
		data: []
	    },
	];

	var compressionPoints = [];
	var decompressionPoints = [];
	var averagePoints = [];

	chartData.forEach (function (plugin) {
	    plugin.values.forEach (function (value) {
		compressionPoints.push ({
		    plugin: plugin.plugin,
		    data: value,
		    y: value.ratio,
		    x: value.compression_rate
		});
		decompressionPoints.push ({
		    plugin: plugin.plugin,
		    data: value,
		    y: value.ratio,
		    x: value.decompression_rate
		});
		averagePoints.push ({
		    plugin: plugin.plugin,
		    data: value,
		    y: value.ratio,
		    x: (value.decompression_rate + value.compression_rate) / 2
		});
	    });
	});

	function sortCb (a, b) {
	    if (a.y == b.y) {
		return b.x - a.x;
	    }
	    return b.y - a.y;
	};

	compressionPoints.sort (sortCb);
	decompressionPoints.sort (sortCb);
	averagePoints.sort (sortCb);

	function runFilter (data) {
	    var c = 0;
	    return data.filter (function (value) {
		if (value.x > c) {
		    c = value.x;
		    return true;
		} else {
		    return false;
		}
	    });
	}

	seriesData[0].data = runFilter (compressionPoints);
	seriesData[1].data = runFilter (decompressionPoints);
	seriesData[2].data = runFilter (averagePoints);

	var chart = $("#optimal-codec-chart").highcharts({
            title: { text: null },
            xAxis: {
		title: {
                    enabled: true,
                    text: 'Speed'
		},
		startOnTick: true,
		endOnTick: true,
		min: (xAxis == 'logarithmic') ? undefined : 0,
		labels: {
		    rotation: -45,
		    formatter: function() { return formatSpeed(this.value); }
		},
		type: xAxis
            },
            yAxis: {
		title: {
                    text: 'Ratio'
		},
		type: yAxis
            },
            legend: {
		layout: 'vertical',
		align: 'right',
		verticalAlign: 'top'
            },
	    plotOptions: {
		series: {
		    marker: {
			enabled: true
		    }
		}
	    },
            tooltip: {
		headerFormat: '',
		pointFormatter: function () {
		    res = "<b>" + this.plugin + ":" + this.data.codec;
		    if (this.data.level != "")
			res += " (level " + this.data.level + ")<br/>";
		    res += "</b><br/>";
		    res += "Ratio: " + Math.round10(this.y, -2) + "<br/>";
		    res += "Compression speed: " + formatSpeed(this.data.compression_rate) + "<br/>";
		    res += "Decompression speed: " + formatSpeed(this.data.decompression_rate) + "<br/>";
		    res += "Average speed: " + formatSpeed((this.data.decompression_rate + this.data.compression_rate) / 2) + "<br/>";
		    return res;
		}
            },
            series: seriesData
	}).highcharts();

	$("#optimal-codec-chart .highcharts-xaxis-title").click(function (e) {
	    drawOptimalCodecChart(chart.userOptions.xAxis.type == "linear" ? "logarithmic" : "linear",
				  chart.userOptions.yAxis.type);
	});
	$("#optimal-codec-chart .highcharts-yaxis-title").click(function (e) {
	    drawOptimalCodecChart(chart.userOptions.xAxis.type,
				  chart.userOptions.yAxis.type == "linear" ? "logarithmic" : "linear");
	});
    }

    $scope.drawTransferDecompressionChart = drawTransferDecompressionChart;

    var updateChart = function () {
	chartData = [];
	var dataIdx = {};

	$scope.data.forEach (function (e, i, a) {
	    if (e.plugin == "copy")
		return;

	    if (dataIdx[e.plugin] == undefined) {
		dataIdx[e.plugin] = chartData.length;
		chartData.push ({ plugin: e.plugin, values: [] });
	    }
	    chartData[dataIdx[e.plugin]].values.push ({
		codec: e.codec,
		level: e.level,
		ratio: e.ratio,
		compression_rate: e.compression_rate,
		decompression_rate: e.decompression_rate,
		compress_cpu: e.compress_cpu,
		decompress_cpu: e.decompress_cpu,
		input_size: e.input_size,
		compressed_size: e.compressed_size
	    });
	});

	drawRatioCompressionChart();
	drawRatioDecompressionChart();
	drawCompressionDecompressionChart();
	drawRTTRatioChart();
	drawTransferDecompressionChart();
	drawOptimalCodecChart();
    };

    dataCache = [];

    $scope.bestCompressionRate = 0;
    $scope.bestDecompressionRate = 0;
    $scope.bestRatio = 0;

    function setData (data) {
	$scope.bestCompressionRate = 0;
	$scope.bestDecompressionRate = 0;
	$scope.bestRatio = 0;

	if (data != undefined) {
	    $scope.data = data.filter (function(element, index, arr) {
		if (element.dataset == $scope.dataset) {

		    if (!(element.plugin == "copy" && element.codec == "copy")) {
			if (element.compression_rate > $scope.bestCompressionRate)
			    $scope.bestCompressionRate = element.compression_rate;
			if (element.decompression_rate > $scope.bestDecompressionRate)
			    $scope.bestDecompressionRate = element.decompression_rate;
			if (element.ratio > $scope.bestRatio)
			    $scope.bestRatio = element.ratio;
		    }

		    return true;
		} else {
		    return false;
		}
	    });
	}
    }

    $scope.$watchGroup (Array('machine', 'dataset'), function(newValues, oldValues) {
	if (dataCache[newValues[0]] != undefined) {
	    $scope.data = dataCache[newValues[0]];
	    setData(dataCache[newValues[0]]);
	} else {
    	    squashBenchmarkData(newValues[0]).then (function(data) {
		dataCache[newValues[0]] = data;
		setData(data);
    	    });
	}
    });

    $scope.$watchGroup (['data'], function (newData, oldData, scope) {
	if (newData[0] != undefined) {
            updateChart ();
	}
    });
});

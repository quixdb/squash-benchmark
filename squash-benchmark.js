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
      description: 'The first 10⁹ bytes of the English Wikipedia dump on Mar. 3, 2006',
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
    { name: "peltast",
      cpu: "Intel® Xeon® Processor E3-1225 v3",
      cpuUrl: "http://ark.intel.com/products/75461/",
      architecture: "x86_64",
      speed: 3200 * 1000000,
      memory: 1024 * 20,
      platform: "Lenovo ThinkServer TS140",
      platformUrl: "http://shop.lenovo.com/us/en/servers/thinkserver/ts-series/ts140/",
      distro: "Fedora 21",
      kernel: "3.18.7" },
    // { name: "hoplite",
    //   cpu: "Intel® Core™ i7-2630QM",
    //   cpuUrl: "http://ark.intel.com/products/52219",
    //   architecture: "x86_64",
    //   speed: 2000 * 1000000,
    //   memory: 1024 * 6,
    //   platform: "Toshiba Satellite A660-X",
    //   platformUrl: "http://support.toshiba.com/support/modelHome?freeText=PSAW6U-02100C",
    //   distro: "Fedora 21",
    //   kernel: "3.18.7" },
    // { name: "phalanx",
    //   cpu: "Intel® Atom™ D525",
    //   cpuUrl: "http://ark.intel.com/products/49490",
    //   architecture: "x86_64",
    //   speed: 1800 * 1000000,
    //   memory: 1024 * 4,
    //   platform: "Asus AT5NM10T-I",
    //   platformUrl: "http://www.asus.com/Motherboards/AT5NM10TI/",
    //   distro: "Fedora 21",
    //   kernel: "3.18.7" },
    { name: "s-desktop",
      cpu: "Intel® Core™ i5-2400",
      cpuUrl: "http://ark.intel.com/products/52207",
      architecture: "x86_64",
      speed: 3100 * 1000000,
      memory: 1024 * 4,
      platform: "Asus P8Z68-V",
      platformUrl: "http://www.asus.com/Motherboards/P8Z68V/",
      distro: "Fedora 21",
      kernel: "3.18.7" },
    // { name: "e-desktop",
    //   cpu: "Intel® Core™ i3-2105",
    //   cpuUrl: "http://ark.intel.com/products/55448",
    //   architecture: "x86_64",
    //   speed: 3100 * 1000000,
    //   memory: 1024 * 8,
    //   platform: "Asus P8H61-H",
    //   platformUrl: "http://www.asus.com/Motherboards/P8H61M/",
    //   distro: "Fedora 21",
    //   kernel: "3.18.7" },
    // { name: "raspberry-pi-bplus",
    //   cpu: "Broadcom BCM2835",
    //   cpuUrl: "http://www.broadcom.com/products/BCM2835",
    //   architecture: "armv6l",
    //   speed: 700 * 1000000,
    //   memory: 512,
    //   platform: "Raspberry Pi Model B+",
    //   platformUrl: "http://www.raspberrypi.org/products/model-b-plus/",
    //   distro: "Raspbian",
    //   kernel: "" },
    // { name: "raspberry-pi-2",
    //   cpu: "Broadcom BCM2709",
    //   cpuUrl: "http://www.broadcom.com/products/BCM2709",
    //   architecture: "armv7l",
    //   speed: 900 * 1000000,
    //   memory: 1024,
    //   platform: "Raspberry Pi 2 Model B",
    //   platformUrl: "http://www.raspberrypi.org/products/raspberry-pi-2-model-b/",
    //   distro: "Raspbian",
    //   kernel: "3.18.7" },
    // { name: "pandaboard-es",
    //   cpu: "Texas Instruments OMAP4460",
    //   cpuUrl: "http://www.ti.com/product/omap4460",
    //   architecture: "armv7l",
    //   speed: 1200 * 1000000,
    //   memory: 1024,
    //   platform: "PandaBoard ES revision B1",
    //   platformUrl: "http://pandaboard.org/node/300/#PandaES",
    //   distro: "Ubuntu 14.10",
    //   kernel: "3.18.3" },
    // { name: "beagleboard-xm",
    //   cpu: "Texas Instruments DM3730",
    //   cpuUrl: "http://www.ti.com/product/dm3730",
    //   architecture: "armv7l",
    //   speed: 1000 * 1000000,
    //   memory: 512,
    //   platform: "BeagleBoard-xM revision B",
    //   platformUrl: "http://localhost:8080/",
    //   distro: "Ubuntu 14.10",
    //   kernel: "3.18.3" },
    { name: "odroid-c1",
      cpu: "Amlogic S805",
      cpuUrl: "http://www.amlogic.com/product03.htm",
      architecture: "armv7l",
      speed: 1500 * 1000000,
      memory: 1024,
      platform: "ODROID-C1",
      platformUrl: "http://www.hardkernel.com/main/products/prdt_info.php?g_code=G141578608433",
      distro: "Ubuntu 14.04.2",
      kernel: "3.10.72" },
    // { name: "igepv5",
    //   cpu: "Texas Instruments OMAP5432",
    //   cpuUrl: "http://www.ti.com/product/omap5432",
    //   architecture: "armv7l",
    //   speed: 1500 * 1000000,
    //   memory: 4096,
    //   platform: "ISEE IGEPv5",
    //   platformUrl: "https://isee.biz/products/igep-processor-boards/igepv5-omap5432",
    //   distro: "Ubuntu",
    //   kernel: "" },
    // { name: "edison",
    //   cpu: "",
    //   cpuUrl: "",
    //   architecture: "x86_64",
    //   speed: 500 * 1000000,
    //   memory: 1024,
    //   platform: "Intel® Edison Compute Module",
    //   platformUrl: "http://ark.intel.com/products/84572/Intel-Edison-Compute-Module-IoT",
    //   distro: "Yocto",
    //   kernel: "" },
    { name: "satellite-a205",
      cpu: "Intel® Celeron® Processor 540",
      cpuUrl: "http://ark.intel.com/products/30774/Intel-Celeron-Processor-540-1M-Cache-1_86-GHz-533-MHz-FSB",
      architecture: "x86_64",
      speed: 1860 * 1000000,
      memory: 1024,
      platform: "Toshiba Satellite A205-S5805",
      platformUrl: "",
      distro: "Fedora 21",
      kernel: "3.18.8" },
];

var machine_map = {};
machines.forEach (function (e, i, a) {
    machine_map[e.name] = e;
});

var plugins = [
    { id: "brotli",
      name: "Brotli",
      libraryUrl: "https://github.com/google/brotli",
      codecs: [ { name: "brotli" } ] },
    { id: "bsc",
      name: "bsc",
      libraryUrl: "http://libbsc.com/",
      codecs: [ { name: "bsc" } ] },
    { id: "bzip2",
      name: "bzip2",
      libraryUrl: "http://bzip.org/",
      codecs: [
	  { name: "bzip2",
	    levels: [1, 2, 3, 4, 5, 6, 7, 8, 9] } ] },
    { id: "crush",
      name: "CRUSH",
      libraryUrl: "http://compressme.net/",
      codecs: [
	  { name: "crush",
	    levels: [0, 1, 2] } ] },
    { id: "density",
      name: "DENSITY",
      libraryUrl: "https://github.com/centaurean/density",
      codecs: [
	  { name: "density",
	    levels: [1, 7, 9] } ] },
    { id: "doboz",
      name: "Doboz",
      libraryUrl: "https://bitbucket.org/attila_afra/doboz",
      codecs: [ { name: "doboz" } ] },
    { id: "fari",
      name: "FastARI",
      libraryUrl: "https://github.com/davidcatt/FastARI",
      codecs: [ { name: "fari" } ] },
    { id: "fastlz",
      name: "FastLZ",
      libraryUrl: "http://fastlz.org/",
      codecs: [
	  { name: "fastlz",
	    levels: [1, 2] } ] },
    { id: "gipfeli",
      name: "Gipfeli",
      libraryUrl: "https://github.com/google/gipfeli",
      codecs: [ { name: "gipfeli" } ] },
    { id: "lz4",
      name: "LZ4",
      libraryUrl: "https://code.google.com/p/lz4/",
      codecs: [
	  { name: "lz4",
	    levels: [1, 9] },
	  { name: "lz4f",
	    levels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16] } ] },
    { id: "lzf",
      name: "liblzf",
      libraryUrl: "http://oldhome.schmorp.de/marc/liblzf.html",
      codecs: [ { name: "lzf" } ] },
    { id: "lzg",
      name: "liblzg",
      libraryUrl: "http://liblzg.bitsnbites.eu/",
      codecs: [
	  { name: "lzg",
	    levels: [1, 2, 3, 4, 5, 6, 7, 8, 9] } ] },
    { id: "lzham",
      name: "LZHAM",
      libraryUrl: "https://github.com/richgel999/lzham_codec/",
      codecs: [
	  { name: "lzham",
	    levels: [0, 1, 2, 3, 4] } ] },
    { id: "lzjb",
      name: "LZJB",
      libraryUrl: "https://en.wikipedia.org/wiki/LZJB",
      codecs: [ { name: "lzjb" } ] },
    { id: "lzma",
      name: "XZ Utils",
      libraryUrl: "http://tukaani.org/xz/",
      codecs: [
	  { name: "lzma",
	    levels: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
	  { name: "lzma1",
	    levels: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
	  { name: "lzma2",
	    levels: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
	  { name: "xz",
	    levels: [1, 2, 3, 4, 5, 6, 7, 8, 9] } ] },
    { id: "lzo",
      name: "LZO",
      libraryUrl: "http://www.oberhumer.com/opensource/lzo/",
      codecs: [
	  { name: "lzo1",
	    levels: [1, 99] },
	  { name: "lzo1a",
	    levels: [1, 99] },
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
    { id: "ms-compress",
      name: "ms-compress",
      libraryUrl: "https://github.com/coderforlife/ms-compress/",
      codecs: [
    	  { name: "lznt1" },
    	  { name: "xpress" },
    	  { name: "xpress-huffman" },
      ] },
    { id: "pithy",
      name: "Pithy",
      libraryUrl: "https://github.com/johnezang/pithy",
      codecs: [
          { name: "pithy",
	    levels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]},
      ] },
    { id: "quicklz",
      name: "QuickLZ",
      libraryUrl: "http://www.quicklz.com/",
      codecs: [ { name: "quicklz" } ] },
    { id: "snappy",
      name: "Snappy",
      libraryUrl: "https://code.google.com/p/snappy/",
      codecs: [
    	  { name: "snappy" },
    	  { name: "snappy-framed" }
      ] },
    // { id: "wflz",
    //   name: "wfLZ",
    //   libraryUrl: "https://code.google.com/p/wflz/",
    //   codecs: [
    // 	  { name: "wflz",
    // 	    levels: [1, 2] },
    // 	  { name: "wflz-chunked",
    // 	    levels: [1, 2] },
    //   ] },
    { id: "zlib",
      name: "zlib",
      libraryUrl: "http://zlib.net/",
      codecs: [
    	  { name: "deflate",
    	    levels: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
    	  { name: "gzip",
    	    levels: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
    	  { name: "zlib",
    	    levels: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
      ] },
    // { id: "zling",
    //   name: "libzling",
    //   libraryUrl: "https://github.com/richox/libzling",
    //   codecs: [
    // 	  { name: "zling",
    // 	    levels: [0, 1, 2, 3, 4] },
    //   ] },
    { id: "zpaq",
      name: "ZPAQ",
      libraryUrl: "http://mattmahoney.net/dc/zpaq.html",
      codecs: [
    	  { name: "zpaq",
    	    levels: [1, 2, 3, 4, 5] },
      ] },
    { id: "zstd",
      name: "Zstandard",
      libraryUrl: "https://github.com/Cyan4973/zstd",
      codecs: [
    	  { name: "zstd" },
      ] }
];

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

    return res;
}

var squashBenchmarkApp = angular.module("squashBenchmark", []);

squashBenchmarkApp.factory('squashBenchmarkData', function($q) {
    return function(machineId) {
	return $q(function (resolve, reject) {
	    d3.csv (machineId + ".csv", function(data) {
		resolve(data.map (function (val) {
		    var input_size = dataset_map[val.dataset].size;
		    return {
			dataset: val.dataset,
			plugin: val.plugin,
			codec: val.codec,
			level: val.level,

			input_size: input_size,
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
	$scope.dataset = datasets[Math.floor (Math.random () * datasets.length)].id;
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

    var colors = d3.scale.category20().range()
	.concat (d3.scale.category20b().range(),
		 d3.scale.category20c().range());
    var chartData = [];

    function drawRatioCompressionChart (xAxis, yAxis) {
	if (xAxis == undefined)
	    xAxis = 'linear';
	if (yAxis == undefined)
	    yAxis = 'linear';

	var chart = $("#ratio-compression-chart").highcharts({
            chart: { type: 'scatter' },
            title: { text: 'Compression Ratio vs. Compression Speed' },
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
	    xAxis = 'linear';
	if (yAxis == undefined)
	    yAxis = 'linear';

	var chart = $("#ratio-decompression-chart").highcharts({
            chart: { type: 'scatter' },
            title: { text: 'Compression Ratio vs. Decompression Speed' },
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
	    xAxis = 'linear';
	if (yAxis == undefined)
	    yAxis = 'linear';

	var chart = $("#compression-decompression-chart").highcharts({
            chart: { type: 'scatter' },
            title: { text: 'Compression Speed vs. Decompression Speed' },
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
		return {
		    name: e.plugin,
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

    var updateChart = function () {
	chartData = [];
	var dataIdx = {};

	$scope.data.forEach (function (e, i, a) {
	    if (dataIdx[e.plugin] == undefined) {
		dataIdx[e.plugin] = chartData.length;
		chartData.push ({ plugin: e.plugin, values: [] });
	    }
	    chartData[dataIdx[e.plugin]].values.push ({
		codec: e.codec,
		level: e.level,
		ratio: e.ratio,
		compression_rate: e.compression_rate,
		decompression_rate: e.decompression_rate
	    });
	});

	drawRatioCompressionChart();
	drawRatioDecompressionChart();
	drawCompressionDecompressionChart();
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

		    if (element.compression_rate > $scope.bestCompressionRate)
			$scope.bestCompressionRate = element.compression_rate;
		    if (element.decompression_rate > $scope.bestDecompressionRate)
			$scope.bestDecompressionRate = element.decompression_rate;
		    if (element.ratio > $scope.bestRatio)
			$scope.bestRatio = element.ratio;

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
    })
});

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

function formatSpeed(speed) {
    if (speed < 1024) {
	return speed + " B/s";
    } else if (speed < (1024 * 1024)) {
	return Math.round10(speed / 1024, -2) + " KiB/s";
    } else if (speed < (1024 * 1024 * 1024)) {
	return Math.round10(speed / (1024 * 1024), -2) + " MiB/s";
    } else {
	return Math.round10(speed / (1024 * 1024 * 1024), -2) + " GiB/s";
    }
}

var squashBenchmarkApp = angular.module("squashBenchmark", []);

squashBenchmarkApp.factory('squashBenchmarkData', function($q) {
    return function(machineId) {
	return $q(function (resolve, reject) {
	    d3.csv (machineId + ".csv", function(data) {
		resolve(data.map (function (val) {
		    return {
			dataset: val.dataset,
			plugin: val.plugin,
			codec: val.codec,
			level: val.level,

			input_size: parseInt(val.input_size),
			compressed_size: parseInt(val.compressed_size),
			compress_cpu: parseFloat(val.compress_cpu),
			compress_wall: parseFloat(val.compress_wall),
			decompress_cpu: parseFloat(val.decompress_cpu),
			decompress_wall: parseFloat(val.decompress_wall),

			ratio: val.input_size / val.compressed_size,
			compression_rate: val.input_size / val.compress_cpu,
			decompression_rate: val.input_size / val.decompress_cpu
		    };

		    return val;
		}));
	    });
	});
    };
});

// squashBenchmarkApp.filter('squashBenchmarkDataFilterDataset', function() {
//     return function(input, dataset) {
// 	return (input == undefined) ? undefined : input.filter (function (value, index, arr) {
// 	    return value.dataset == dataset;
// 	});
//     };
// })

squashBenchmarkApp.filter('formatSpeed', function() {
    return function(input) {
	return formatSpeed(input);
    };
})

squashBenchmarkApp.controller("SquashBenchmarkCtrl", function ($scope, squashBenchmarkData) {
    $scope.datasets = [
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

    $scope.machines = [
	{ name: "peltast",
	  cpu: "Intel® Xeon® Processor E3-1225 v3",
	  cpuUrl: "http://ark.intel.com/products/75461/",
	  architecture: "x86_64",
	  speed: 3200,
	  memory: 1024 * 20,
	  platform: "Lenovo ThinkServer TS140",
	  platformUrl: "http://shop.lenovo.com/us/en/servers/thinkserver/ts-series/ts140/",
	  distro: "Fedora 21",
	  kernel: "3.18.7" },
	{ name: "hoplite",
	  cpu: "Intel® Core™ i7-2630QM",
	  cpuUrl: "http://ark.intel.com/products/52219",
	  architecture: "x86_64",
	  speed: 2000,
	  memory: 1024 * 6,
	  platform: "Toshiba Satellite A660-X",
	  platformUrl: "http://support.toshiba.com/support/modelHome?freeText=PSAW6U-02100C",
	  distro: "Fedora 21",
	  kernel: "3.18.7" },
	{ name: "phalanx",
	  cpu: "Intel® Atom™ D525",
	  cpuUrl: "http://ark.intel.com/products/49490",
	  architecture: "x86_64",
	  speed: 1800,
	  memory: 1024 * 4,
	  platform: "Asus AT5NM10T-I",
	  platformUrl: "http://www.asus.com/Motherboards/AT5NM10TI/",
	  distro: "Fedora 21",
	  kernel: "3.18.7" },
	{ name: "s-desktop",
	  cpu: "Intel® Core™ i5-2400",
	  cpuUrl: "http://ark.intel.com/products/52207",
	  architecture: "x86_64",
	  speed: 3100,
	  memory: 0,
	  platform: "Asus P8Z68-V",
	  platformUrl: "http://www.asus.com/Motherboards/P8Z68V/",
	  distro: "Fedora 21",
	  kernel: "3.18.7" },
	{ name: "e-desktop",
	  cpu: "Intel® Core™ i3-2105",
	  cpuUrl: "http://ark.intel.com/products/55448",
	  architecture: "x86_64",
	  speed: 3100,
	  memory: 1024 * 8,
	  platform: "Asus P8H61-H",
	  platformUrl: "http://www.asus.com/Motherboards/P8H61M/",
	  distro: "Fedora 21",
	  kernel: "3.18.7" },
	{ name: "raspberry-pi-bplus",
	  cpu: "Broadcom BCM2835",
	  cpuUrl: "http://www.broadcom.com/products/BCM2835",
	  architecture: "armv6l",
	  speed: 700,
	  memory: 512,
	  platform: "Raspberry Pi Model B+",
	  platformUrl: "http://www.raspberrypi.org/products/model-b-plus/",
	  distro: "Raspbian",
	  kernel: "" },
	{ name: "pandaboard-es",
	  cpu: "Texas Instruments OMAP4460",
	  cpuUrl: "http://www.ti.com/product/omap4460",
	  architecture: "armv7l",
	  speed: 1200,
	  memory: 1024,
	  platform: "PandaBoard ES revision B1",
	  platformUrl: "http://pandaboard.org/node/300/#PandaES",
	  distro: "Ubuntu",
	  kernel: "" },
	{ name: "beagleboard-xm",
	  cpu: "Texas Instruments DM3730",
	  cpuUrl: "http://www.ti.com/product/dm3730",
	  architecture: "armv7l",
	  speed: 1000,
	  memory: 512,
	  platform: "BeagleBoard-xM revision B",
	  platformUrl: "http://localhost:8080/",
	  distro: "Ubuntu",
	  kernel: "" },
	{ name: "odroid-c1",
	  cpu: "Amlogic S805",
	  cpuUrl: "http://www.amlogic.com/product03.htm",
	  architecture: "armv7l",
	  speed: 1500,
	  memory: 1024,
	  platform: "ODROID-C1",
	  platformUrl: "http://www.hardkernel.com/main/products/prdt_info.php?g_code=G141578608433",
	  distro: "Ubuntu",
	  kernel: "" },
	{ name: "igepv5",
	  cpu: "Texas Instruments OMAP5432",
	  cpuUrl: "http://www.ti.com/product/omap5432",
	  architecture: "armv7l",
	  speed: 1500,
	  memory: 4096,
	  platform: "ISEE IGEPv5",
	  platformUrl: "https://isee.biz/products/igep-processor-boards/igepv5-omap5432",
	  distro: "Ubuntu",
	  kernel: "" },
    ];

    var colors = d3.scale.category20().range()
	.concat (d3.scale.category20b().range(),
		 d3.scale.category20c().range());

    function drawRatioCompressionChart (data) {
	$("#ratio-compression-chart").highcharts({
            chart: { type: 'scatter' },
            title: { text: 'Compression Ratio vs. Compression Speed' },
            xAxis: {
		title: {
                    enabled: true,
                    text: 'Compression Speed'
		},
		endOnTick: true,
		min: 0,
		labels: {
		    rotation: -45,
		    formatter: function() { return formatSpeed(this.value); }
		},
		type: 'linear'
            },
            yAxis: {
		title: {
                    text: 'Ratio'
		}
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
            series: data.map(function (e, i, a) {
		var colors = d3.scale.category20().range();
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
	});
    }

    function drawRatioDecompressionChart (data) {
	$("#ratio-decompression-chart").highcharts({
            chart: { type: 'scatter' },
            title: { text: 'Compression Ratio vs. Decompression Speed' },
            xAxis: {
		title: {
                    enabled: true,
                    text: 'Decompression Speed'
		},
		endOnTick: true,
		min: 0,
		labels: {
		    rotation: -45,
		    formatter: function() { return formatSpeed(this.value); }
		},
		type: 'linear'
            },
            yAxis: {
		title: {
                    text: 'Ratio'
		}
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
            series: data.map(function (e, i, a) {
		var colors = d3.scale.category20().range();
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
	});
    }

    function drawCompressionDecompressionChart (data) {
	$("#compression-decompression-chart").highcharts({
            chart: { type: 'scatter' },
            title: { text: 'Compression Speed vs. Decompression Speed' },
            xAxis: {
		title: {
                    enabled: true,
                    text: 'Decompression Speed'
		},
		endOnTick: true,
		min: 0,
		labels: {
		    rotation: -45,
		    formatter: function() { return formatSpeed(this.value); }
		},
		type: 'linear'
            },
            yAxis: {
		title: {
                    text: 'Compression Speed'
		}
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
            series: data.map(function (e, i, a) {
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
	});
    }

    var updateChart = function () {
	var data = [];
	var dataIdx = {};

	$scope.data.forEach (function (e, i, a) {
	    if (dataIdx[e.plugin] == undefined) {
		dataIdx[e.plugin] = data.length;
		data.push ({ plugin: e.plugin, values: [] });
	    }
	    data[dataIdx[e.plugin]].values.push ({
		codec: e.codec,
		level: e.level,
		ratio: e.ratio,
		compression_rate: e.compression_rate,
		decompression_rate: e.decompression_rate
	    });
	});

	drawRatioCompressionChart(data);
	drawRatioDecompressionChart(data);
	drawCompressionDecompressionChart(data);
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

    $scope.machine = 'peltast';
    $scope.dataset = 'enwik8';

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

    $scope.$watchGroup (['data', 'speedChartSort', 'speedChartScale'], function (newData, oldData, scope) {
	if (newData[0] != undefined) {
	    updateChart ();
	}
    })

    $scope.$watchGroup (['data', 'ratioChartSort', 'ratioChartScale'], function (newData, oldData, scope) {
	if (newData[0] != undefined) {
	    // drawRatioChart ();
	}
    })

    $scope.$watchGroup (['data', 'ratioCompressionChartScale'], function (newData, oldData, scope) {
	if (newData[0] != undefined) {
	    // drawRatioCompressionChart ();
	}
    })
});

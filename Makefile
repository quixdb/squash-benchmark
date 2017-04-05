CC:=cc
SQUASH:=squash
WGET:=wget

all: default.csv

benchmark: benchmark.c timer.c
	$(CC) -Wall -Wextra -g -o benchmark $^ `pkg-config --libs --cflags squash-0.8`

%:: %.gz
	$(SQUASH) -kfdc gzip $^ $@

%:: %.xz
	$(SQUASH) -kfdc xz $^ $@

%:: %.bz2
	$(SQUASH) -kfdc bzip2 $^ $@

# Canterbury

CANTERBURY = \
	alice29.txt \
	asyoulik.txt \
	cp.html \
	fields.c \
	grammar.lsp \
	kennedy.xls \
	lcet10.txt \
	sum \
	xargs.1

cantrbry.zip:
	$(WGET) -O "$@" "http://corpus.canterbury.ac.nz/resources/cantrbry.zip" && touch "$@"

$(CANTERBURY): cantrbry.zip
	unzip -q -o "$^" "$@" && touch "$@"

canterbury.csv: benchmark $(CANTERBURY)
	./benchmark -o $@ $(filter-out $<,$^) 2>&1 | tee $(@:.csv=.log)

# Silesia

SILESIA = \
	dickens \
	mozilla \
	mr \
	nci \
	ooffice \
	osdb \
	reymont \
	samba \
	sao \
	webster \
	xml \
	x-ray

silesia.csv: benchmark $(SILESIA)
	./benchmark -o $@ $(filter-out $<,$^) 2>&1 | tee $(@:.csv=.log)

$(SILESIA:=.bz2):
	$(WGET) -O "$@" "http://sun.aei.polsl.pl/~sdeor/corpus/$@" && touch "$@"

# Large Text Compression Benchmark

LTCB = \
	enwik8 \
	enwik9

$(LTCB:=.zip):
	$(WGET) -O "$@" "http://www.mattmahoney.net/dc/$@" && touch "$@"

enwik%: enwik%.zip
	unzip -q -o $< && touch "$@"

ltcb.csv: benchmark $(LTCB)
	./benchmark -o $@ $(filter-out $<,$^) 2>&1 | tee $(@:.csv=.log)

# Snappy

SNAPPY = \
	fireworks.jpeg \
	geo.protodata \
	paper-100k.pdf \
	plrabn12.txt \
	urls.10K

$(SNAPPY):
	$(WGET) -O "$@" "https://raw.githubusercontent.com/google/snappy/master/testdata/$@" && touch "$@"

snappy.csv: benchmark $(SNAPPY)
	./benchmark -o $@ $(filter-out $<,$^) 2>&1 | tee $(@:.csv=.log)

# Genome

GENOME = \
	chr1.fa \
	chr2.fa \
	chr3.fa \
	chr4.fa \
	chr5.fa \
	chr6.fa \
	chr7.fa \
	chr8.fa \
	chr9.fa \
	chr10.fa \
	chr11.fa \
	chr12.fa \
	chr13.fa \
	chr14.fa \
	chr15.fa \
	chr16.fa \
	chr17.fa \
	chr18.fa \
	chr19.fa \
	chr20.fa \
	chr21.fa \
	chr22.fa

$(GENOME:=.gz):
	$(WGET) -O "$@" "http://hgdownload.cse.ucsc.edu/goldenPath/hg38/chromosomes/$@" && touch "$@"

genome.csv: benchmark $(GENOME)
	./benchmark -o $@ $(filter-out $<,$^) 2>&1 | tee $(@:.csv=.log)

# Squash Compression Corpus (WIP)

SQUASH_CORPUS = \
	MG44-MathGuide.tar \
	bootstrap-3.3.6.min.css \
	eff.html \
	girl-brunette.blend \
	jquery-2.1.4.min.js \
	random \
	raspbian-jessie-lite-20151121.tar \
	vmlinux-4.2.6-300.fc23.x86_64

$(SQUASH_CORPUS:=.xz):
	$(WGET) -O "$@" "https://github.com/nemequ/squash-corpus/raw/master/data/$@" && touch "$@"

squash.csv: benchmark $(SQUASH_CORPUS)
	./benchmark -o $@ $(filter-out $<,$^) 2>&1 | tee $(@:.csv=.log)

# Default data set (Canterbury, Silesia, Snappy, and enwik8).

DEFAULT = \
	$(CANTERBURY) \
	$(SILESIA) \
	$(LTCB) \
	$(SNAPPY)

default.csv: benchmark $(filter-out enwik9,$(DEFAULT))
	./benchmark -o $@ $(sort $(DEFAULT)) 2>&1 | tee $(@:.csv=.log)

# Benchmark a single piece of data

%.csv: benchmark %
	./benchmark -o $@ $(filter-out $<,$^) 2>&1 | tee $(@:.csv=.log)

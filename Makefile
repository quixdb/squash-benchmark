CC=cc

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

SILESA = \
	dickens \
	mozilla \
	mr \
	nci \
	ooffice \
	osdb \
	plrabn12.txt \
	ptt5 \
	reymont \
	samba \
	sao \
	webster \
	xml \
	x-ray

LTCB = \
	enwik8

SNAPPY = \
	fireworks.jpeg \
	geo.protodata \
	paper-100k.pdf \
	urls.10K

DATA = \
	$(CANTERBURY) \
	$(SILESA) \
	$(LTCB) \
	$(SNAPPY)

all: data.csv

%:: %.xz
	squash -kdc xz $^ $@

benchmark: benchmark.c timer.c
	$(CC) -g -o benchmark $^ `pkg-config --libs --cflags squash-0.7`

data.csv: benchmark $(DATA)
	./benchmark -o $@ $(sort $(DATA)) 2>&1 | tee result.log

CC=cc

CANTERBURY = \
	alice29.txt \
	asyoulik.txt \
	cp.html \
	fields.c \
	grammar.lsp \
	kennedy.xls \
	lcet10.txt \
	plrabn12.txt \
	ptt5 \
	sum \
	xargs.1

SILESA = \
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

# for the *.xz dependencies found, keep the source, decompress, using the xz codec
%:: %.xz
	squash -kdc xz $^ $@

benchmark: benchmark.c timer.c parg.c
	$(CC) -Wall -Wextra -g -o benchmark $^ `pkg-config --libs --cflags squash-0.8`

data.csv: benchmark $(DATA)
	@if [ -e /sys/devices/system/cpu/cpu0/cpufreq/scaling_governor -a "`cat /sys/devices/system/cpu/cpu0/cpufreq/scaling_governor`" != "performance" ]; then echo -e "WARNING: You should switch to the 'performance' CPU governor by running\n\n\tsu -c 'echo performance | tee /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor'\n"; fi
	./benchmark -o $@ $(sort $(DATA)) 2>&1 | tee result.log

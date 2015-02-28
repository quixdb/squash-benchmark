CC=cc

DATA = \
	alice29.txt \
	asyoulik.txt \
	cp.html \
	dickens \
	enwik8 \
	fields.c \
	grammar.lsp \
	kennedy.xls \
	lcet10.txt \
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
	sum \
	webster \
	xargs.1 \
	xml \
	x-ray

all: data.csv

alice29.txt: alice29.txt.xz
	squash -kdc xz alice29.txt.xz

asyoulik.txt: asyoulik.txt.xz
	squash -kdc xz asyoulik.txt.xz

cp.html: cp.html.xz
	squash -kdc xz cp.html.xz

dickens: dickens.xz
	squash -kdc xz dickens.xz

enwik8: enwik8.xz
	squash -kdc xz enwik8.xz

fields.c: fields.c.xz
	squash -kdc xz fields.c.xz

grammar.lsp: grammar.lsp.xz
	squash -kdc xz grammar.lsp.xz

kennedy.xls: kennedy.xls.xz
	squash -kdc xz kennedy.xls.xz

lcet10.txt: lcet10.txt.xz
	squash -kdc xz lcet10.txt.xz

mozilla: mozilla.xz
	squash -kdc xz mozilla.xz

mr: mr.xz
	squash -kdc xz mr.xz

nci: nci.xz
	squash -kdc xz nci.xz

ooffice: ooffice.xz
	squash -kdc xz ooffice.xz

osdb: osdb.xz
	squash -kdc xz osdb.xz

plrabn12.txt: plrabn12.txt.xz
	squash -kdc xz plrabn12.txt.xz

ptt5: ptt5.xz
	squash -kdc xz ptt5.xz

reymont: reymont.xz
	squash -kdc xz reymont.xz

samba: samba.xz
	squash -kdc xz samba.xz

sao: sao.xz
	squash -kdc xz sao.xz

sum: sum.xz
	squash -kdc xz sum.xz

webster: webster.xz
	squash -kdc xz webster.xz

xargs.1: xargs.1.xz
	squash -kdc xz xargs.1.xz

xml: xml.xz
	squash -kdc xz xml.xz

x-ray: x-ray.xz
	squash -kdc xz x-ray.xz

benchmark: benchmark.c timer.c
	$(CC) `pkg-config --libs --cflags squash-0.1` -o benchmark $^

data.csv: benchmark $(DATA)
	./benchmark -o $@ $(DATA)

#!/bin/bash

# Merges one or more csvs into an (existing) destination csv
# Usage: merge.sh dest source...

DEST="$1"
shift

while [ $# -gt 0 ]; do
    EXP="XXX"
    FIRST=0
    while read line; do
	if [ $FIRST = 0 ]; then
	    FIRST=1;
	    EXP="^($line"
	else
	    EXP="$EXP|$line"
	fi
	# echo "oo $EXP"
    done < <(tail -n+2 "$1" | grep -Po '^[^,]+,[^,]+,[^,]+,[0-9]*,')

    EXP="${EXP})"

    TMPFILE="$(mktemp)"

    grep -Pv "${EXP}" "$DEST" > "$TMPFILE"
    tail -n+2 "$1" >> "$TMPFILE"

    head -n1 "$TMPFILE" > "$DEST"
    tail -n+2 "$TMPFILE" | sort -V | uniq >> "$DEST"

    rm $TMPFILE

    shift
done

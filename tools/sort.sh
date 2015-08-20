#!/bin/sh

# Just puts a CSV in the a consistent order, which makes it easier to
# deal with partial updates.  Sometimes I forget to give a machine more
# swap before running the benchmark, seems sill to re-run the whole
# thing...

TMPNAME=$(mktemp)
head -n1 "$1" > "${TMPNAME}"
tail -n+2 "$1" | sort -V >> "${TMPNAME}"
cat "${TMPNAME}" | uniq > "$1"
rm "${TMPNAME}"

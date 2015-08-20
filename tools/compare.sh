#!/bin/sh

# Easy way to find missing configurations
# ./compare.sh good bad

GOOD=$(mktemp)
BAD=$(mktemp)

grep -Po '^[^,]+,[^,]+,[^,]+,[0-9]*,' "$1" > "${GOOD}"
grep -Po '^[^,]+,[^,]+,[^,]+,[0-9]*,' "$2" > "${BAD}"
colordiff -u "${GOOD}" "${BAD}"

rm "${GOOD}" "${BAD}"

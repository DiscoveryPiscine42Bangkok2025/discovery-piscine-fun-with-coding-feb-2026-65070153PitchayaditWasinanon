#!/bin/bash

if [ $# -eq 0 ]; then
	echo "No arguments supplied"
	exit 1
fi

for num in "$@"
do
	mkdir -p "ex$num"
done

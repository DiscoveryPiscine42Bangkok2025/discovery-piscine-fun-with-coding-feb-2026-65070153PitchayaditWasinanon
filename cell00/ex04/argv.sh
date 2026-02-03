#!/bin/bash

if [ $# -eq 0 ]; then
    echo "No arguments supplied"
    exit 1
fi

if [ $# -gt 3 ]; then
    exit 0
fi

for arg in "$@"

do
    echo "$arg"
done

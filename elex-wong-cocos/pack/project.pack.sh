#!/bin/bash

# rm -rf ../build
tsc -p .
gulp -f ./build/pack/gulpfile.js $1
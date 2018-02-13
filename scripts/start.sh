#!/usr/bin/env bash
# clean build directory
rm -Rf ./build
mkdir ./build
# bundle and webpack js to single index file
./node_modules/webpack/bin/webpack.js --watch

#!/bin/bash

DIR="$( cd "$( dirname "$0" )" && pwd )"
NAME=$(grep name ${DIR}/package.json | sed 's/.*"name": "\(.*\)".*/\1/')
VERSION=$(grep version ${DIR}/package.json | sed 's/.*"version": "\(.*\)".*/\1/')
docker build -t "${NAME}:${VERSION}" $DIR
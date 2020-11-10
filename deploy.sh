#!/bin/bash

# DIR = Base directory
DIR="$( cd "$( dirname "$0" )" && pwd )"

# Iterate all folders
for FOLDER in $DIR/*/; do
    FILE=${FOLDER}build.sh
    # If Folder has a build.sh script. Execute it
    if [ -f $FILE ]; then
        echo "$FOLDER have a build script"
        chmod +x $FILE
        sh $FILE
    fi
done

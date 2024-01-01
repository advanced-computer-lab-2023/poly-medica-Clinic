#!/bin/bash

services=("authentication" "clinic" "communication" "patient" "payment" "client")

for service in "${services[@]}"; do
    cd "$service" || exit
    npm i
    cd ..
done

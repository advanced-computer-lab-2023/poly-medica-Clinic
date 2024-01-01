#!/bin/bash

services=("authentication" "clinic" "communication" "patient" "payment")

for service in "${services[@]}"; do
    cd "$service" || exit
    npm run test
    cd ..
done

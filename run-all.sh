#!/bin/bash

concurrently "cd authentication && nodemon start" "cd clinic && nodemon start" "cd patient && nodemon start" "cd payment && nodemon start" "cd communication && nodemon start" "cd client && npm start"

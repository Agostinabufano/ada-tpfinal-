#!/bin/bash

docker run --rm --name reactFront -v `pwd`:/app -w /app -p 3003:3000 -d reactFront

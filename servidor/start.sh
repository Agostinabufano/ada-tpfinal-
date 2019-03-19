#!/bin/bash

docker run --rm --name reactServer -v `pwd`:/app -w /app -p 3002:3000 -d reactServer

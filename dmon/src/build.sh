#!/bin/bash

protoc -I . \
    --grpc_out=. --plugin=protoc-gen-grpc=/usr/local/bin/grpc_cpp_plugin \
    *.proto

protoc -I . \
    --cpp_out=. \
    *.proto

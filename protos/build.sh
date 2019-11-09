#!/bin/bash

protoc -I . \
    --grpc_out=../client-monitor/src --plugin=protoc-gen-grpc=/usr/local/bin/grpc_cpp_plugin \
    *.proto

protoc -I . \
    --cpp_out=../client-monitor/src \
    *.proto

#mv ../client-monitor/src/*.h ../client-monitor/include/

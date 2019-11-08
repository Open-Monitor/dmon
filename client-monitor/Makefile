#ttp://www.cs.colby.edu/maxwell/courses/tutorials/maketutor/
APPNAME=client

IDIR=/include
SRCDIR=src

CC=g++
CXX=g++
CFLAGS=-std=c++11 -I$(IDIR)
CPPFLAGS+=`pkg-config --cflags protobuf grpc`


LDFLAGS += -L/usr/local/lib `pkg-config --libs protobuf grpc++`\
           -pthread\
           -Wl,--no-as-needed -lgrpc++_reflection -Wl,--as-needed\
           -ldl


# Protobufs
PROTOC = protoc
GRPC_CPP_PLUGIN = grpc_cpp_plugin
GRPC_CPP_PLUGIN_PATH ?= `which $(GRPC_CPP_PLUGIN)`
PROTOS_PATH=../protos


$(APPNAME): $(PROTOS_PATH)/service-guide.pb.o $(PROTOS_PATH)/service-guide.grpc.pb.o $(SRCDIR)/networkMon.cpp $(SRCDIR)/systemMon.cpp $(SRCDIR)/client.cpp
	$(CC) $^ $(LDFLAGS) -o $@

%.grpc.pb.cc: %.proto
	$(PROTOC) -I $(PROTOS_PATH) --grpc_out=../../protos --plugin=protoc-gen-grpc=$(GRPC_CPP_PLUGIN_PATH) $<

%.pb.cc: %.proto
	$(PROTOC) -I $(PROTOS_PATH) --cpp_out=../../protos $<

.PHONY: clean

clean:
	rm -f $(ODIR)/*.o *~ core $(INCDIR)/*~ *.pb.cc *.o

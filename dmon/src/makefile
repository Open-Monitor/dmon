#http://www.cs.colby.edu/maxwell/courses/tutorials/maketutor/
OUTNAME=dmon

IDIR=../include
CC=g++
CFLAGS=-std=c++11 -I$(IDIR)
CPPFLAGS+=`pkg-config --cflags protobuf grpc`

ODIR=obj
LDIR=../lib

LDFLAGS += -L/usr/local/lib `pkg-config --libs protobuf grpc++`\
           -pthread\
           -Wl,--no-as-needed -lgrpc++_reflection -Wl,--as-needed\
           -ldl
LIBS=-lm

_DEPS =  systemMon.h networkMon.h
DEPS = $(patsubst %,$(IDIR)/%,$(_DEPS))

_OBJ =  systemMon.o networkMon.o client.o
OBJ = $(patsubst %,$(ODIR)/%,$(_OBJ))


PROTOC = protoc
GRPC_CPP_PLUGIN = grpc_cpp_plugin
GRPC_CPP_PLUGIN_PATH ?= `which $(GRPC_CPP_PLUGIN)`

PROTOS_PATH = .

vpath %.proto $(PROTOS_PATH)

#$(ODIR)/%.o: %.cpp $(DEPS)
#	$(CC) -c $(LDFLAGS) -o $@ $< $(CFLAGS)
#
#$(OUTNAME): $(OBJ)
#	$(CC) -o $@ $^ $(CFLAGS) $(LDFLAGS) $(LIBS)
#
all: client server

client: service-guide.pb.o service-guide.grpc.pb.o client.o
	$(CC) $^ $(LDFLAGS) -o $@

server: service-guide.pb.o service-guide.grpc.pb.o server.o
	$(CC) $^ $(LDFLAGS) -o $@

%.grpc.pb.cc: %.proto
	$(PROTOC) -I $(PROTOS_PATH) --grpc_out=. --plugin=protoc-gen-grpc=$(GRPC_CPP_PLUGIN_PATH) $<

%.pb.cc: %.proto
	$(PROTOC) -I $(PROTOS_PATH) --cpp_out=. $<


.PHONY: clean

clean:
	rm -f $(ODIR)/*.o *~ core $(INCDIR)/*~ *.pb.cc

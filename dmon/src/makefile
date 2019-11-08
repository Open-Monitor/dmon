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

_DEPS = dmon.h systemMon.h networkMon.h
DEPS = $(patsubst %,$(IDIR)/%,$(_DEPS))

_OBJ = dmon.o systemMon.o networkMon.o client.o
OBJ = $(patsubst %,$(ODIR)/%,$(_OBJ))

PROTOC=protoc
GRPC_CPP_PLUGIN = grpc_cpp_plugin
GRPC_CPP_PLUGIN_PATH ?= `which $(GRPC_CPP_PLUGIN)`

PROTOS_PATH = ../protos

vpath %.proto $(PROTOS_PATH)


$(ODIR)/%.o: %.cpp $(DEPS)
	$(CC) -c $(LDFLAGS) -o $@ $< $(CFLAGS)

$(OUTNAME): $(OBJ)
	$(CC) -o $@ $^ $(CFLAGS) $(LDFLAGS) $(LIBS)


.PHONY: clean

clean:
	rm -f $(ODIR)/*.o *~ core $(INCDIR)/*~

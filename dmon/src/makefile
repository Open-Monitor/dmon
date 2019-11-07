#http://www.cs.colby.edu/maxwell/courses/tutorials/maketutor/
OUTNAME=dmon

IDIR=../include
CC=g++
CFLAGS=-std=c++11 -I$(IDIR)

ODIR=obj
LDIR=../lib

LIBS=-lm

_DEPS = dmon.h systemMon.h
DEPS = $(patsubst %,$(IDIR)/%,$(_DEPS))

_OBJ = dmon.o systemMon.o
OBJ = $(patsubst %,$(ODIR)/%,$(_OBJ))

$(ODIR)/%.o: %.cpp $(DEPS)
	$(CC) -c -o $@ $< $(CFLAGS)

$(OUTNAME): $(OBJ)
	$(CC) -o $@ $^ $(CFLAGS) $(LIBS)

.PHONY: clean

clean:
	rm -f $(ODIR)/*.o *~ core $(INCDIR)/*~

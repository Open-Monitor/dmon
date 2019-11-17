TARGET_EXEC ?= client

BUILD_DIR ?= build
SRC_DIRS ?= src

SRCS := $(shell find $(SRC_DIRS) -name *.cpp -or -name *.cc)
OBJS := $(SRCS:%=$(BUILD_DIR)/%.o)
DEPS := $(OBJS:.o=.d)

INC_DIRS := $(shell find $(SRC_DIRS) -type d) ./include
INC_FLAGS := $(addprefix -I,$(INC_DIRS))

CPPFLAGS ?= $(INC_FLAGS) -MMD -MP

LDFLAGS = -Wall \
		  -Bstatic /usr/local/lib/libgrpc++.a \
		  -Bstatic /usr/local/lib/libprotobuf.a \
		  -Bstatic /usr/local/lib/libgrpc.a \
		  -Bstatic /usr/local/lib/libgrpc++_reflection.a \
		  -lpthread \
		  -lz \

$(TARGET_EXEC): $(OBJS)
	$(CXX) $(OBJS) -o $@ $(LDFLAGS)

# assembly
$(BUILD_DIR)/%.s.o: %.s
	$(MKDIR_P) $(dir $@)
	$(CXX) $(CPPFLAGS) $(ASFLAGS) -c $< -o $@

# c source
$(BUILD_DIR)/%.c.o: %.c
	$(MKDIR_P) $(dir $@)
	$(CXX) $(CPPFLAGS) $(CFLAGS) -c $< -o $@

# c++ source
$(BUILD_DIR)/%.cpp.o: %.cpp
	$(MKDIR_P) $(dir $@)
	$(CXX) $(CPPFLAGS) $(CXXFLAGS) -c $< -o $@

# cc source
$(BUILD_DIR)/%.cc.o: %.cc
	$(MKDIR_P) $(dir $@)
	$(CXX) $(CPPFLAGS) $(CXXFLAGS) -c $< -o $@

.PHONY: clean

clean:
	$(RM) -r $(BUILD_DIR)

-include $(DEPS)

MKDIR_P ?= mkdir -p

#!/bin/bash

FLAGS="-Ofast"
STD="c++17"
WORKING_CLASS="main.cpp"
OUTPUT_NAME="run"

#need gdate on macos (coreutils) to get nanoseconds
if [ "$OSTYPE" = "darwin18" ]; then
    date="gdate"
    check="\342\234\224"
    fail="\342\234\226"
else
    check="\u2714"
    fail="\u2716"
    date="date"
fi;

function spiner {
    tput sc
    printf "  Compiling using g++ $(g++ -dumpversion)\r"
    sp="/-\|"
    while kill -0 $PID 2> /dev/null; do
        printf "$(tput setaf 11)\b${sp:i++%${#sp}:1}$(tput sgr0)\b"
        sleep .25
    done;
	wait $PID
	EC=$?
    tput rc; tput el
	if [ $EC != 0 ]; then
        printf "$(tput setaf 1)$fail Failed $(tput sgr0)to compile $(tput setaf 3)$WORKING_CLASS $(tput sgr0)$WORKING_PACKAGE\n"
	else
        printf "$(tput setaf 2)$check Compiled $(tput setaf 3)$WORKING_CLASS $(tput sgr0)in %.6f seconds\n\n" $dur
		run
	fi;
}


function run {
    ./$OUTPUT_NAME
}

function compile {
    comp="g++ -std=$STD $FLAGS -o $OUTPUT_NAME main.cpp"
    start=$($date +%s.%N);
    $comp & PID=$!
    dur=$(echo "$($date +%s.%N) - $start" | bc);
    spiner
}
compile

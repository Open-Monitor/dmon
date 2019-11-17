#/!/bin/bash

# ya this is painful, keygen helps but scp wont learn keygen with
# a port flag specified, this means we have to ssh in, kill, scp from local
# then ssh and restart


hosts=(mjm bespoke chrisk quentinrow mcc hc sp tss djm ap bjhb)

for i in ${hosts[@]}; do
    printf "\nUpdating $(tput setaf 2)$i...\n$(tput sgr0)"
    ssh -o ConnectTimeout=5 $i "kill -9 \$(ps -aux | grep './client' | awk '{print \$2}')"
    scp ./client $i:~/
    ssh -f -o ConnectTimeout=5 $i "nohup ./client 136.60.227.124:50486 &> /dev/null"
    printf "$(tput setaf 2)Updated $(tput sgr0)- Moving on\n"
done;

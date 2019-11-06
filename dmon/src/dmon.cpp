#include <string>
#include <stdio.h>
#include <stdio.h>

#include <sys/types.h>
#include <sys/sysinfo.h>

//for ipv4
#include <ifaddrs.h>
#include <netinet/in.h>
#include <arpa/inet.h>

//for the sleep loop
#include <chrono>
#include <thread>


struct sysinfo memInfo;
struct memStruct {
    long long freeMem;
    long long memUsed;
    long long totalMem;
};
memStruct getMemUseage() {
  sysinfo (&memInfo);

  memStruct mem;

  long long totalVirtualMem = memInfo.totalram;
  totalVirtualMem *= memInfo.mem_unit;
  long long freeMemAvail = memInfo.freeram;
  freeMemAvail *= memInfo.mem_unit;
  long long virtualMemUsed = memInfo.totalram - memInfo.freeram;
  virtualMemUsed *= memInfo.mem_unit;
  mem.freeMem = freeMemAvail / 1024;
  mem.memUsed = virtualMemUsed / 1024;
  mem.totalMem = totalVirtualMem / 1024;
  return mem;

}

static unsigned long long lastTotalUser, lastTotalUserLow, lastTotalSys, lastTotalIdle;
double getCpuUseage(){
    double percent;
    FILE* file;
    unsigned long long totalUser, totalUserLow, totalSys, totalIdle, total;

    file = fopen("/proc/stat", "r");
    fscanf(file, "cpu %llu %llu %llu %llu", &totalUser, &totalUserLow,
        &totalSys, &totalIdle);
    fclose(file);


    if (totalUser < lastTotalUser || totalUserLow < lastTotalUserLow ||
        totalSys < lastTotalSys || totalIdle < lastTotalIdle){
        percent = -1.0;
    } else{
        total = (totalUser - lastTotalUser) + (totalUserLow - lastTotalUserLow) +
            (totalSys - lastTotalSys);
        percent = total;
        total += (totalIdle - lastTotalIdle);
        percent /= total;
        percent *= 100;
    }

    lastTotalUser = totalUser;
    lastTotalUserLow = totalUserLow;
    lastTotalSys = totalSys;
    lastTotalIdle = totalIdle;

    return percent;
}

struct loadStruct {
  double loadAvg5;
  double loadAvg10;
  double loadAvg15;
};
loadStruct getLoad() {
    FILE* file;
		double load5, load10, load15;
    loadStruct load;

    file = fopen("/proc/loadavg", "r");
    fscanf(file, "%lf %lf %lf", &load5, &load10, &load15);
    fclose(file);
    load.loadAvg5 = load5;
    load.loadAvg10 = load10;
    load.loadAvg15 = load15;
    return load;
}

// need to test on server, lo and enp3so
// this is kinda tricky --so
struct ipStruct {
  std::string addr;
  std::string name;
};
ipStruct getIPV4Addr () {
    struct ifaddrs * ifAddrStruct=NULL;
    struct ifaddrs * ifa=NULL;
    void * tmpAddrPtr=NULL;

    getifaddrs(&ifAddrStruct);
		ipStruct info;

    for (ifa = ifAddrStruct; ifa != NULL; ifa = ifa->ifa_next) {
        if (!ifa->ifa_addr) {
            continue;
        }
        if (ifa->ifa_addr->sa_family == AF_INET) {
            tmpAddrPtr=&((struct sockaddr_in *)ifa->ifa_addr)->sin_addr;
            char addressBuffer[INET_ADDRSTRLEN];
            inet_ntop(AF_INET, tmpAddrPtr, addressBuffer, INET_ADDRSTRLEN);
            info.addr = addressBuffer;
            info.name = ifa->ifa_name;
            return info;
				}
    }
    if (ifAddrStruct!=NULL)
			freeifaddrs(ifAddrStruct);
    return info;
}

void printer() {
	while (true) {
    printf("\n");
    loadStruct load = getLoad();
    ipStruct ip = getIPV4Addr();
    memStruct mem = getMemUseage();
    double cpu = getCpuUseage();
    printf("Free Mem Available:\t %lld \t\t MB\n", mem.freeMem /1024);
    printf("Virtual Mem Used:\t %lld \t\t MB\n", mem.memUsed /1024);
    printf("Total Virtual Mem:\t %lld \t\t MB\n", mem.totalMem /1024);
    printf("Load 5min Average:\t %.2f \t\t %%\n", load.loadAvg5);
    printf("Load 10min Average:\t %.2f \t\t %%\n", load.loadAvg10);
    printf("Load 15min Average:\t %.2f \t\t %%\n", load.loadAvg15);
    printf("Total CPU Useage:\t %.2f \t\t %%\n", cpu);
    //printf("IPv4 Address:\t\t %s \t %s \n", ip.addr.c_str(), ip.name.c_str());
    std::this_thread::sleep_for(std::chrono::seconds(2));
	}
}

int main() {
	printf("\n");
  bool loop = true;
  if (loop)
    printer();

  loadStruct load = getLoad();
  ipStruct ip = getIPV4Addr();
  memStruct mem = getMemUseage();
  printf("Free Mem Available:\t %lld \t Kib\n", mem.freeMem);
  printf("Virtual Mem Used:\t %lld \t Kib\n", mem.memUsed);
  printf("Total Virtual Mem:\t %lld \t Kib\n", mem.totalMem);
  //this seems off by a couple points vs top
  printf("Total CPU Useage:\t %.2f \t\t %% \n", getCpuUseage());
  printf("Load 5min Average:\t %.2f \t\t %%\n", load.loadAvg5);
  printf("Load 10min Average:\t %.2f \t\t %%\n", load.loadAvg10);
  printf("Load 15min Average:\t %.2f \t\t %%\n", load.loadAvg15);
  printf("IPv4 Address:\t\t %s \t %s \n", ip.addr.c_str(), ip.name.c_str());
}

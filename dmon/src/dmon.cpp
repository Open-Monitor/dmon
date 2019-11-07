#include <string>
#include <stdio.h>
//for ipv4
#include <ifaddrs.h>
#include <netinet/in.h>
#include <arpa/inet.h>

//for the sleep loop
#include <chrono>
#include <thread>

#include "../include/systemMon.h"

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
  SystemMonitor systemMon = SystemMonitor();
	while (true) {
    printf("\n");
    ipStruct ip = getIPV4Addr();
    SystemMonitor::loadStruct load = systemMon.getLoad();
    SystemMonitor::memoryStruct mem = systemMon.getMem();
    double cpu = systemMon.getCpu();
    double uptime = systemMon.getUptime();
    SystemMonitor::versionStruct vStruct = systemMon.getVersion();
    printf("%s %s %s \n", vStruct.os.c_str(),
        vStruct.version.c_str(),
        vStruct.release.c_str());
    printf("Free Mem Available:\t %lld \t\t MB\n", mem.freeMem /1024);
    printf("Virtual Mem Used:\t %lld \t\t MB\n", mem.memUsed /1024);
    printf("Total Virtual Mem:\t %lld \t\t MB\n", mem.totalMem /1024);
    printf("Load 5min Average:\t %.2f \t\t %%\n", load.loadAvg5);
    printf("Load 10min Average:\t %.2f \t\t %%\n", load.loadAvg10);
    printf("Load 15min Average:\t %.2f \t\t %%\n", load.loadAvg15);
    printf("Total CPU Useage:\t %.2f \t\t %%\n", cpu);
    printf("Total Uptime:\t %.2f \t\t Sec\n", uptime);
    //printf("IPv4 Address:\t\t %s \t %s \n", ip.addr.c_str(), ip.name.c_str());
    std::this_thread::sleep_for(std::chrono::seconds(2));
	}
}

int main() {
	printf("\n");
  bool loop = true;
  if (loop)
    printer();

  ipStruct ip = getIPV4Addr();

  SystemMonitor systemMon = SystemMonitor();
  SystemMonitor::versionStruct vStruct = systemMon.getVersion();
  SystemMonitor::loadStruct load = systemMon.getLoad();
  SystemMonitor::memoryStruct mem = systemMon.getMem();
  printf("%s %s %s \n", vStruct.os.c_str(),
      vStruct.version.c_str(),
      vStruct.release.c_str());
  printf("Free Mem Available:\t %lld \t Kib\n", mem.freeMem);
  printf("Virtual Mem Used:\t %lld \t Kib\n", mem.memUsed);
  printf("Total Virtual Mem:\t %lld \t Kib\n", mem.totalMem);
  //this seems off by a couple points vs top
  printf("Total CPU Useage:\t %.2f \t\t %% \n", systemMon.getCpu());
  printf("Load 5min Average:\t %.2f \t\t %%\n", load.loadAvg5);
  printf("Load 10min Average:\t %.2f \t\t %%\n", load.loadAvg10);
  printf("Load 15min Average:\t %.2f \t\t %%\n", load.loadAvg15);
  printf("Total Uptime:\t\t %.2f \t Sec\n", systemMon.getUptime());
  //printf("IPv4 Address:\t\t %s \t %s \n", ip.addr.c_str(), ip.name.c_str());
}

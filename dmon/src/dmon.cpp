#include <string>
#include <stdio.h>

//for the sleep loop
#include <chrono>
#include <thread>

#include "../include/networkMon.h"
#include "../include/systemMon.h"

void printer() {
  SystemMonitor systemMon = SystemMonitor();
  NetworkMonitor networkMon = NetworkMonitor();
	while (true) {
    printf("\n");
    NetworkMonitor::ipStruct ip = networkMon.getIPV4Addr();
    NetworkMonitor::bandwidthStruct bStruct = networkMon.getBandwidth();
    //SystemMonitor::loadStruct load = systemMon.getLoad();
    SystemMonitor::memoryStruct mem = systemMon.getMem();
    SystemMonitor::versionStruct vStruct = systemMon.getVersion();
    SystemMonitor::diskStruct disk = systemMon.getDiskIO();
    double cpu = systemMon.getCpu();
    double uptime = systemMon.getUptime();
    printf("%s %s %s \n", vStruct.os.c_str(),
        vStruct.version.c_str(),
        vStruct.release.c_str());
    printf("Free Mem Available:\t %lld \t\t MB\n", mem.freeMem /1024);
    printf("Virtual Mem Used:\t %lld \t\t MB\n", mem.memUsed /1024);
    printf("Total Virtual Mem:\t %lld \t\t MB\n", mem.totalMem /1024);
    printf("Disk Sectors Read:\t %lu \t Kib\n", disk.read);
    printf("Disk Sectors Written:\t %lu \t Kib\n", disk.write);
    printf("Disk I/O in Progress:\t %lu \t\t %%\n", disk.ios_pgr);
    printf("Total CPU Useage:\t %.2f \t\t %%\n", cpu);
    printf("Total Uptime:\t\t %.2f \t Sec\n", uptime);
    printf("\n");
    printf("IPv4 Address:\t\t %s \t %s \n", ip.addr.c_str(), ip.name.c_str());
    printf("Bytes: %s \t\t %lld \t %lld\n", bStruct.ifname.c_str(),
        bStruct.r_bytes, bStruct.t_bytes);
    printf("Packets: %s \t %lld \t %lld\n", bStruct.ifname.c_str(),
        bStruct.r_packets, bStruct.t_packets);
    std::this_thread::sleep_for(std::chrono::seconds(2));
	}
}

int main() {
	printf("\n");
  bool loop = true;
  if (loop)
    printer();
  NetworkMonitor networkMon = NetworkMonitor();
  SystemMonitor systemMon = SystemMonitor();


  NetworkMonitor::bandwidthStruct bStruct = networkMon.getBandwidth();
  NetworkMonitor::ipStruct ip = networkMon.getIPV4Addr();
  SystemMonitor::versionStruct vStruct = systemMon.getVersion();
  //SystemMonitor::loadStruct load = systemMon.getLoad();
  SystemMonitor::memoryStruct mem = systemMon.getMem();
  SystemMonitor::diskStruct disk = systemMon.getDiskIO();

  printf("%s %s %s \n", vStruct.os.c_str(),
      vStruct.version.c_str(),
      vStruct.release.c_str());
  printf("Free Mem Available:\t %lld \t Kib\n", mem.freeMem);
  printf("Virtual Mem Used:\t %lld \t Kib\n", mem.memUsed);
  printf("Total Virtual Mem:\t %lld \t Kib\n", mem.totalMem);
  printf("Total CPU Useage:\t %.2f \t\t %% \n", systemMon.getCpu());
  printf("Disk Sectors Read:\t %lu \t Kib\n", disk.read);
  printf("Disk Sectors Written:\t %lu \t Kib\n", disk.write);
  printf("Disk I/O in Progress:\t %lu \t\t %%\n", disk.ios_pgr);
  printf("Total Uptime:\t\t %.2f \t Sec\n", systemMon.getUptime());
  printf("\n");
  printf("IPv4 Address:\t\t %s \t %s \n", ip.addr.c_str(), ip.name.c_str());
  printf("interface Name \t\t Inbound \t Outbound\n");
  printf("Bytes: %s \t\t %lld \t %lld\n", bStruct.ifname.c_str(),
      bStruct.r_bytes, bStruct.t_bytes);
  printf("Packets: %s \t %lld \t %lld\n", bStruct.ifname.c_str(),
      bStruct.r_packets, bStruct.t_packets);
}

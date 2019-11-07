#include "../include/networkMon.h"

NetworkMonitor::NetworkMonitor() {};

NetworkMonitor::ipStruct NetworkMonitor::getIPV4Addr () {
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

NetworkMonitor::bandwidthStruct NetworkMonitor::getBandwidth() {
  FILE* file;
  bandwidthStruct bStruct;
  char buf[200], ifname[40];
  long long r_bytes, t_bytes, r_packets, t_packets;

  file = fopen("/proc/net/dev", "r");
  for (int i=0; i<2; i++) {
    fgets(buf, 200, file);
  }
  while (fgets(buf, 200, file)) {
    sscanf(buf, "%[^:]: %lld %lld %*d %*d %*d %*d %*d %*d %lld %lld",
        ifname, &r_bytes, &r_packets, &t_bytes, &t_packets);
  }
  fclose(file);
  bStruct.ifname = ifname;
  bStruct.r_bytes = r_bytes /1024;
  bStruct.r_packets = r_packets;
  bStruct.t_bytes = t_bytes /1024;
  bStruct.t_packets = t_packets;
  return bStruct;
}

#include "../include/networkMon.h"

NetworkMonitor::NetworkMonitor() {};

std::string NetworkMonitor::getIPV4Addr () {
  std::string cmd = "wget -qO - icanhazip.com 2>&1";
  std::string data;
  FILE* stream;
  const int max_buffer = 12;
  char buffer[max_buffer];
  stream = popen(cmd.c_str(), "r");
  if (stream) {
    while (!feof(stream))
      if (fgets(buffer, max_buffer, stream) != NULL)
        data.append(buffer);
      pclose(stream);
  }
  data.erase(std::remove(data.begin(), data.end(), '\n'), data.end());
  return data;
}

std::string NetworkMonitor::getHostName(){
  char hostname[HOST_NAME_MAX];
  gethostname(hostname, HOST_NAME_MAX);
  return hostname;
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

#include <string>
#include <ifaddrs.h>
#include <netinet/in.h>
#include <arpa/inet.h>

class NetworkMonitor {
  public:
    struct ipStruct {
      std::string addr;
      std::string name;
    };
    struct bandwidthStruct {
      std::string ifname;
      long long r_bytes;
      long long r_packets;
      long long t_bytes;
      long long t_packets;
    };
    NetworkMonitor();
    ipStruct getIPV4Addr();
    bandwidthStruct getBandwidth();
};

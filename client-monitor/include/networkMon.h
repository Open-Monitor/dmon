#include <string>
#include <unistd.h>
#include <limits.h>
#include <sys/types.h>
#include <algorithm>


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
    std::string getIPV4Addr();
    bandwidthStruct getBandwidth();
    std::string getHostName();
};

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
    NetworkMonitor();
    ipStruct getIPV4Addr();
};

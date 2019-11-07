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

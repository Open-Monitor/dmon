#include <sys/types.h>
#include <sys/sysinfo.h>
#include <string>
#include <stdio.h>


class SystemMonitor {
  struct sysinfo memInfo;
  public:
  struct memoryStruct {
      long long freeMem;
      long long memUsed;
      long long totalMem;
  };
  struct loadStruct {
    double loadAvg5;
    double loadAvg10;
    double loadAvg15;
  };
  struct versionStruct {
    std::string os;
    std::string version;
    std::string release;
  };
    SystemMonitor();
    memoryStruct getMem();
    double getCpu();
    loadStruct getLoad();
    double getUptime();
    versionStruct getVersion();
};

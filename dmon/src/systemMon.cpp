#include "../include/systemMon.h"

SystemMonitor::SystemMonitor() {}

SystemMonitor::memoryStruct SystemMonitor::getMem() {
  sysinfo (&memInfo);

  memoryStruct mem;

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

double SystemMonitor::getCpu(){
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

SystemMonitor::loadStruct SystemMonitor::getLoad() {
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

double SystemMonitor::getUptime() {
  FILE* file;
  double uptime;
  file = fopen("/proc/uptime", "r");
  fscanf(file, "%lf", &uptime);
  fclose(file);
  return uptime;
}
SystemMonitor::versionStruct SystemMonitor::getVersion() {
  FILE* file;
  versionStruct vStruct;
  char os[256], version[256], release[256];
  file = fopen("/proc/version_signature", "r");
  fscanf(file, "%s %s %s", os, version, release);
  fclose(file);
  vStruct.os = os;
  vStruct.version = version;
  vStruct.release = release;
  return vStruct;
}

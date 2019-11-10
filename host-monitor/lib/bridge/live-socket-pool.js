/**
 * ActiveStateManager
 */
class LiveSocketPool {
/**
 * constructor
 */
  constructor() {
    this.active = {};
  }

  /**
   * registers a active units
   * @param {any} socketInstance
   * @param {any} ips
   * @param {any} cb
   */
  register(socketInstance, ips, cb) {
    this.active[socketInstance] = {ips, cb};
    console.log(this.active[socketInstance]);
  }

  /**
   * writes to open socket
   * @param {*} ip
   * @param {*} request
   */
  async writeSocket(ip, request) {
    Object.values(this.active).forEach(({ips, cb}) => {
      if (ips.includes(ip)) {
        cb(request);
      }
    });
  }

  /**
   * unregisters an active unit
   * @param {*} socketInstance
   */
  unregister(socketInstance) {
    this.active[socketInstance] = undefined;
  }
}

export default new LiveSocketPool();

/**
 * ActiveStateManager
 */
class ActiveStateManager {
/**
 * constructor
 */
  constructor() {
    this.active = {};
  }

  /**
   * determines if dId is registed
   * @param {*} dId
   * @return {boolean}
   */
  isRegistered(dId) {
    return this.active[dId] !== undefined;
  }

  /**
   * registers a active units
   * @param {any} ips
   * @param {any} cb
   */
  register(ips, cb) {
    ips.forEach((ip) => {
      this.active[ip] = cb;
    });
  }

  /**
   * writes to open socket
   * @param {*} dId
   * @param {*} request
   */
  writeSocket(dId, request) {
    this.active[dId](request);
  }

  /**
   * unregisters an active unit
   * @param {*} dID
   */
  unregister(dID) {
    this.active[dID] = undefined;
  }
}

export default new ActiveStateManager();

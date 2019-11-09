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
   * registers an active unit
   * @param {any} dId
   * @param {any} cb
   */
  register(dId, cb) {
    this.active[dId] = cb;
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

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
   * @param {any} cb
   */
  register(socketInstance, cb) {
    this.active[socketInstance] = cb;
  }

  /**
   * writes to open socket
   * @param {*} request
   */
  async writeSocket(request) {
    Object.values(this.active).forEach((cb) => {
      if (typeof cb === 'function') {
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

import authDbConn from "./authDbConn.js";
import authLogger from '../authLogger.js';
import Users from './models/Users.js';

let authDbInstance;

class AuthDatabase {
  constructor() {
    if (authDbInstance) {
      throw new Error('Only one AuthDatabase can exist at a time!');
    }
    authDbInstance = this;
    this.authDbConn = authDbConn;
  }

  /**
   * Gets the connection status of the Database
   * @date 4/10/2024 - 2:10:30 PM
   *
   * @async
   * @returns {boolean} - If true then connected, if false then not connected
   */
  async getStatus() {
    try {
      await this.authDbConn.authenticate();
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Syncs the database
   * @date 4/10/2024 - 2:09:55 PM
   *
   * @async
   * @returns {*}
   */
  async sync() {
    await this.authDbConn.sync();
    authLogger.debug('Database synced');
  }

  /**
   * Get array of model names that the DB is currently aware of
   * @date 4/10/2024 - 2:11:55 PM
   *
   * @returns {Array}
   */
  getModels() {
    return Object.keys(this.authDbConn.models);
  }
}

export default AuthDatabase;

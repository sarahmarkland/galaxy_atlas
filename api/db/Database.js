import dbConn from "./dbConn.js";
import logger from "../logger.js";
import * as MODELS from './models/index.js';
// ^^^ Importing all models here makes sure dbConn can see and sync our models

let dbInstance;

/**
 * Manages the database connection
 * @date 4/9/2024 - 9:59:39 AM
 *
 * @class Database
 * @typedef {Database}
 */
class Database {

  /**
   * Creates an instance of Database.
   * @date 4/9/2024 - 9:59:34 AM
   *
   * @constructor
   */
  constructor() {
    this.dbConn = dbConn;
    // Singleton pattern to prevent multiple Database instances existing at the same time
    if (dbInstance) {
      throw new Error('Only one Database can exist at a time!');
    }
    dbInstance = this;
  }

  /**
   * Gets the connection status of the Database
   * @date 4/9/2024 - 9:55:09 AM
   *
   * @async
   * @returns {boolean} - If true then connected, if false then not connected
   */
  async getStatus() {
    try {
      await this.dbConn.authenticate();
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Syncs the database
   * @date 4/9/2024 - 9:56:57 AM
   *
   * @async
   */
  async sync() {
    await this.dbConn.sync();
    logger.debug('Database synced');
  }

  /**
   * Get array of model names that the DB is currently aware of
   * @date 4/9/2024 - 9:58:28 AM
   *
   * @returns {Array}
   */
  getModels() {
    return Object.keys(this.dbConn.models);
  }

  /**
   * Close the database connection
   *
   * @returns {*}
   */
  close() {
    return this.dbConn.close();
  }

}

export default Database;

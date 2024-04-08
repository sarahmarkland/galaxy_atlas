import dbConn from "./dbConn.js";
import * as MODELS from '../models/index.js';


class Database {
  constructor() {
    this.dbConn = dbConn;
  }

  async getStatus() {
    try {
      await this.dbConn.authenticate();
      return true;
    } catch (error) {
      return false;
    }
  }

  async sync() {
    console.log('db synced');
    await this.dbConn.sync();
  }

  getModels() {
    return this.dbConn.models;
  }

}

export default Database;
import dbConn from "./dbConn.js";
import * as MODELS from './models/index.js';
// ^^^ Importing all models here makes sure dbConn can see and sync our models


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
    return Object.keys(this.dbConn.models);
  }

}

export default Database;
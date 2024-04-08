import dbConn from "./dbConn.js";
import * as MODELS from './models/index.js';
// ^^^ Importing all models here makes sure dbConn can see and sync our models

let dbInstance;

class Database {
  constructor() {
    this.dbConn = dbConn;
    // Singleton pattern to prevent multiple Database instances existing at the same time
    if (dbInstance) {
      throw new Error('Only one Database can exist at a time!');
    }
    dbInstance = this;
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

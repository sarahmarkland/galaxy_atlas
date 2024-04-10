import { Sequelize } from "sequelize";
import { isAuthInDevMode } from "../authUtils.js";
import logger from  '../../logger.js';

const AUTH_DB_DEV = isAuthInDevMode();
const AUTH_DB_HOST = process.env.GALAXY_AUTH_DB_HOST || 'localhost';
const AUTH_DB_PORT = process.env.GALAXY_AUTH_DB_PORT || 3306;
const AUTH_DB_USER = process.env.GALAXY_AUTH_DB_USER || 'auth_user';
const AUTH_DB_PASS = process.env.GALAXY_AUTH_DB_PASS || null;

let dbOptions;

if (DB_DEV) {
  dbOptions = {
    dialect: 'sqlite',
    storage: 'galaxy_auth_db.sqlite3',
    logging: (msg) => logger.debug(msg)
  }
  logger.info('Server running in DEV mode');
} else {
  dbOptions = {
    dialect: 'postgres',
    host: AUTH_DB_HOST,
    port: AUTH_DB_PORT,
    username: AUTH_DB_USER,
    password: AUTH_DB_PASS
  }
  logger.info('ACHTUNG!!! Server is running in PRODUCTION mode');
}

const authDbConn = new Sequelize(dbOptions);
export default authDbConn;

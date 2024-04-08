import { Sequelize } from "sequelize";

const DB_DEV = (
  process.env.GALAXY_DEV === 'true'
  || process.env.GALAXY_DEV === 'True'
);
const DB_HOST = process.env.GALAXY_DB_HOST || 'localhost';
const DB_PORT = process.env.GALAXY_DB_PORT || 3306;
const DB_USER = process.env.GALAXY_DB_USER || 'space_user';
const DB_PASS = process.env.GALAXY_DB_PASS || null;

let dbOptions;

if (DB_DEV) {
  dbOptions = {
    dialect: 'sqlite',
    storage: 'galaxy_db.sqlite3'
  }
  console.log('Server running in DEV mode');
} else {
  dbOptions = {
    dialect: 'postgres',
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USER,
    password: DB_PASS
  }
  console.log('ACHTUNG!!! Server is running in PRODUCTION mode');
}

const dbConn = new Sequelize(dbOptions);
export default dbConn;

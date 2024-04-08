import { Model, DataTypes } from "sequelize";
import dbConn from "../db_conn.js";

class SolarSystem_Planets extends Model {}

SolarSystem_Planets.init({
  'system_id': DataTypes.INTEGER,
  'planet_id': DataTypes.INTEGER
}, {
  sequelize: dbConn
});

export default SolarSystem_Planets;

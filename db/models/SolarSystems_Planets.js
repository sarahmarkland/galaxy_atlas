import { Model, DataTypes } from "sequelize";
import dbConn from "../dbConn.js";

class SolarSystems_Planets extends Model {}

SolarSystems_Planets.init({
  'system_id': DataTypes.INTEGER,
  'planet_id': DataTypes.INTEGER
}, {
  sequelize: dbConn
});

export default SolarSystems_Planets;

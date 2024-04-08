import { Model, DataTypes } from "sequelize";
import dbConn from "../db_conn.js";

class SolarSystems extends Model {}

SolarSystems.init({
  'system_id': {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  'name': DataTypes.STRING,
  'planets': {
    type: DataTypes.INTEGER
  },
  'image': DataTypes.STRING
}, {
  sequelize: dbConn
});

export default SolarSystems;

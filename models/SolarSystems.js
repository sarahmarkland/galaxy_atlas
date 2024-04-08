import { Model, DataTypes } from "sequelize";
import dbConn from "../db/dbConn.js";

class SolarSystems extends Model {}

SolarSystems.init({
  'system_id': {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  'name': DataTypes.STRING,
  'image': DataTypes.STRING
}, {
  sequelize: dbConn
});

export default SolarSystems;

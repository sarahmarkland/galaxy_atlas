import { Model, DataTypes } from "sequelize";
import dbConn from "../dbConn.js";

class Fauna extends Model {}

Fauna.init({
  'fauna_id': {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  'name': DataTypes.STRING,
  'description': DataTypes.STRING,
  'environment': DataTypes.STRING,
  'diet': DataTypes.STRING,
  'behavior': DataTypes.STRING,
  'predators': DataTypes.STRING,
  'lifespan': DataTypes.STRING,
  'image': DataTypes.STRING
}, {
  sequelize: dbConn
});

export default Fauna;

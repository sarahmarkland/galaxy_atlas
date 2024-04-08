import { Model, DataTypes } from "sequelize";
import dbConn from "../db/dbConn.js";

class Planets_Fauna extends Model {}

Planets_Fauna.init({
  'planet_id': DataTypes.INTEGER,
  'fauna_id': DataTypes.INTEGER
}, {
  sequelize: dbConn
});

export default Planets_Fauna;

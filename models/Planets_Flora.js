import { Model, DataTypes } from "sequelize";
import dbConn from "../db/dbConn.js";

class Planets_Flora extends Model {}

Planets_Flora.init({
  'planet_id': DataTypes.INTEGER,
  'flora_id': DataTypes.INTEGER
}, {
  sequelize: dbConn
});

export default Planets_Flora;

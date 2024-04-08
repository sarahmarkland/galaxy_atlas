import { Model, DataTypes } from "sequelize";
import dbConn from "../dbConn.js";

class Planets extends Model {}

Planets.init({
  'planet_id': {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  'name': DataTypes.STRING,
  'description': DataTypes.STRING,
  'atmosphere': DataTypes.STRING,
  'average_temp': DataTypes.FLOAT,
  'mass': DataTypes.INTEGER,
  'moons': DataTypes.INTEGER,
  'distance_from_star': DataTypes.FLOAT,
  'image': DataTypes.STRING
}, {
  sequelize: dbConn
});

export default Planets;

import { Model, DataTypes } from "sequelize";
import dbConn from "../dbConn.js";

class Flora extends Model {}

Flora.init({
  'flora_id': {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  'name': DataTypes.STRING,
  'description': DataTypes.STRING,
  'image': DataTypes.STRING
}, {
  sequelize: dbConn
});

export default Flora;

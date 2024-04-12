import { Model, DataTypes } from 'sequelize';
import authDbConn from "../authDbConn.js";

class User extends Model {}

User.init({
  'username': {
    'type': DataTypes.STRING,
    'allowNull': false,
    'unique': true
  },
  'password': {
    'type': DataTypes.STRING,
    'allowNull': false
  }
}, {
  sequelize: authDbConn
});

export default User;

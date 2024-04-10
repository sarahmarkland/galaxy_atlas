import { Model, DataTypes } from 'sequelize';
import authDbConn from "../authDbConn.js";

class User extends Model {}

User.init({
  'username': DataTypes.STRING,
  'password': DataTypes.STRING
}, {
  sequelize: authDbConn
});

export default User;

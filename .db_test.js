import { Sequelize, Model, DataTypes } from "sequelize";

const dbConn = new Sequelize('sqlite::memory');
class User extends Model {}

User.init({
  'username': DataTypes.STRING,
  'birthday': DataTypes.DATE
},
{
  sequelize: dbConn
});

await dbConn.sync();

const jane = await User.create({
  'username': 'janedoe',
  'birthday': new Date(1980, 6, 10)
});

const users = await User.findAll();

console.log(users[0].dataValues);


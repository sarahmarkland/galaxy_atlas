import authLogger from "../authLogger.js";
import User from "../authDb/models/Users.js";
import bcrypt from 'bcrypt';
import { ifErrorCallNext } from "../authUtils.js";


/**
 * Registers a new user
 * @date 4/10/2024 - 4:55:08 PM
 *
 * @export
 * @async
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns {*}
 * 
 * @openapi
 * paths:
 *   /register:
 *     post:
 *       requestBody:
 *         description: Registers a new user
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                 password:
 *                   type: string
 * 
 *       responses:
 *         "200":
 *           description: User successfully registered
 *         "400":
 *           description: sequelize cannot work with provided object
 *         "500":
 *           description: any other serverside error
 */
export async function registerUser(req, res, next) {
  ifErrorCallNext(next, async () => {
    // Verify data is correct
    const reqFields = ['username', 'password'];
    const newUserData = req.body;
    for (const field of reqFields) {
      if (!Object.keys(newUserData).includes(field)) {
        throw new Error(
          "request must contain fields 'username' and 'password'",
          { 'cause': 'json validation' }
        );
      }
    }
  
    // bcrypt and send to db
    const newUserPass = await bcrypt.hash(newUserData.password, 10);
    const newUser = await User.create({
      'username': newUserData.username,
      'password': newUserPass
    });
    authLogger.debug(newUser.toJSON());
    res.status(200).send({
      'message': 'User created successfully!',
      'username': newUserData.username
    });
  });
}

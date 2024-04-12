import authLogger from "../authLogger.js";
import User from "../authDb/models/Users.js";
import bcrypt from 'bcrypt';
import { ifErrorCallNext } from "../authUtils.js";

/**
 * Checks if reqBody includes fields username and password
 * @date 4/11/2024 - 7:18:41 PM
 *
 * @param {*} reqBody
 */
function checkUserPassFields(reqBody) {
  for (const field of ['username', 'password']) {
    if (!Object.keys(reqBody).includes(field)) {
      throw new Error(
        "request must contain fields 'username' and 'password'",
        { 'cause': 'json validation' }
      );
    }
  }
}

/**
 * Registers a new user
 * @date 4/10/2024 - 4:55:08 PM
 *
 * @export
 * @async
 * @param {*} req
 * @param {*} res
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
async function bare_registerUser(req, res) {
  // Verify data is correct
  checkUserPassFields(req.body);
  const { username, password } = req.body;

  // bcrypt and send to db
  const encryptedPass = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    'username': username,
    'password': encryptedPass
  });
  authLogger.debug(newUser.toJSON());
  res.status(200).send({
    'message': 'User created successfully!',
    'username': username
  });
}

async function bare_loginUser(req, res) {
  
}

// Wrap function to allow for async error handling in express
const registerUser = ifErrorCallNext(bare_registerUser);
export default registerUser;

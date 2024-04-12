import authLogger from "../authLogger.js";
import User from "../authDb/models/Users.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import redisClient from "../redisClient.js";
import { ifErrorCallNext } from "../authUtils.js";
import { InvalidParamsError } from "../errors.js";


/**
 * Gets the username and password from a base64 encoded string
 * and ensures it is using basic authentication
 * @date 4/11/2024 - 7:18:41 PM
 *
 * @param {*} reqBody
 */
function getUserPassFields(authHeader) {
  const split_authHeader = authHeader.split(' ');
  if (split_authHeader[0] !== 'Basic') {
    throw new InvalidParamsError("Must use 'Basic' authentication");
  }
  const b64 = split_authHeader[1];
  return Buffer.from(b64, 'base64').toString().split(':');
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
 *     description: authenticate user via auth header
 *     post:
 *       paramterers:
 *         - in: header
 *           name: Authorization
 *           schema:
 *             type: string
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
  const [ username, password ] = getUserPassFields(req.headers.authorization);
  console.log(username, password);

  // bcrypt and send to db
  const encryptedPass = await bcrypt.hash(password, 10);
  console.log(username, password, encryptedPass);
  const newUser = await User.create({
    'username': username,
    'password': encryptedPass
  });
  authLogger.debug(newUser.toJSON());
  return res.status(200).send({
    'message': 'User created successfully!',
    'username': username
  });
}


/**
 * Log in the user
 * @date 4/11/2024 - 8:27:19 PM
 *
 * @async
 * @param {*} req
 * @param {*} res
 * @returns {unknown}
 * @openapi
 * paths:
 *   /register:
 *     post:
 *       summary: log in user and get session token
 *       parameters:
 *         - in: header
 *           name: Authorization
 *           schema:
 *             type: string
 * 
 *       responses:
 *         "200":
 *           description: User successfully registered
 *         "401":
 *           description: incorrect username or password
 *         "500":
 *           description: any other serverside error
 */
async function bare_loginUser(req, res) {
  const [ username, password ] = getUserPassFields(req.headers.authorization);

  const user = await User.findOne({ where: { username } });
  if (!user) {
    return res.status(401).send({
      'error': 'Incorrect username',
      'invalid': 'username'
    });
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return res.status(401).send({
      'error': 'Incorrect password',
      'invalid': 'password'
    });
  }

  const token = jwt.sign(
    { username: user.id },
    'secure key',  // TODO: add environment variable for secure key
    { expiresIn: '1h' }
  );

  redisClient.set(token, user.id, { EX: 60*60 });
  return res.status(200).send({ token });
}


/**
 * Log out
 * @date 4/12/2024 - 10:20:34 AM
 *
 * @async
 * @param {*} req
 * @param {*} res
 * @returns {unknown}
 */
async function bare_logoutUser(req, res) {
  const { token } = req.body;
  const userId = await redisClient.get(token);

  if (!userId) {
    return res.status(404).send({
      'error': 'no user session found'
    });
  }

  const redisResponse = await redisClient.del(token);
  return res.status(200).send({ 'message': 'User logged out', token });
}


/**
 * Check if user is authenticated
 * @date 4/12/2024 - 10:39:53 AM
 *
 * @async
 * @param {*} req
 * @param {*} res
 * @returns {unknown}
 */
async function bare_userAuthenticated(req, res) {
  const { token } = req.body;
  const userId = await redisClient.get(token);

  if (!userId) {
    return res.status(404).send({
      'error': 'no user session found'
    });
  }

  const redisResponse = await redisClient.get(token);
  return res.status(200).send({
    'message': 'User is session authenticated',
    token
  });
}

// Wrap function to allow for async error handling in express
export const registerUser = ifErrorCallNext(bare_registerUser);
export const loginUser = ifErrorCallNext(bare_loginUser);
export const logoutUser = ifErrorCallNext(bare_logoutUser);
export const userAuthenticated = ifErrorCallNext(bare_userAuthenticated);

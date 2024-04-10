import authLogger from "../authLogger.js";
import User from "../authDb/models/Users.js";
import bcrypt from 'bcrypt';


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
@openapi
paths:
  /register:
    post:
      requestBody:
        description: Registers a new user
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                username:
                  type: string
                password:
                  type: string

      responses:
        "200":
          description: User successfully registered
          content:
            application/json:
              schema:
                type: object
                properties:
                  message:
                    type: string
 */
export async function registerUser(req, res) {
  const newUserData = req.body;
  const newUserPass = await bcrypt.hash(newUserData.password, 10);
  const newUser = await User.create({
    'username': newUserData.username,
    'password': newUserPass
  });
  authLogger.debug(newUser.toJSON());
  res.status(200).send({ 'message': 'User created successfully!'});
}

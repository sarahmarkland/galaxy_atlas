import logger from "../logger.js";


/**
 * Calls next() and passes error if async function fn() errors
 * This is to make error handling with async functions a bit nicer
 * since express does not automatically catch error in async functions
 * See: https://expressjs.com/en/guide/error-handling.html
 * @date 4/10/2024 - 6:18:56 PM
 *
 * @export
 * @async
 * @param {*} next
 * @param {*} callback
 * @returns {*}
 */
function ifErrorCallNext(fn) {
  return async function(req, res, next) {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  }
}

async function isUserLoggedIn(token) {

}


/**
 * Register the user
 *
 * @async
 * @param {*} req
 * @param {*} res
 * @returns {*}
 */
async function bare_register(req, res) {
  if (req.method === 'POST') {
    const authHeader = req.headers['authorization'];
    const registerReq = await fetch(
      'http://localhost:3001/register',
      {
        method: 'POST',
        headers: {
          Authorization: authHeader
        }
      }
    );

    console.log(authHeader);
    if (registerReq.status !== 200) {
      if (registerReq.status === 409) {
        return res.status(registerReq.status)
          .send(await registerReq.json());
      }
      logger.debug(registerReq.body);
      return res.status(registerReq.status).send({
        'error': 'user could not be registered',
        'authError': await registerReq.json()
      });
    }
    return res.status(200).send({
      "TBI": "registered message will go here"
    })
  }
  // Send page
  return req.status(200).send({ "TBI": "Page will go here" });
}

export const register = ifErrorCallNext(bare_register);

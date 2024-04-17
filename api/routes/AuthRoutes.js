import logger from '../logger.js';

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
  return async function (req, res, next) {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}

async function registerUser(req, res) {
  const authHeader = req.headers.authorization;
  const registerRes = await fetch('http://localhost:3001/register', {
    method: 'POST',
    headers: {
      Authorization: authHeader,
    },
  });

  if (registerRes.status !== 200) {
    if (registerRes.status === 409) {
      return res.status(registerRes.status).send(await registerRes.json());
    }
    logger.debug(registerRes.body);
    return res.status(registerRes.status).send({
      error: 'user could not be registered',
      authError: await registerRes.json(),
    });
  }
  return res.status(200).send({
    TBI: 'registered message will go here',
  });
}

async function logInUser(req, res) {
  const authHeader = req.headers.authorization;
  const loginRes = await fetch('http://localhost:3001/login', {
    method: 'GET',
    headers: {
      Authorization: authHeader,
    },
  });
  if (loginRes.status !== 200) {
    if (loginRes.status === 401) {
      return res.status(loginRes.status).send({
        error: 'cannot log in',
        authError: await loginRes.json(),
      });
    }
    logger.error(await loginRes.json());
    return res.status(loginRes.status).send({
      error: 'User could not be logged in',
      authError: await loginRes.json(),
    });
  }
  res.set('set-cookie', loginRes.headers.get('set-cookie'));
  return res.status(200).send({
    'TBI': 'Logged in message will go here'
  });
}

async function logOutUser(req, res) {
  const sessionToken = req.cookies['X-Session-Token'];
  const logoutRes = await fetch(
    'http://localhost:3001/logout',
    {
      method: 'DELETE',
      headers: {
        'Cookie': `X-Session-Token=${sessionToken}`
      }
    }
  );
  
  if (logoutRes.status !== 200) {
    if (logoutRes.status === 401) {
      return res.status(logoutRes.status).send({
        'error': 'User not logged out',
        'authMessage': await logoutRes.json()
      });
    }
    logger.error(await logoutRes.json());
    return res.status(logoutRes.status).send({
      'error': 'User not logged out',
    });
  }
  return res.status(200).send({
    'TBI': 'Logged out message will go here'
  });
}

/**
 * Register the user
 *
 * @async
 * @param {*} req
 * @param {*} res
 * @returns {*}
 * @openapi
 * paths:
 *   /register:
 *     post:
 *       summary: Register new user
 *       parameters:
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
 *     get:
 *       summary: Register page
 *       responses:
 *         "200":
 *           description: Register page
 */
async function bare_register(req, res) {
  if (req.method === 'POST') {
    return await registerUser(req, res);
  }
  // Send page
  return req.status(200).send({ TBI: 'Page will go here' });
}

/**
 * Logs in the user
 *
 * @async
 * @param {*} req
 * @param {*} res
 * @returns {unknown}
 * @openapi
 * paths:
 *   /login:
 *     post:
 *       summary: Log in user and get session token
 *       parameters:
 *         - in: header
 *           name: Authorization
 *           schema:
 *             type: string
 * 
 *       responses:
 *         "200":
 *           description: User successfully logged in and new session token
 *         "401":
 *           description: incorrect username or password
 *         "500":
 *           description: any other serverside error
 *     get:
 *       summary: Login page
 *       responses:
 *         "200":
 *           description: Login page
 */
async function bare_login(req, res) {
  if (req.method === 'POST') {
    return await logInUser(req, res);
  }
  // Send page
  return res.status(200).send({
    TBI: 'Login message will go here',
  });
}

/**
 * Log out
 *
 * @async
 * @param {*} req
 * @param {*} res
 * @returns {unknown}
 * @openapi
 * paths:
 *   /logout:
 *     delete:
 *       summary: Logout user and remove session token
 *       parameters:
 *         - in: header
 *           name: X-Session-Token
 *           schema:
 *             type: string
 *       responses:
 *         "200":
 *           description: User successfully logged out
 *         "401":
 *           description: No user session found
 *         "500":
 *           description: Any other serverside error
 *     get:
 *       summary: Logout page
 *       responses:
 *         "200":
 *           description: Logout page
 */
async function bare_logout(req, res) {
  if (req.method === 'DELETE') {
    return await logOutUser(req, res);
  }
  // Send page
  return req.status(200).send({ 'TBI': 'Page will go here'});
}

export const register = ifErrorCallNext(bare_register);
export const login = ifErrorCallNext(bare_login);
export const logout = ifErrorCallNext(bare_logout);

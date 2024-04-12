export function isAuthInDevMode() {
  /**
   * Returns true if auth database is in dev mode
   * @date 4/10/2024 - 1:54:49 PM
   *
   * @type {boolean}
   */
  const AUTH_DB_DEV = process.env.GALAXY_AUTH_DEV || '';
  return AUTH_DB_DEV.toLowerCase() === 'true';
}

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
export function ifErrorCallNext(fn) {
  return async function(req, res, next) {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  }
}

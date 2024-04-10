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
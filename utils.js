export function isInDevMode() {
  /**
   * Returns true if database is in dev mode
   * @date 4/9/2024 - 12:07:54 PM
   *
   * @type {boolean}
   */
  const DB_DEV = process.env.GALAXY_DEV || '';
  return DB_DEV.toLowerCase() === 'true';
}
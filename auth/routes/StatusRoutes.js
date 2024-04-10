import authDb from '../authDb/index.js';

/**
* Gets the status of the database connection
* @date 4/9/2024 - 10:02:04 AM
*
* @openapi
* /status:
*   get:
*     description: Gets the status of the database connection
*     responses:
*       200:
*         description: Database is connected
*         content: application/json
*       503:
*         description: Database is not connected
*         content: application/json
*/
export async function getServerStatus(req, res) {
  if (await authDb.getStatus()) {
    res.status(200).send({ 'status': 'ok' });
  } else {
    res.status(503).send({ 'status': 'database authentication failed!' });
  }
}

/**
 * Gets the current models tracked by db
 * @date 4/9/2024 - 10:07:30 AM
 *
 * @openapi
 * /models:
 *   get:
 *     description: Gets the current models tracked by db
 *   responses:
 *     200:
 *       description: The current models tracked by db
 */
export async function getModels(req, res) {
  const models = authDb.getModels();
  res.status(200).send(models);
}

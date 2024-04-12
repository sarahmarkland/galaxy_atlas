import db from "../db/index.js";

class StatusRoutes {

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
  static async getServerStatus(req, res) {
    if (await db.getStatus()) {
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
  static async getModels(req, res) {
    const models = db.getModels();
    res.status(200).send(models);
  }

}

export default StatusRoutes;

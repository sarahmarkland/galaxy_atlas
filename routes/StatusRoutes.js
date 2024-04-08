import db from "../db/index.js";

class StatusRoutes {

  static async getServerStatus(req, res) {
    if (await db.getStatus()) {
      res.status(200).send({ 'status': 'ok' });
    } else {
      res.status(503).send({ 'status': 'database authentication failed!' });
    }
  }

  static async getModels(req, res) {
    const models = db.getModels();
    res.status(200).send(models);
  }

}

export default StatusRoutes;

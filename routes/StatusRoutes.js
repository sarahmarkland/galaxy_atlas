import db from "../db/index.js";

class StatusRoutes {

  static async getServerStatus(req, res) {
    if (db.getStatus()) {
      res.status(200).send({ 'status': 'ok' });
    } else {
      res.status(503).send({ 'status': 'database authentication failed!' });
    }
  }

  static async getModels(req, res) {
    const models = db.getModels();
    console.log(models);
    res.status(200).send(Object.keys(models));
  }

}

export default StatusRoutes;

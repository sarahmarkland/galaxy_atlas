import Express from "express";
import * as StatusRoutes from './routes/StatusRoutes.js';
import authLogger from "./authLogger.js";


const app = Express();
const PORT = process.env.GALAXY_AUTH_PORT || 3001;


app.use('/status', StatusRoutes.getServerStatus);
app.use('/models', StatusRoutes.getModels);

app.listen(PORT, (err) => {
  if(!err)
    authLogger.info("Server is Successfully Running, and App is listening on port "+ PORT);
  else
    authLogger.error("Error occurred, server can't start", err);
});

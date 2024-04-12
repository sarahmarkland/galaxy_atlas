import Express from "express";
import * as StatusRoutes from './routes/StatusRoutes.js';
import authLogger from "./authLogger.js";
import registerUser from "./routes/AuthRoutes.js";
import { isAuthInDevMode } from "./authUtils.js";


const app = Express();
app.use(Express.json());
const PORT = process.env.GALAXY_AUTH_PORT || 3001;

// Routes

// Status
app.use('/status', StatusRoutes.getServerStatus);
app.use('/models', StatusRoutes.getModels);

// Auth
app.post('/register', registerUser);

// Error-handling
app.use((err, req, res, next) => {
  if (err.cause === 'json validation') {
    res.status(400).send({ 'error': 'Object cannot be parsed', 'jsMessage': `${err}`});
  } else {
    authLogger.error(err);
    if (isAuthInDevMode()) {
      res.status(500).send({ 'error': err.message, 'jsMessage': `${err}` });
    } else {
      res.status(500).send ({ 'error': 'serverside error'});
    }
  }
});

app.listen(PORT, (err) => {
  if(!err)
    authLogger.info("Server is Successfully Running, and App is listening on port "+ PORT);
  else
    authLogger.error("Error occurred, server can't start", err);
});

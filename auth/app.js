import Express from "express";
import authLogger from "./authLogger.js";
import { isAuthInDevMode } from "./authUtils.js";
import { InvalidParamsError } from "./errors.js";
import * as StatusRoutes from './routes/StatusRoutes.js';
import * as AuthRoutes from "./routes/AuthRoutes.js";


const app = Express();
app.use(Express.json());
const PORT = process.env.GALAXY_AUTH_PORT || 3001;

// Routes

// Status
app.use('/status', StatusRoutes.getServerStatus);
app.use('/models', StatusRoutes.getModels);

// Auth
app.post('/register', AuthRoutes.registerUser);
app.post('/login', AuthRoutes.loginUser);
// app.post('/logout', AuthRoutes.logoutUser);

// Error-handling
app.use((err, req, res, next) => {
  if (err instanceof InvalidParamsError) {
    res.status(400).send({
      'error': 'Object cannot be parsed', 'jsMessage': `${err.message}`
    });
  } else {
    authLogger.error(err);
    if (isAuthInDevMode()) {
      res.status(500).send({ 'error': err.message, 'jsMessage': `${err}` });
    } else {
      res.status(500).send ({ 'error': 'serverside error' });
    }
  }
});

app.listen(PORT, (err) => {
  if(!err)
    authLogger.info("Server is Successfully Running, and App is listening on port "+ PORT);
  else
    authLogger.error("Error occurred, server can't start", err);
});

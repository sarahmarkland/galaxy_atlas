import Express from 'express';
import StatusRoutes from './routes/StatusRoutes.js';
import * as AuthRoutes from './routes/AuthRoutes.js';
import swaggerUI from 'swagger-ui-express';
import apiDoc from './apiDoc.js';
import logger from './logger.js';
import fs from 'fs';

const app = Express();
app.use(Express.static('./frontend/'));
const PORT = 3000;

// Routes -----------------------------------------------------------------------------------------------------------------------
app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/frontend/index.html')
});
// Docs
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(apiDoc));

// Status
app.get('/status', StatusRoutes.getServerStatus);
app.get('/models', StatusRoutes.getModels);

// Auth
app.use('/register', AuthRoutes.register);


// Error handling
app.use((err, req, res, next) => {
  logger.error(err);
});

app.listen(PORT, (error) =>{
  if(!error)
    logger.info("Server is Successfully Running, and App is listening on port "+ PORT);
  else
    logger.error("Error occurred, server can't start", error);
  }
);

// module.exports = logger;

import Express from 'express';
import StatusRoutes from './routes/StatusRoutes.js';
import swaggerUI from 'swagger-ui-express';
import apiDoc from './apiDoc.js';
import logger from './logger.js';


const app = Express();
const PORT = 3000;

// Routes -----------------------------------------------------------------------------------------------------------------------

// Docs
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(apiDoc));

// Status
app.get('/status', StatusRoutes.getServerStatus);
app.get('/models', StatusRoutes.getModels);

app.listen(PORT, (error) =>{
  if(!error)
    logger.info("Server is Successfully Running, and App is listening on port "+ PORT);
  else
    logger.error("Error occurred, server can't start", error);
  }
);

// module.exports = logger;

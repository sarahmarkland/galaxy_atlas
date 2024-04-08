import Express from 'express';
import { createLogger, format, transports } from 'winston';
import StatusRoutes from './routes/StatusRoutes.js';

const app = Express();
const PORT = 3000;

// Logger
const logger = createLogger({
  level: 'info', // Set the minimum log level (options: error, warn, info, http, verbose, debug, silly)
  format: format.combine(
    format.timestamp(), // Add timestamp to logs
    format.json() // JSON format for logs
  ),
  transports: [
    new transports.Console(), // Log to console
    new transports.File({ filename: 'logs/error.log', level: 'error' }), // Log errors to a file
    new transports.File({ filename: 'logs/combined.log' }) // Log all levels to another file
  ]
});

// Routes -----------------------------------------------------------------------------------------------------------------------

// Base HTML
app.get('/', (req, res) => {
  res.send('poob\n');
});

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

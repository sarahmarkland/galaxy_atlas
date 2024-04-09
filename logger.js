import { createLogger, format, transports } from 'winston';
import { isInDevMode } from './utils.js';

const DB_DEV = isInDevMode();

const logger = createLogger({
  level: 'debug', // Set the minimum log level (options: error, warn, info, http, verbose, debug, silly)
  format: format.combine(
    format.timestamp(), // Add timestamp to logs
    format.json() // JSON format for logs
  ),
  transports: [
    new transports.Console({ level: DB_DEV ? 'debug' : 'info' }), // Log to console
    new transports.File({ filename: 'logs/error.log', level: 'error' }), // Log errors to a file
    new transports.File({ filename: 'logs/info.log', level: 'info' }) // Log all levels to another file
  ]
});

export default logger;

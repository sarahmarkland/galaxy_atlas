import { createLogger, format, transports } from 'winston';
import { isInDevMode } from './utils.js';

const DB_DEV = isInDevMode();

const loggerTransports = [
  new transports.Console({ level: DB_DEV ? 'debug' : 'info' }), // Log to console
  new transports.File({ filename: 'logs/error.log', level: 'error' }), // Log errors to a file
  new transports.File({ filename: 'logs/info.log', level: 'info' }) // Log all levels to another file
];

if (DB_DEV) {
  loggerTransports.push(new transports.File({ filename: 'logs/debug.log', level: 'debug' })); // If db in dev mode log debug
}

const logger = createLogger({
  level: 'debug', // Set the minimum log level (options: error, warn, info, http, verbose, debug, silly)
  format: format.combine(
    format.timestamp(), // Add timestamp to logs
    format.json() // JSON format for logs
  ),
  transports: loggerTransports
});

export default logger;

import { createClient } from 'redis';
import authLogger from './authLogger.js';


const redisClient = await createClient()
  .on('error', (err) => authLogger.error('Redis client Error', err))
  .connect();

export default redisClient;

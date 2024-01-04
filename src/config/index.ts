import { config } from 'dotenv';

config({ path: '.env' });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const { NODE_ENV, PORT, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, MONGO_URI, LOG_FORMAT, LOG_DIR, HOST_NAME } =
  process.env;

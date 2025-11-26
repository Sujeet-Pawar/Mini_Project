import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const getEnv = (key, defaultValue) => {
  const value = process.env[key];
  if (value === undefined || value === null || value === '') {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

export const env = {
  NODE_ENV: getEnv('NODE_ENV', 'development'),
  PORT: Number(getEnv('PORT', 4000)),
  CLIENT_ORIGIN: getEnv('CLIENT_ORIGIN', 'http://localhost:5173'),
  MONGODB_URI: getEnv('MONGODB_URI'),
  SESSION_SECRET: getEnv('SESSION_SECRET'),
  SESSION_NAME: getEnv('SESSION_NAME', 'college.sid'),
  SESSION_DOMAIN: process.env.SESSION_DOMAIN || undefined,
  SESSION_SECURE: getEnv('SESSION_SECURE', 'false') === 'true',
  SESSION_MAX_AGE_DAYS: Number(getEnv('SESSION_MAX_AGE_DAYS', 7)),
  JWT_ACCESS_SECRET: getEnv('JWT_ACCESS_SECRET'),
  JWT_ACCESS_EXPIRES_IN: getEnv('JWT_ACCESS_EXPIRES_IN', '15m'),
  JWT_REFRESH_SECRET: getEnv('JWT_REFRESH_SECRET'),
  JWT_REFRESH_EXPIRES_IN: getEnv('JWT_REFRESH_EXPIRES_IN', '30d'),
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined,
  SMTP_SECURE: process.env.SMTP_SECURE === 'true',
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
  SMTP_FROM: process.env.SMTP_FROM,
  LOG_LEVEL: getEnv('LOG_LEVEL', 'info'),
  BUS_WEBHOOK_SECRET: process.env.BUS_WEBHOOK_SECRET
};

export default env;

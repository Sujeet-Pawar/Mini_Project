import winston from 'winston';
import env from './env.js';

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    return Object.assign({}, info, {
      message: info.message,
      stack: info.stack
    });
  }
  return info;
});

const logger = winston.createLogger({
  level: env.LOG_LEVEL,
  format: winston.format.combine(
    enumerateErrorFormat(),
    winston.format.timestamp(),
    winston.format.printf(({ level, message, timestamp, stack, ...meta }) => {
      const base = `${timestamp} [${level.toUpperCase()}]: ${message}`;
      const metaString = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
      const stackString = stack ? `\n${stack}` : '';
      return `${base}${metaString}${stackString}`;
    })
  ),
  transports: [new winston.transports.Console()]
});

export default logger;

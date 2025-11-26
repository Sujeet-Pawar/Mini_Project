import http from 'http';
import app from './app.js';
import { connectDatabase } from './config/database.js';
import logger from './config/logger.js';
import { env } from './config/env.js';

const server = http.createServer(app);

const startServer = async () => {
  try {
    await connectDatabase();
    server.listen(env.PORT, () => {
      logger.info(`🚀 Server listening on port ${env.PORT}`);
    });
  } catch (error) {
    logger.error('Failed to start server', { error });
    process.exit(1);
  }
};

startServer();

const gracefulShutdown = () => {
  logger.info('Received termination signal. Shutting down gracefully...');
  server.close(() => {
    logger.info('HTTP server closed');
    process.exit(0);
  });

  setTimeout(() => {
    logger.warn('Forcefully shutting down');
    process.exit(1);
  }, 10000);
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);

import mongoose from 'mongoose';
import env from './env.js';
import logger from './logger.js';

let isConnected = false;

export const connectDatabase = async () => {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(env.MONGODB_URI, {
      autoIndex: env.NODE_ENV !== 'production'
    });

    isConnected = true;
    logger.info('✅ MongoDB connected');

    mongoose.connection.on('disconnected', () => {
      isConnected = false;
      logger.warn('MongoDB disconnected');
    });

    mongoose.connection.on('error', (error) => {
      logger.error('MongoDB connection error', { error });
    });
  } catch (error) {
    logger.error('MongoDB connection failed', { error });
    throw error;
  }
};

export const disconnectDatabase = async () => {
  if (!isConnected) {
    return;
  }

  await mongoose.disconnect();
  isConnected = false;
};

export default connectDatabase;

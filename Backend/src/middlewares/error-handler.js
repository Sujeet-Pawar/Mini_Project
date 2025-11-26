import { isCelebrateError } from 'celebrate';
import logger from '../config/logger.js';

const errorHandler = (err, req, res, next) => {
  let statusCode = err.status || err.statusCode || 500;
  let message = err.message || 'Internal Server Error';
  let errors;

  if (isCelebrateError(err)) {
    statusCode = 400;
    message = 'Validation failed';
    errors = {};
    err.details.forEach((detail, key) => {
      errors[key] = detail.details.map((d) => d.message);
    });
  }

  if (statusCode >= 500) {
    logger.error('Unhandled error', { error: err, path: req.originalUrl, method: req.method });
  } else {
    logger.warn('Handled error', { error: err, path: req.originalUrl, method: req.method });
  }

  res.status(statusCode).json({
    status: 'error',
    message,
    errors
  });

  next();
};

export default errorHandler;

export const successResponse = (res, { statusCode = 200, message = 'Success', data = null } = {}) => {
  return res.status(statusCode).json({
    status: 'success',
    message,
    data
  });
};

export const errorResponse = (res, { statusCode = 500, message = 'Something went wrong', errors = undefined } = {}) => {
  return res.status(statusCode).json({
    status: 'error',
    message,
    errors
  });
};

export default {
  successResponse,
  errorResponse
};

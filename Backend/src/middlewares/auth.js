import createError from 'http-errors';
import { verifyAccessToken } from '../utils/token.js';
import User from '../modules/users/user.model.js';

export const ensureAuthenticated = async (req, _res, next) => {
  if (req.session?.user) {
    req.user = req.session.user;
    return next();
  }

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(createError(401, 'Authentication required'));
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const payload = verifyAccessToken(token);
    const user = await User.findById(payload.id);
    if (!user) {
      throw createError(401, 'User not found');
    }
    req.user = user.toSafeObject();
    return next();
  } catch (error) {
    return next(createError(401, 'Invalid or expired token'));
  }
};

export const requireRoles = (...roles) => (req, _res, next) => {
  const user = req.session?.user || req.user;
  if (!user) {
    return next(createError(401, 'Authentication required'));
  }

  if (!roles.includes(user.role)) {
    return next(createError(403, 'Insufficient permissions'));
  }

  req.user = user;
  return next();
};

export default { ensureAuthenticated, requireRoles };

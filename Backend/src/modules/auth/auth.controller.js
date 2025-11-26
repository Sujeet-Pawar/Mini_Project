import createError from 'http-errors';
import { successResponse } from '../../utils/api-response.js';
import { registerUser, authenticateUser, issueTokens, rotateRefreshToken, revokeRefreshToken } from './auth.service.js';
import User from '../users/user.model.js';

export const register = async (req, res, next) => {
  try {
    const { name, email, password, role, department, year, phone } = req.body;
    const user = await registerUser({ name, email, password, role, department, year, phone });
    successResponse(res, { statusCode: 201, message: 'User registered successfully', data: user.toSafeObject() });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;
    const user = await authenticateUser({ email, password, role });

    const tokens = await issueTokens(user, { userAgent: req.headers['user-agent'] });

    req.session.user = user.toSafeObject();

    successResponse(res, {
      message: 'Logged in successfully',
      data: {
        user: req.session.user,
        ...tokens
      }
    });
  } catch (error) {
    next(error);
  }
};

export const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      throw createError(400, 'Refresh token is required');
    }

    const tokens = await rotateRefreshToken(refreshToken);
    successResponse(res, {
      message: 'Token refreshed',
      data: tokens
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (refreshToken) {
      await revokeRefreshToken(refreshToken);
    }

    if (req.session) {
      req.session.destroy(() => {});
    }

    successResponse(res, { message: 'Logged out successfully' });
  } catch (error) {
    next(error);
  }
};

export const me = async (req, res, next) => {
  try {
    const sessionUser = req.session?.user;
    if (sessionUser) {
      return successResponse(res, { data: sessionUser });
    }

    const userId = req.user?.id;
    if (!userId) {
      throw createError(401, 'Authentication required');
    }

    const user = await User.findById(userId);
    if (!user) {
      throw createError(404, 'User not found');
    }

    successResponse(res, { data: user.toSafeObject() });
  } catch (error) {
    next(error);
  }
};

export default {
  register,
  login,
  refresh,
  logout,
  me
};

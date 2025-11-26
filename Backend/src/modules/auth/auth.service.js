import crypto from 'crypto';
import createError from 'http-errors';
import { hashPassword, comparePassword } from '../../utils/password.js';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../../utils/token.js';
import RefreshToken from './auth.model.js';
import User from '../users/user.model.js';

const buildAuthPayload = (user) => ({
  id: user._id,
  role: user.role,
  email: user.email,
  name: user.name
});

export const registerUser = async ({ name, email, password, role, department, year, phone }) => {
  const existing = await User.findOne({ email });
  if (existing) {
    throw createError(409, 'Email already in use');
  }

  const passwordHash = await hashPassword(password);

  const user = await User.create({
    name,
    email,
    passwordHash,
    role,
    department,
    year,
    phone
  });

  return user;
};

export const authenticateUser = async ({ email, password, role }) => {
  const user = await User.findOne({ email }).select('+passwordHash');
  if (!user) {
    throw createError(401, 'Invalid credentials');
  }

  const isMatch = await comparePassword(password, user.passwordHash);
  if (!isMatch) {
    throw createError(401, 'Invalid credentials');
  }

  if (role && user.role !== role) {
    throw createError(403, 'Role mismatch for this account');
  }

  return user;
};

export const issueTokens = async (user, { userAgent }) => {
  const payload = buildAuthPayload(user);
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken({ ...payload, tokenId: crypto.randomUUID() });

  const decodedRefresh = verifyRefreshToken(refreshToken);

  await RefreshToken.create({
    userId: user._id,
    token: decodedRefresh.tokenId,
    userAgent,
    expiresAt: new Date(decodedRefresh.exp * 1000)
  });

  return { accessToken, refreshToken };
};

export const rotateRefreshToken = async (refreshToken) => {
  let decoded;
  try {
    decoded = verifyRefreshToken(refreshToken);
  } catch (error) {
    throw createError(401, 'Invalid refresh token');
  }

  const tokenRecord = await RefreshToken.findOne({ token: decoded.tokenId });
  if (!tokenRecord) {
    throw createError(401, 'Refresh token revoked');
  }

  if (tokenRecord.expiresAt < new Date()) {
    await tokenRecord.deleteOne();
    throw createError(401, 'Refresh token expired');
  }

  const user = await User.findById(tokenRecord.userId);
  if (!user) {
    throw createError(401, 'User not found');
  }

  const payload = buildAuthPayload(user);
  const newAccessToken = generateAccessToken(payload);
  const newRefreshToken = generateRefreshToken({ ...payload, tokenId: crypto.randomUUID() });
  const newDecoded = verifyRefreshToken(newRefreshToken);

  tokenRecord.token = newDecoded.tokenId;
  tokenRecord.expiresAt = new Date(newDecoded.exp * 1000);
  await tokenRecord.save();

  return { accessToken: newAccessToken, refreshToken: newRefreshToken };
};

export const revokeRefreshToken = async (refreshToken) => {
  let decoded;
  try {
    decoded = verifyRefreshToken(refreshToken);
  } catch (error) {
    return;
  }

  await RefreshToken.deleteOne({ token: decoded.tokenId });
};

export default {
  registerUser,
  authenticateUser,
  issueTokens,
  rotateRefreshToken,
  revokeRefreshToken
};

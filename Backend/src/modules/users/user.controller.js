import asyncHandler from '../../utils/async-handler.js';
import { successResponse } from '../../utils/api-response.js';
import { listUsers, getUserById, updateUser, deleteUser } from './user.service.js';

export const getUsers = asyncHandler(async (req, res) => {
  const { role, search, page, limit } = req.query;
  const result = await listUsers({
    role,
    search,
    page: page ? Number(page) : undefined,
    limit: limit ? Number(limit) : undefined
  });

  successResponse(res, { data: result });
});

export const getUser = asyncHandler(async (req, res) => {
  const user = await getUserById(req.params.id);
  successResponse(res, { data: user });
});

export const patchUser = asyncHandler(async (req, res) => {
  const user = await updateUser(req.params.id, req.body);
  successResponse(res, { data: user, message: 'User updated' });
});

export const removeUser = asyncHandler(async (req, res) => {
  await deleteUser(req.params.id);
  successResponse(res, { message: 'User deleted' });
});

export default {
  getUsers,
  getUser,
  patchUser,
  removeUser
};

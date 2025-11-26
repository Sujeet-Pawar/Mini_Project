import createError from 'http-errors';
import User from './user.model.js';

export const listUsers = async ({ role, search, page = 1, limit = 20 }) => {
  const query = {};

  if (role) {
    query.role = role;
  }

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } }
    ];
  }

  const skip = (page - 1) * limit;

  const [items, total] = await Promise.all([
    User.find(query).skip(skip).limit(limit).sort({ createdAt: -1 }),
    User.countDocuments(query)
  ]);

  return {
    items: items.map((user) => user.toSafeObject()),
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit) || 1
    }
  };
};

export const getUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw createError(404, 'User not found');
  }
  return user.toSafeObject();
};

export const updateUser = async (id, payload) => {
  const allowedFields = ['name', 'department', 'year', 'phone', 'avatarUrl', 'metadata', 'role', 'isActive'];

  const update = {};
  allowedFields.forEach((field) => {
    if (payload[field] !== undefined) {
      update[field] = payload[field];
    }
  });

  const user = await User.findByIdAndUpdate(id, update, { new: true });
  if (!user) {
    throw createError(404, 'User not found');
  }

  return user.toSafeObject();
};

export const deleteUser = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw createError(404, 'User not found');
  }

  await user.deleteOne();
};

export default {
  listUsers,
  getUserById,
  updateUser,
  deleteUser
};

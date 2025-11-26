import createError from 'http-errors';
import Achievement from './achievement.model.js';

export const submitAchievement = async ({ owner, role, title, category, description, achievementDate, proofUrl, proofKey, metadata }) => {
  const achievement = await Achievement.create({
    owner,
    role,
    title,
    category,
    description,
    achievementDate,
    proofUrl,
    proofKey,
    metadata
  });

  return achievement;
};

export const listAchievements = async ({ status, role, owner }) => {
  const query = {};
  if (status) query.status = status;
  if (role) query.role = role;
  if (owner) query.owner = owner;

  const achievements = await Achievement.find(query)
    .populate('owner', 'name email role')
    .populate('reviewedBy', 'name email role')
    .sort({ createdAt: -1 });

  return achievements;
};

export const reviewAchievement = async ({ achievementId, status, reviewedBy, remarks }) => {
  const achievement = await Achievement.findById(achievementId);
  if (!achievement) {
    throw createError(404, 'Achievement not found');
  }

  achievement.status = status;
  achievement.reviewedBy = reviewedBy;
  achievement.reviewedAt = new Date();
  achievement.remarks = remarks;
  await achievement.save();

  return achievement;
};

export const deleteAchievement = async (achievementId) => {
  const achievement = await Achievement.findById(achievementId);
  if (!achievement) {
    throw createError(404, 'Achievement not found');
  }

  await achievement.deleteOne();
};

export default {
  submitAchievement,
  listAchievements,
  reviewAchievement,
  deleteAchievement
};

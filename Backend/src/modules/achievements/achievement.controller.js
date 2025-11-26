import asyncHandler from '../../utils/async-handler.js';
import { successResponse } from '../../utils/api-response.js';
import { submitAchievement, listAchievements, reviewAchievement, deleteAchievement } from './achievement.service.js';

export const postAchievement = asyncHandler(async (req, res) => {
  const achievement = await submitAchievement({
    ...req.body,
    owner: req.user.id,
    role: req.user.role
  });

  successResponse(res, { statusCode: 201, message: 'Achievement submitted', data: achievement });
});

export const getAchievements = asyncHandler(async (req, res) => {
  const { status, role, owner } = req.query;
  const achievements = await listAchievements({ status, role, owner });
  successResponse(res, { data: achievements });
});

export const patchAchievement = asyncHandler(async (req, res) => {
  const achievement = await reviewAchievement({
    achievementId: req.params.id,
    status: req.body.status,
    reviewedBy: req.user.id,
    remarks: req.body.remarks
  });

  successResponse(res, { data: achievement, message: 'Achievement review updated' });
});

export const removeAchievement = asyncHandler(async (req, res) => {
  await deleteAchievement(req.params.id);
  successResponse(res, { message: 'Achievement deleted' });
});

export default {
  postAchievement,
  getAchievements,
  patchAchievement,
  removeAchievement
};

import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { ensureAuthenticated, requireRoles } from '../../middlewares/auth.js';
import { postAchievement, getAchievements, patchAchievement, removeAchievement } from './achievement.controller.js';

const router = Router();

router.use(ensureAuthenticated);

router
  .route('/')
  .get(getAchievements)
  .post(
    requireRoles('Student', 'Faculty'),
    celebrate({
      [Segments.BODY]: Joi.object({
        title: Joi.string().required(),
        category: Joi.string().allow('', null),
        description: Joi.string().allow('', null),
        achievementDate: Joi.date().allow(null),
        proofUrl: Joi.string().uri().allow(null),
        proofKey: Joi.string().allow('', null),
        metadata: Joi.object().unknown(true)
      })
    }),
    postAchievement
  );

router.patch(
  '/:id',
  requireRoles('Admin'),
  celebrate({
    [Segments.BODY]: Joi.object({
      status: Joi.string().valid('Pending', 'Approved', 'Rejected').required(),
      remarks: Joi.string().allow('', null)
    })
  }),
  patchAchievement
);

router.delete('/:id', requireRoles('Admin'), removeAchievement);

export default router;

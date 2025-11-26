import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { ensureAuthenticated, requireRoles } from '../../middlewares/auth.js';
import { getUsers, getUser, patchUser, removeUser } from './user.controller.js';

const router = Router();

router.use(ensureAuthenticated, requireRoles('Admin'));

router.get(
  '/',
  celebrate({
    [Segments.QUERY]: Joi.object({
      role: Joi.string().valid('Student', 'Faculty', 'Admin'),
      search: Joi.string(),
      page: Joi.number().integer().min(1),
      limit: Joi.number().integer().min(1).max(100)
    })
  }),
  getUsers
);

router.get('/:id', getUser);

router.patch(
  '/:id',
  celebrate({
    [Segments.BODY]: Joi.object({
      name: Joi.string(),
      department: Joi.string().allow('', null),
      year: Joi.number().integer().min(1).max(6).allow(null),
      phone: Joi.string().allow('', null),
      avatarUrl: Joi.string().uri().allow('', null),
      metadata: Joi.object().unknown(true),
      role: Joi.string().valid('Student', 'Faculty', 'Admin'),
      isActive: Joi.boolean()
    })
  }),
  patchUser
);

router.delete('/:id', removeUser);

export default router;

import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { register, login, refresh, logout, me } from './auth.controller.js';
import { ensureAuthenticated } from '../../middlewares/auth.js';

const router = Router();

router.post(
  '/register',
  celebrate({
    [Segments.BODY]: Joi.object({
      name: Joi.string().min(3).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
      role: Joi.string().valid('Student', 'Faculty', 'Admin').default('Student'),
      department: Joi.string().allow('', null),
      year: Joi.number().integer().min(1).max(6).allow(null),
      phone: Joi.string().allow('', null)
    })
  }),
  register
);

router.post(
  '/login',
  celebrate({
    [Segments.BODY]: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      role: Joi.string().valid('Student', 'Faculty', 'Admin')
    })
  }),
  login
);

router.post(
  '/refresh',
  celebrate({
    [Segments.BODY]: Joi.object({
      refreshToken: Joi.string().required()
    })
  }),
  refresh
);

router.post(
  '/logout',
  celebrate({
    [Segments.BODY]: Joi.object({
      refreshToken: Joi.string().optional()
    })
  }),
  logout
);

router.get('/me', ensureAuthenticated, me);

export default router;

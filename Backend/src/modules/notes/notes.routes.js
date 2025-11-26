import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { ensureAuthenticated, requireRoles } from '../../middlewares/auth.js';
import { postNote, getNotes, getNote, patchNote, removeNote } from './notes.controller.js';

const router = Router();

router.use(ensureAuthenticated);

router
  .route('/')
  .get(getNotes)
  .post(
    requireRoles('Faculty', 'Admin'),
    celebrate({
      [Segments.BODY]: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().allow('', null),
        tags: Joi.array().items(Joi.string()).default([]),
        fileUrl: Joi.string().uri().allow(null),
        fileKey: Joi.string().allow(null),
        visibility: Joi.string().valid('Public', 'Students', 'Faculty', 'Admins', 'Custom').default('Students'),
        allowedRoles: Joi.array().items(Joi.string().valid('Student', 'Faculty', 'Admin')).default([]),
        allowedClassIds: Joi.array().items(Joi.string()).default([]),
        metadata: Joi.object().unknown(true)
      })
    }),
    postNote
  );

router
  .route('/:id')
  .get(getNote)
  .patch(
    requireRoles('Faculty', 'Admin'),
    celebrate({
      [Segments.BODY]: Joi.object({
        title: Joi.string(),
        description: Joi.string().allow('', null),
        tags: Joi.array().items(Joi.string()),
        fileUrl: Joi.string().uri().allow(null),
        fileKey: Joi.string().allow(null),
        visibility: Joi.string().valid('Public', 'Students', 'Faculty', 'Admins', 'Custom'),
        allowedRoles: Joi.array().items(Joi.string().valid('Student', 'Faculty', 'Admin')),
        allowedClassIds: Joi.array().items(Joi.string()),
        metadata: Joi.object().unknown(true)
      })
    }),
    patchNote
  )
  .delete(requireRoles('Admin'), removeNote);

export default router;

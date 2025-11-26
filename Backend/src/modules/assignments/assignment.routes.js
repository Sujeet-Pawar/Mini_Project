import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { ensureAuthenticated, requireRoles } from '../../middlewares/auth.js';
import {
  postAssignment,
  getAssignments,
  getAssignment,
  patchAssignment,
  removeAssignment,
  postSubmission,
  getAssignmentSubmissions,
  postGradeSubmission,
  deleteSubmissionController
} from './assignment.controller.js';

const router = Router();

router.use(ensureAuthenticated);

router
  .route('/')
  .get(getAssignments)
  .post(
    requireRoles('Faculty', 'Admin'),
    celebrate({
      [Segments.BODY]: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().allow('', null),
        instructions: Joi.string().allow('', null),
        dueDate: Joi.date().required(),
        classIds: Joi.array().items(Joi.string()).default([]),
        attachments: Joi.array()
          .items(
            Joi.object({
              filename: Joi.string().required(),
              url: Joi.string().uri().required(),
              size: Joi.number().integer().min(0),
              mimeType: Joi.string()
            })
          )
          .default([]),
        metadata: Joi.object().unknown(true)
      })
    }),
    postAssignment
  );

router
  .route('/:id')
  .get(getAssignment)
  .patch(
    requireRoles('Faculty', 'Admin'),
    celebrate({
      [Segments.BODY]: Joi.object({
        title: Joi.string(),
        description: Joi.string().allow('', null),
        instructions: Joi.string().allow('', null),
        dueDate: Joi.date(),
        classIds: Joi.array().items(Joi.string()),
        attachments: Joi.array().items(
          Joi.object({
            filename: Joi.string().required(),
            url: Joi.string().uri().required(),
            size: Joi.number().integer().min(0),
            mimeType: Joi.string()
          })
        ),
        metadata: Joi.object().unknown(true)
      })
    }),
    patchAssignment
  )
  .delete(requireRoles('Admin'), removeAssignment);

router.post(
  '/:id/submissions',
  requireRoles('Student'),
  celebrate({
    [Segments.BODY]: Joi.object({
      files: Joi.array().items(
        Joi.object({
          filename: Joi.string().required(),
          url: Joi.string().uri().required(),
          size: Joi.number().integer().min(0),
          mimeType: Joi.string()
        })
      ),
      metadata: Joi.object().unknown(true)
    })
  }),
  postSubmission
);

router.get('/:id/submissions', requireRoles('Faculty', 'Admin'), getAssignmentSubmissions);

router.post(
  '/:id/submissions/:submissionId/grade',
  requireRoles('Faculty', 'Admin'),
  celebrate({
    [Segments.BODY]: Joi.object({
      score: Joi.number().required(),
      remarks: Joi.string().allow('', null)
    })
  }),
  postGradeSubmission
);

router.delete('/:id/submissions/:submissionId', requireRoles('Admin'), deleteSubmissionController);

export default router;

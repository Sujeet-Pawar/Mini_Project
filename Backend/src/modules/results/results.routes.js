import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { ensureAuthenticated, requireRoles } from '../../middlewares/auth.js';
import { postResult, getStudentResults, getAllResults, getResult, removeResult } from './result.controller.js';

const router = Router();

router.use(ensureAuthenticated);

router.post(
  '/',
  requireRoles('Admin'),
  celebrate({
    [Segments.BODY]: Joi.object({
      student: Joi.string().required(),
      examName: Joi.string().required(),
      term: Joi.string().allow('', null),
      academicYear: Joi.string().allow('', null),
      scores: Joi.array()
        .items(
          Joi.object({
            subject: Joi.string().required(),
            code: Joi.string().allow('', null),
            marksObtained: Joi.number().required(),
            maxMarks: Joi.number().required(),
            grade: Joi.string().allow('', null),
            credits: Joi.number().allow(null)
          })
        )
        .default([]),
      totalMarks: Joi.number().allow(null),
      percentage: Joi.number().allow(null),
      cgpa: Joi.number().allow(null),
      remarks: Joi.string().allow('', null),
      metadata: Joi.object().unknown(true)
    })
  }),
  postResult
);

router.get('/student', requireRoles('Student', 'Faculty', 'Admin'), getStudentResults);

router.get(
  '/',
  requireRoles('Faculty', 'Admin'),
  celebrate({
    [Segments.QUERY]: Joi.object({
      search: Joi.string(),
      examName: Joi.string(),
      term: Joi.string()
    })
  }),
  getAllResults
);

router.get('/:id', requireRoles('Faculty', 'Admin'), getResult);
router.delete('/:id', requireRoles('Admin'), removeResult);

export default router;

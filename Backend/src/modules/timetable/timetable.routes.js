import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { ensureAuthenticated, requireRoles } from '../../middlewares/auth.js';
import { getDailyTimetable, putDailyTimetable, getWeeklyTimetableController, getClassList } from './timetable.controller.js';

const router = Router();

router.use(ensureAuthenticated);

router.get(
  '/classes',
  requireRoles('Faculty', 'Admin'),
  getClassList
);

router.get(
  '/:classId/daily',
  celebrate({
    [Segments.QUERY]: Joi.object({
      day: Joi.number().integer().min(0).max(6).required()
    })
  }),
  getDailyTimetable
);

router.put(
  '/:classId/daily',
  requireRoles('Faculty', 'Admin'),
  celebrate({
    [Segments.QUERY]: Joi.object({
      day: Joi.number().integer().min(0).max(6).required()
    }),
    [Segments.BODY]: Joi.object({
      slots: Joi.array()
        .items(
          Joi.object({
            startTime: Joi.string().required(),
            endTime: Joi.string().required(),
            subject: Joi.string().required(),
            teacher: Joi.string().allow('', null),
            room: Joi.string().allow('', null),
            isBreak: Joi.boolean().default(false)
          })
        )
        .required(),
      metadata: Joi.object().unknown(true),
      department: Joi.string().allow('', null),
      year: Joi.number().integer().min(1).max(6).allow(null)
    })
  }),
  putDailyTimetable
);

router.get('/:classId/weekly', getWeeklyTimetableController);

export default router;

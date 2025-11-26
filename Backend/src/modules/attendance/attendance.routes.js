import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { ensureAuthenticated, requireRoles } from '../../middlewares/auth.js';
import {
  postAttendance,
  getClassAttendance,
  getStudentAttendance,
  getClassSummary,
  removeAttendance
} from './attendance.controller.js';

const router = Router();

router.use(ensureAuthenticated);

router.post(
  '/classes/:classId',
  requireRoles('Faculty', 'Admin'),
  celebrate({
    [Segments.BODY]: Joi.object({
      date: Joi.date().required(),
      slot: Joi.object({
        startTime: Joi.string().required(),
        endTime: Joi.string().required(),
        subject: Joi.string().required(),
        teacher: Joi.string().allow('', null),
        room: Joi.string().allow('', null)
      }).required(),
      entries: Joi.array()
        .items(
          Joi.object({
            student: Joi.string().required(),
            status: Joi.string().valid('Present', 'Absent', 'Late', 'Excused').required(),
            remarks: Joi.string().allow('', null)
          })
        )
        .required(),
      timetableId: Joi.string().allow(null),
      metadata: Joi.object().unknown(true)
    })
  }),
  postAttendance
);

router.get(
  '/classes/:classId',
  requireRoles('Faculty', 'Admin'),
  celebrate({
    [Segments.QUERY]: Joi.object({
      startDate: Joi.date(),
      endDate: Joi.date()
    })
  }),
  getClassAttendance
);

router.get(
  '/classes/:classId/summary',
  requireRoles('Faculty', 'Admin'),
  celebrate({
    [Segments.QUERY]: Joi.object({
      startDate: Joi.date(),
      endDate: Joi.date()
    })
  }),
  getClassSummary
);

router.get(
  '/students/:studentId',
  celebrate({
    [Segments.QUERY]: Joi.object({
      startDate: Joi.date(),
      endDate: Joi.date()
    })
  }),
  getStudentAttendance
);

router.delete('/:id', requireRoles('Admin'), removeAttendance);

export default router;

import { Router } from 'express';
import authRoutes from '../modules/auth/auth.routes.js';
import userRoutes from '../modules/users/user.routes.js';
import timetableRoutes from '../modules/timetable/timetable.routes.js';
import attendanceRoutes from '../modules/attendance/attendance.routes.js';
import notesRoutes from '../modules/notes/notes.routes.js';
import assignmentsRoutes from '../modules/assignments/assignments.routes.js';
import resultsRoutes from '../modules/results/results.routes.js';
import achievementsRoutes from '../modules/achievements/achievements.routes.js';
import busRoutes from '../modules/bus/bus.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/timetable', timetableRoutes);
router.use('/attendance', attendanceRoutes);
router.use('/notes', notesRoutes);
router.use('/assignments', assignmentsRoutes);
router.use('/results', resultsRoutes);
router.use('/achievements', achievementsRoutes);
router.use('/bus', busRoutes);

export default router;

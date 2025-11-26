import asyncHandler from '../../utils/async-handler.js';
import { successResponse } from '../../utils/api-response.js';
import { getTimetableByClassAndDay, upsertTimetableSlots, getWeeklyTimetable, listClasses } from './timetable.service.js';

export const getDailyTimetable = asyncHandler(async (req, res) => {
  const { classId } = req.params;
  const { day } = req.query;
  const timetable = await getTimetableByClassAndDay({ classId, dayOfWeek: Number(day) });
  successResponse(res, { data: timetable });
});

export const putDailyTimetable = asyncHandler(async (req, res) => {
  const { classId } = req.params;
  const { day } = req.query;
  const { slots, metadata, department, year } = req.body;
  const timetable = await upsertTimetableSlots({
    classId,
    dayOfWeek: Number(day),
    slots,
    metadata,
    department,
    year
  });

  successResponse(res, { data: timetable, message: 'Timetable updated' });
});

export const getWeeklyTimetableController = asyncHandler(async (req, res) => {
  const { classId } = req.params;
  const timetables = await getWeeklyTimetable({ classId });
  successResponse(res, { data: timetables });
});

export const getClassList = asyncHandler(async (_req, res) => {
  const classes = await listClasses();
  successResponse(res, { data: classes });
});

export default {
  getDailyTimetable,
  putDailyTimetable,
  getWeeklyTimetableController,
  getClassList
};

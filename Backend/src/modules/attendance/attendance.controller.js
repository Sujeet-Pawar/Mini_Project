import asyncHandler from '../../utils/async-handler.js';
import { successResponse } from '../../utils/api-response.js';
import {
  recordAttendance,
  getAttendanceForClass,
  getAttendanceForStudent,
  getAttendanceSummary,
  deleteAttendanceRecord
} from './attendance.service.js';

export const postAttendance = asyncHandler(async (req, res) => {
  const { classId } = req.params;
  const { date, slot, entries, timetableId, metadata } = req.body;
  const record = await recordAttendance({
    classId,
    date,
    slot,
    entries,
    markedBy: req.session?.user?.id || req.user?.id,
    timetableId,
    metadata
  });

  successResponse(res, { data: record, statusCode: 201, message: 'Attendance recorded' });
});

export const getClassAttendance = asyncHandler(async (req, res) => {
  const { classId } = req.params;
  const { startDate, endDate } = req.query;
  const records = await getAttendanceForClass({ classId, startDate, endDate });
  successResponse(res, { data: records });
});

export const getStudentAttendance = asyncHandler(async (req, res) => {
  const { studentId } = req.params;
  const { startDate, endDate } = req.query;
  const records = await getAttendanceForStudent({ studentId, startDate, endDate });
  successResponse(res, { data: records });
});

export const getClassSummary = asyncHandler(async (req, res) => {
  const { classId } = req.params;
  const { startDate, endDate } = req.query;
  const summary = await getAttendanceSummary({ classId, startDate, endDate });
  successResponse(res, { data: summary });
});

export const removeAttendance = asyncHandler(async (req, res) => {
  await deleteAttendanceRecord(req.params.id);
  successResponse(res, { message: 'Attendance record removed' });
});

export default {
  postAttendance,
  getClassAttendance,
  getStudentAttendance,
  getClassSummary,
  removeAttendance
};

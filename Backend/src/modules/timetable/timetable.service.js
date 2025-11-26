import createError from 'http-errors';
import Timetable from './timetable.model.js';

export const getTimetableByClassAndDay = async ({ classId, dayOfWeek }) => {
  const timetable = await Timetable.findOne({ classId, dayOfWeek });
  if (!timetable) {
    throw createError(404, 'Timetable not found for the specified day');
  }
  return timetable;
};

export const upsertTimetableSlots = async ({ classId, dayOfWeek, slots, metadata, department, year }) => {
  const timetable = await Timetable.findOneAndUpdate(
    { classId, dayOfWeek },
    {
      $set: {
        slots,
        metadata: metadata || {},
        department,
        year
      }
    },
    { new: true, upsert: true }
  );

  return timetable;
};

export const getWeeklyTimetable = async ({ classId }) => {
  const timetables = await Timetable.find({ classId }).sort({ dayOfWeek: 1 });
  return timetables;
};

export const listClasses = async () => {
  const classes = await Timetable.aggregate([
    {
      $group: {
        _id: '$classId',
        department: { $first: '$department' },
        year: { $first: '$year' }
      }
    },
    {
      $project: {
        _id: 0,
        classId: '$_id',
        department: 1,
        year: 1
      }
    },
    { $sort: { classId: 1 } }
  ]);

  return classes;
};

export default {
  getTimetableByClassAndDay,
  upsertTimetableSlots,
  getWeeklyTimetable,
  listClasses
};

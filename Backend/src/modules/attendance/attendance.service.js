import createError from 'http-errors';
import AttendanceRecord from './attendance.model.js';

export const recordAttendance = async ({
  classId,
  date,
  slot,
  entries,
  markedBy,
  timetableId,
  metadata
}) => {
  const attendanceDate = new Date(date);
  const existing = await AttendanceRecord.findOne({ classId, date: attendanceDate, 'slot.subject': slot.subject });

  if (existing) {
    existing.entries = entries;
    existing.slot = slot;
    existing.metadata = metadata;
    existing.markedBy = markedBy;
    existing.timetableId = timetableId;
    await existing.save();
    return existing;
  }

  const record = await AttendanceRecord.create({
    classId,
    date: attendanceDate,
    slot,
    entries,
    markedBy,
    timetableId,
    metadata
  });

  return record;
};

export const getAttendanceForClass = async ({ classId, startDate, endDate }) => {
  const query = { classId };

  if (startDate || endDate) {
    query.date = {};
    if (startDate) query.date.$gte = new Date(startDate);
    if (endDate) query.date.$lte = new Date(endDate);
  }

  const records = await AttendanceRecord.find(query)
    .populate('entries.student', 'name email role')
    .populate('markedBy', 'name email role')
    .sort({ date: -1 });

  return records;
};

export const getAttendanceForStudent = async ({ studentId, startDate, endDate }) => {
  const query = { 'entries.student': studentId };
  if (startDate || endDate) {
    query.date = {};
    if (startDate) query.date.$gte = new Date(startDate);
    if (endDate) query.date.$lte = new Date(endDate);
  }

  const records = await AttendanceRecord.find(query)
    .select({ entries: 1, slot: 1, classId: 1, date: 1 })
    .sort({ date: -1 });

  return records.map((record) => {
    const entry = record.entries.find((e) => e.student.toString() === studentId.toString());
    return {
      id: record._id,
      classId: record.classId,
      date: record.date,
      slot: record.slot,
      status: entry?.status || 'Absent',
      remarks: entry?.remarks
    };
  });
};

export const getAttendanceSummary = async ({ classId, startDate, endDate }) => {
  const pipeline = [
    { $match: { classId } },
    {
      $addFields: {
        date: { $toDate: '$date' }
      }
    }
  ];

  if (startDate || endDate) {
    const match = {};
    if (startDate) match.$gte = new Date(startDate);
    if (endDate) match.$lte = new Date(endDate);
    pipeline.push({ $match: { date: match } });
  }

  pipeline.push(
    { $unwind: '$entries' },
    {
      $group: {
        _id: '$entries.student',
        present: {
          $sum: {
            $cond: [{ $eq: ['$entries.status', 'Present'] }, 1, 0]
          }
        },
        absent: {
          $sum: {
            $cond: [{ $eq: ['$entries.status', 'Absent'] }, 1, 0]
          }
        },
        late: {
          $sum: {
            $cond: [{ $eq: ['$entries.status', 'Late'] }, 1, 0]
          }
        },
        excused: {
          $sum: {
            $cond: [{ $eq: ['$entries.status', 'Excused'] }, 1, 0]
          }
        },
        total: { $sum: 1 }
      }
    }
  );

  const summary = await AttendanceRecord.aggregate(pipeline);
  return summary;
};

export const deleteAttendanceRecord = async (id) => {
  const record = await AttendanceRecord.findById(id);
  if (!record) {
    throw createError(404, 'Attendance record not found');
  }

  await record.deleteOne();
};

export default {
  recordAttendance,
  getAttendanceForClass,
  getAttendanceForStudent,
  getAttendanceSummary,
  deleteAttendanceRecord
};

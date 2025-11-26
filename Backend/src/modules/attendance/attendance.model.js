import mongoose from 'mongoose';

const AttendanceEntrySchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    status: {
      type: String,
      enum: ['Present', 'Absent', 'Late', 'Excused'],
      default: 'Present'
    },
    remarks: {
      type: String
    }
  },
  { _id: false }
);

const AttendanceRecordSchema = new mongoose.Schema(
  {
    classId: {
      type: String,
      required: true,
      index: true
    },
    timetableId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Timetable'
    },
    date: {
      type: Date,
      required: true
    },
    slot: {
      startTime: String,
      endTime: String,
      subject: String,
      teacher: String,
      room: String
    },
    markedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    entries: {
      type: [AttendanceEntrySchema],
      default: []
    },
    metadata: {
      type: Map,
      of: mongoose.Schema.Types.Mixed
    }
  },
  { timestamps: true }
);

AttendanceRecordSchema.index({ classId: 1, date: 1, 'slot.subject': 1 });
AttendanceRecordSchema.index({ 'entries.student': 1, date: 1 });

const AttendanceRecord = mongoose.model('AttendanceRecord', AttendanceRecordSchema);

export default AttendanceRecord;

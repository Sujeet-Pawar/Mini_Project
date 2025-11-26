import mongoose from 'mongoose';

const TimetableSlotSchema = new mongoose.Schema(
  {
    startTime: {
      type: String,
      required: true
    },
    endTime: {
      type: String,
      required: true
    },
    subject: {
      type: String,
      required: true
    },
    teacher: {
      type: String
    },
    room: {
      type: String
    },
    isBreak: {
      type: Boolean,
      default: false
    }
  },
  { _id: false }
);

const TimetableSchema = new mongoose.Schema(
  {
    classId: {
      type: String,
      required: true,
      index: true
    },
    department: {
      type: String
    },
    year: {
      type: Number
    },
    dayOfWeek: {
      type: Number,
      min: 0,
      max: 6,
      required: true
    },
    slots: {
      type: [TimetableSlotSchema],
      default: []
    },
    metadata: {
      type: Map,
      of: mongoose.Schema.Types.Mixed
    }
  },
  { timestamps: true }
);

TimetableSchema.index({ classId: 1, dayOfWeek: 1 }, { unique: true });

const Timetable = mongoose.model('Timetable', TimetableSchema);

export default Timetable;

import mongoose from 'mongoose';

const SubjectScoreSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true
    },
    code: {
      type: String
    },
    marksObtained: {
      type: Number,
      required: true
    },
    maxMarks: {
      type: Number,
      required: true
    },
    grade: {
      type: String
    },
    credits: {
      type: Number
    }
  },
  { _id: false }
);

const ResultSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    examName: {
      type: String,
      required: true
    },
    term: {
      type: String
    },
    academicYear: {
      type: String
    },
    scores: {
      type: [SubjectScoreSchema],
      default: []
    },
    totalMarks: {
      type: Number
    },
    percentage: {
      type: Number
    },
    cgpa: {
      type: Number
    },
    remarks: {
      type: String
    },
    published: {
      type: Boolean,
      default: false
    },
    publishedAt: {
      type: Date
    },
    metadata: {
      type: Map,
      of: mongoose.Schema.Types.Mixed
    }
  },
  { timestamps: true }
);

ResultSchema.index({ student: 1, examName: 1, term: 1 }, { unique: true });

const Result = mongoose.model('Result', ResultSchema);

export default Result;

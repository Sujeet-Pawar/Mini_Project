import mongoose from 'mongoose';

const AssignmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    instructions: {
      type: String
    },
    dueDate: {
      type: Date,
      required: true
    },
    classIds: {
      type: [String],
      default: []
    },
    issuedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    attachments: {
      type: [
        new mongoose.Schema(
          {
            filename: String,
            url: String,
            size: Number,
            mimeType: String
          },
          { _id: false }
        )
      ],
      default: []
    },
    metadata: {
      type: Map,
      of: mongoose.Schema.Types.Mixed
    }
  },
  { timestamps: true }
);

const SubmissionSchema = new mongoose.Schema(
  {
    assignment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Assignment',
      required: true
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    submittedAt: {
      type: Date,
      default: Date.now
    },
    files: {
      type: [
        new mongoose.Schema(
          {
            filename: String,
            url: String,
            size: Number,
            mimeType: String
          },
          { _id: false }
        )
      ],
      default: []
    },
    status: {
      type: String,
      enum: ['Submitted', 'Pending', 'Late', 'Graded'],
      default: 'Submitted'
    },
    grade: {
      score: Number,
      remarks: String,
      gradedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    },
    metadata: {
      type: Map,
      of: mongoose.Schema.Types.Mixed
    }
  },
  { timestamps: true }
);

SubmissionSchema.index({ assignment: 1, student: 1 }, { unique: true });

const Assignment = mongoose.model('Assignment', AssignmentSchema);
const Submission = mongoose.model('Submission', SubmissionSchema);

export { Assignment, Submission };
export default Assignment;

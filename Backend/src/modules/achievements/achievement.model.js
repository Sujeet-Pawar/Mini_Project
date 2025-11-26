import mongoose from 'mongoose';

const AchievementSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    role: {
      type: String,
      enum: ['Student', 'Faculty'],
      required: true
    },
    title: {
      type: String,
      required: true
    },
    category: {
      type: String
    },
    description: {
      type: String
    },
    achievementDate: {
      type: Date
    },
    proofUrl: {
      type: String
    },
    proofKey: {
      type: String
    },
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected'],
      default: 'Pending'
    },
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    reviewedAt: {
      type: Date
    },
    remarks: {
      type: String
    },
    metadata: {
      type: Map,
      of: mongoose.Schema.Types.Mixed
    }
  },
  { timestamps: true }
);

const Achievement = mongoose.model('Achievement', AchievementSchema);

export default Achievement;

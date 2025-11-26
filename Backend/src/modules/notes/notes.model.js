import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String
    },
    tags: {
      type: [String],
      default: []
    },
    fileUrl: {
      type: String
    },
    fileKey: {
      type: String
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    visibility: {
      type: String,
      enum: ['Public', 'Students', 'Faculty', 'Admins', 'Custom'],
      default: 'Students'
    },
    allowedRoles: {
      type: [String],
      default: []
    },
    allowedClassIds: {
      type: [String],
      default: []
    },
    metadata: {
      type: Map,
      of: mongoose.Schema.Types.Mixed
    }
  },
  { timestamps: true }
);

const Note = mongoose.model('Note', NoteSchema);

export default Note;

import mongoose from 'mongoose';

export const USER_ROLES = ['Student', 'Faculty', 'Admin'];

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    passwordHash: {
      type: String,
      required: true,
      select: false
    },
    role: {
      type: String,
      enum: USER_ROLES,
      default: 'Student'
    },
    department: {
      type: String
    },
    year: {
      type: Number
    },
    phone: {
      type: String
    },
    classIds: {
      type: [String],
      default: []
    },
    busId: {
      type: String
    },
    avatarUrl: {
      type: String
    },
    metadata: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
      default: {}
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

UserSchema.methods.toSafeObject = function toSafeObject() {
  const obj = this.toObject({ versionKey: false });
  obj.id = obj._id.toString();
  delete obj.passwordHash;
  delete obj.__v;
  return obj;
};

const User = mongoose.model('User', UserSchema);

export default User;

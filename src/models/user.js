import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    city: { type: String, required: true },
    postalOffice: { type: String, required: true, default: '1' },
    avatar: {
      type: String,
      required: false,
      default: 'https://ac.goit.global/fullstack/react/default-avatar.jpg',
    },
    avatar_id: { type: String, default: '' },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};
export const User = model('User', userSchema);

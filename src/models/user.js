import { model, Schema } from 'mongoose';
import { ROLE } from '../constants/role.js';

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
      type: Number,
      required: true,
    },
    city: { type: String, required: true },
    postOfficeNumber: { type: String, required: true, default: '1' },
    role: { type: String, enum: ROLE, default: 'buyer' },
    avatar: {
      type: String,
      required: false,
      default: 'https://ac.goit.global/fullstack/react/default-avatar.jpg',
    },
    theme: { type: String, enum: ['light', 'dark'], default: 'light' },
  },
  { timestamps: true, versionKey: false },
);

export const User = model('User', userSchema);

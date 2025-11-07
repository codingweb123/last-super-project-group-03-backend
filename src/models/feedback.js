import { Schema, model } from 'mongoose';

const feedbackSchema = new Schema(
  {
    author: {
      type: String,
      trim: true,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      default: '',
      trim: true,
      required: false,
    },
    rate: {
      type: Number,
      min: 1,
      max: 5,
      enum: [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5],
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    goodId: {
      type: Schema.Types.ObjectId,
      ref: 'Good',
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

export const Feedback = model('Feedback', feedbackSchema);

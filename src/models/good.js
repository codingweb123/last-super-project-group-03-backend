import { Schema, model } from 'mongoose';
import { Feedback } from './feedback.js'; // eslint-disable-line

const goodSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      value: {
        type: Number,
        min: 1,
        required: true,
      },
      currency: {
        type: String,
        enum: ['грн'],
        required: true,
      },
    },
    sizes: {
      type: [String],
      enum: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'],
      required: true,
    },
    colors: {
      type: [String],
      enum: ['white', 'black', 'grey', 'blue', 'green', 'red', 'pastel'],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    feedbacks: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Feedback',
        required: true,
      },
    ],
    prevDescription: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ['women', 'men', 'unisex'],
      required: true,
    },
    characteristics: {
      type: [String],
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

export const Good = model('Good', goodSchema);

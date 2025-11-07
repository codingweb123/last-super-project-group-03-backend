import { Schema, model } from 'mongoose';

const categorySchema = new Schema(
  {
    name: {
      type: String,
      enum: [
        'Футболки та сорочки',
        'Штани та джинси',
        'Верхній одяг',
        'Топи та майки',
        'Сукні та спідниці',
        'Домашній та спортивний одяг',
        'Худі та кофти',
        'Інше',
      ],
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

export const Category = model('Category', categorySchema);

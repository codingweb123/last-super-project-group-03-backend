import { model, Schema } from 'mongoose';

const orderSchema = new Schema(
  {
    products: [
      {
        id: { type: Schema.Types.ObjectId, ref: 'Good', required: true },
        amount: { type: Number, required: true, min: 1 },
        size: {
          type: String,
          required: true,
          enum: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'],
        },
        color: {
          type: String,
          required: true,
          enum: ['white', 'black', 'grey', 'blue', 'green', 'red', 'pastel'],
        },
      },
      { _id: false },
    ],
    sum: { type: Number, required: true },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    date: { type: String, required: true },
    orderNum: {
      type: String,
      unique: true,
    },
    comment: { type: String, default: '' },
    status: {
      type: String,
      enum: ['processing', 'packing', 'completed', 'cancelled'],
      default: 'processing',
    },
    userData: {
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
      },
      city: { type: String, required: true },
      postalOffice: { type: Number, required: true },
    },
  },
  { timestamps: true, versionKey: false },
);

export const Order = model('Order', orderSchema);

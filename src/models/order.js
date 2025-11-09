import { model, Schema } from 'mongoose';

const orderSchema = new Schema(
  {
    products: [
      {
        _id: { type: Schema.Types.ObjectId, ref: 'Good', required: true },
        amount: { type: Number, required: true, min: 1 },
        size: { type: String, required: true },
        color: { type: String, required: true },
      },
    ],
    sum: { type: Number, required: true },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    userPhone: {
      type: Number,
      required: true,
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
        trim: true,
      },
      lastName: {
        type: String,
        trim: true,
      },
      phone: {
        type: Number,
      },
      city: { type: String, required: true },
      postalOffice: { type: Number, required: true },
    },
  },
  { timestamps: true, versionKey: false },
);

orderSchema.pre('save', async function (next) {
  if (this.isNew) {
    const lastOrder = await this.constructor.findOne().sort('-orderNum');
    this.orderNum = lastOrder ? lastOrder.orderNum + 1 : 1235960;
  }
  next();
});

export const Order = model('Order', orderSchema);

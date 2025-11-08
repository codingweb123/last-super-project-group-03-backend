import { model, Schema } from 'mongoose';

const orderSchema = new Schema(
  {
    products: [
      {
        id: { type: String },
        amount: { type: Number, required: true, default: 1 },
        size: { type: String, required: true, default: 'XXS' },
        color: { type: String, required: true, default: 'white' },
      },
    ],
    sum: { type: Number, required: true },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    date: { type: String },
    orderNum: {
      type: String,
      unique: true,
    },
    comment: { type: String, required: false, default: '' },
    status: {
      type: String,
      enum: ['Processing', 'Packing', 'Completed', 'Cancelled'],
      default: 'Processing',
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
        type: Number,
        required: true,
        unique: true,
      },
      city: { type: String, required: true, default: '' },
      postalOffice: { type: String, required: false, default: '1' },
    },
  },
  { timestamps: true, versionKey: false },
);

orderSchema.pre('save', async function (next) {
  if (this.isNew) {
    const lastOrder = await this.constructor.findOne().sort('-orderNum');
    this.orderNum = lastOrder ? lastOrder.orderNum + 1 : 1000001;
  }
  next();
});

export const Order = model('Order', orderSchema);

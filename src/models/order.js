import { model, Schema } from 'mongoose';

const orderItemSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Good', required: true },
  quantity: { type: Number, required: true, default: 1 },
});

const orderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    orderItems: [orderItemSchema],
    subTotal: { type: Number, required: true },
    shippingPrice: { type: Number, default: 0 },
    totalPrice: { type: Number, required: true },
    comment: { type: String, required: false },
    status: {
      type: String,
      enum: ['У процесі', 'Комплектується', 'Виконано', 'Скасовано'],
    },
    orderNumber: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true, versionKey: false },
);

orderSchema.pre('save', async function (next) {
  if (this.isNew) {
    const lastOrder = await this.constructor.findOne().sort('-orderNumber');
    this.orderNumber = lastOrder ? lastOrder.orderNumber + 1 : 1000001;
  }
  next();
});

export const Order = model('Order', orderSchema);

import createHttpError from 'http-errors';
import { Order } from '../models/order.js';
import { Good } from '../models/good.js';

export const createOrder = async (req, res) => {
  const { products, comment, userData } = req.body;
  const userId = req.user?._id;

  const getRandomNum = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
  };
  const orderNum = getRandomNum(1111111, 9999999);

  const goods = await Promise.all(products.map((p) => Good.findById(p.id)));

  let sum = goods.reduce((acc, good, i) => {
    if (!good) return acc;
    return acc + products[i].amount * good.price.value;
  }, 0);

  const order = await Order.create({
    products,
    date: new Date().toISOString().split('T')[0],
    orderNum,
    sum,
    comment,
    userData,
    ...(userId && { userId }),
  });
  return res.status(201).json(order);
};

export const getUserOrders = async (req, res) => {
  const orders = await Order.find({
    $or: [{ userId: req.user._id }, { 'userData.phone': req.user.phone }],
  }).sort({ date: -1 });
  res.status(200).json(orders);
};

export const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  if (req.user.role !== 'admin') {
    throw createHttpError(403, 'You are not allowed to change order status');
  }

  const updated = await Order.findByIdAndUpdate(
    orderId,
    { status },
    { new: true },
  );

  return res.status(200).json(updated);
};

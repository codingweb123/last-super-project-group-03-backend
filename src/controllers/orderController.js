import createHttpError from 'http-errors';
import { Order } from '../models/order.js';
import { Good } from '../models/good.js';

export const createOrder = async (req, res) => {
  const { products, comment, userData } = req.body;

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
    products: products.map((p) => ({
      _id: p.id,
      amount: p.amount,
      size: p.size,
      color: p.color,
    })),
    date: new Date().toISOString().split('T')[0],
    orderNum,
    sum,
    comment,
    userData,
    ...(req.user?._id && { userId: req.user._id }),
    // ...(userId && { userId }),
  });

  return res.status(201).json({
    _id: order._id,
    products: order.products,
    sum: order.sum,
    userId: order.userId,
    date: order.date,
    orderNum: order.orderNum,
    comment: order.comment,
    status: order.status,
    userData: order.userData,
  });
};

export const getUserOrders = async (req, res) => {
  const orders = await Order.find({
    $or: [{ userId: req.user.id }, { 'userData.phone': req.user.phone }],
  }).sort({ date: -1 });

  const userOrdersRes = orders.map((order) => ({
    _id: order._id,
    products: order.products,
    sum: order.sum,
    userId: order.userId,
    date: order.date,
    orderNum: order.orderNum,
    comment: order.comment,
    status: order.status,
    userData: order.userData,
  }));

  res.status(200).json(userOrdersRes);
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

  return res.status(200).json({
    _id: updated._id,
    products: updated.products,
    sum: updated.sum,
    userId: updated.userId,
    date: updated.date,
    orderNum: updated.orderNum,
    comment: updated.comment,
    status: updated.status,
    userData: updated.userData,
  });
};

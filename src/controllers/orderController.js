import createHttpError from 'http-errors';
import { Order } from '../models/order.js';
import { Good } from '../models/good.js';

const getRandomNum = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
};
export const createOrder = async (req, res) => {
  const { products, comment, userData } = req.body;

  const orderNum = getRandomNum(1111111, 9999999);
  const date = new Date().toISOString().split('T')[0];
  const ids = products.map((product) => product.id);
  const goods = await Good.find({ _id: { $in: ids } });
  const goodsMap = {};
  goods.forEach((good) => {
    goodsMap[good._id] = good;
  });

  const sum = products.reduce((acc, product) => {
    const good = goodsMap[product.id];
    if (good) {
      acc += product.amount * good.price.value;
    }
    return acc;
  }, 0);

  const order = await Order.create({
    products,
    date,
    orderNum,
    sum: Math.ceil(sum),
    comment,
    userData,
  });
  return res.status(201).json(order);
};

export const createOrderByUser = async (req, res) => {
  const { products, comment, userData } = req.body;

  const orderNum = getRandomNum(1111111, 9999999);
  const date = new Date().toISOString().split('T')[0];

  const ids = products.map((product) => product.id);
  const goods = await Good.find({ _id: { $in: ids } });
  const goodsMap = {};
  goods.forEach((good) => {
    goodsMap[good._id] = good;
  });

  const sum = products.reduce((acc, product) => {
    const good = goodsMap[product.id];
    if (good) {
      acc += product.amount * good.price.value;
    }
    return acc;
  }, 0);
  const order = await Order.create({
    products,
    date,
    userId: req.user._id,
    orderNum,
    sum: Math.ceil(sum),
    comment,
    userData,
  });
  return res.status(201).json(order);
};

export const getUserOrders = async (req, res) => {
  const userId = req.user._id;

  const orders = await Order.find({
    $or: [{ userId }, { 'userData.userId': String(userId) }],
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

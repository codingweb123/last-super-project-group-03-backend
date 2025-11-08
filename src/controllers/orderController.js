import createHttpError from 'http-errors';
import { Order } from '../models/order.js';

export const createOrder = async (req, res) => {
  try {
    const { products, comment, userData } = req.body;

    if (!products || !Array.isArray(products) || products.length === 0) {
      throw createHttpError(400, 'Products array is required');
    }

    const sum = products.reduce(
      (acc, product) => acc + product.price * product.amount,
      0,
    );

    const orderData = {
      products,
      sum,
      date: new Date().toISOString(),
      comment,
      status: 'Processing',
    };

    if (req.user?._id) {
      orderData.userId = req.user._id;
    } else {
      if (!userData) {
        throw createHttpError(
          400,
          'userData is required for non-authenticated users',
        );
      }
      orderData.userData = userData;
    }

    const order = await Order.create(orderData);
    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res
      .status(error.status || 500)
      .json({ message: error.message || 'Error creating order' });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [{ userId: req.user._id }, { 'userData.phone': req.user.phone }],
    }).sort({ date: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res
      .status(error.status || 500)
      .json({ message: error.message || 'Error fetching orders' });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    if (!req.user || req.user.role !== 'admin') {
      throw createHttpError(403, 'Forbidden');
    }

    const { orderId } = req.params;
    const { status } = req.body;

    const updated = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true },
    );

    if (!updated) throw createHttpError(404, 'Order not found');

    res.status(200).json(updated);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({ message: error.message });
  }
};

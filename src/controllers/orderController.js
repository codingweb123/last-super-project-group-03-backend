import createHttpError from 'http-errors';
import { Order } from '../models/order.js';
import { Good } from '../models/good.js';

export const createOrder = async (req, res) => {
  try {
    const { products, comment, userData } = req.body;

    if (!products || !Array.isArray(products) || products.length === 0) {
      throw createHttpError(400, 'Products array is required');
    }

    const orderData = {
      products: products.map((p) => ({
        _id: p._id,
        amount: p.amount,
        size: p.size,
        color: p.color,
      })),
      date: new Date().toISOString(),
      comment,
    };

    if (req.user?._id) {
      orderData.userId = req.user._id;
      orderData.userPhone = req.user.phone;
      if (!userData) {
        orderData.userData = {
          firstName: req.user.firstName,
          lastName: req.user.lastName,
          phone: req.user.phone,
          city: req.user.city,
          postalOffice: req.user.postalOffice,
        };
      } else {
        orderData.userData = userData;
      }
    } else {
      if (!userData) {
        throw createHttpError(
          400,
          'userData is required for non-authenticated users',
        );
      }
      orderData.userData = userData;
      orderData.userPhone = userData.phone;
    }

    const productIds = products.map((product) => product._id);

    const goods = await Good.find({ _id: { $in: productIds } });

    const priceMap = new Map();
    goods.forEach((good) => {
      priceMap.set(good._id.toString(), good.price.value);
    });

    const sum = products.reduce((acc, product) => {
      const price = priceMap.get(product._id);
      return acc + price * product.amount;
    }, 0);

    orderData.sum = sum;

    const order = await Order.create(orderData);
    const populatedOrder = await Order.findById(order._id).populate(
      'products._id',
    );
    console.log('productIds:', productIds);
    console.log(
      'goods found:',
      goods.map((g) => ({ id: g._id.toString(), price: g.price.value })),
    );
    res.status(201).json(populatedOrder);
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
    })
      .populate('products._id')
      .sort({ date: -1 });
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

    if (!updated) {
      throw createHttpError(404, 'Order not found');
    }
    return res.status(200).json(updated);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({ message: error.message });
  }
};

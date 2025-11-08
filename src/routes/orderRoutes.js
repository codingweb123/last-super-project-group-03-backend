import { Router } from 'express';
import { celebrate } from 'celebrate';
import { authenticate } from '../middleware/authenticate.js';
import {
  createOrderSchema,
  updateOrderStatusSchema,
} from '../validations/orderValidation.js';
import {
  createOrder,
  getUserOrders,
  updateOrderStatus,
} from '../controllers/orderController.js';

const router = Router();

router.post('/orders', celebrate(createOrderSchema), createOrder);
router.get('/orders', authenticate, getUserOrders);
router.patch(
  '/orders/:orderId',
  authenticate,
  celebrate(updateOrderStatusSchema),
  updateOrderStatus,
);

export default router;

import { Router } from "express"
import { celebrate } from "celebrate"
import { authenticate } from "../middleware/authenticate.js"
import {
	createOrderSchema,
	updateOrderStatusSchema,
} from "../validations/orderValidation.js"
import {
	createOrder,
	createOrderByUser,
	getUserOrders,
	updateOrderStatus,
} from "../controllers/orderController.js"

const router = Router()

router.get("/orders", authenticate, getUserOrders)
router.post("/orders", celebrate(createOrderSchema), createOrder)
router.post(
	"/orders/user",
	authenticate,
	celebrate(createOrderSchema),
	createOrderByUser
)
router.patch(
	"/orders/:orderId",
	authenticate,
	celebrate(updateOrderStatusSchema),
	updateOrderStatus
)

export default router

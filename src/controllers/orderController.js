import createHttpError from "http-errors"
import { Order } from "../models/order.js"
import { Good } from "../models/good.js"

const getRandomNumber = (min, max) => {
	return Math.round(Math.random() * (max - min) + min)
}

const getOrderSumAndNumber = async products => {
	const ids = products.map(product => product.id)
	const goods = await Good.find().in("_id", ids)
	goods.forEach(good => (ids[good._id] = good))
	return [
		Math.ceil(
			products.reduce((acc, product) => {
				if (ids[product.id]) acc += product.amount * ids[product.id].price.value
				return acc
			})
		),
		getRandomNumber(1111111, 9999999),
	]
}

export const createOrder = async (req, res) => {
	const { products, comment, userData } = req.body

	const date = new Date().toISOString().split("T")[0]
	const [sum, orderNum] = getOrderSumAndNumber()

	const order = await Order.create({
		products,
		sum,
		date,
		orderNum,
		comment,
		userData,
	})

	res.status(201).json(order)
}

export const createOrderByUser = async (req, res) => {
	const { products, comment, userData } = req.body

	const date = new Date().toISOString().split("T")[0]
	const [sum, orderNum] = getOrderSumAndNumber()

	const order = await Order.create({
		products,
		sum,
		userId: req.user._id,
		date,
		orderNum,
		comment,
		userData,
	})

	res.status(201).json(order)
}

export const getUserOrders = async (req, res) => {
	res.status(200).json(
		await Order.find({
			$or: [{ _id: req.user._id }, { "userData.phone": req.user.phone }],
		})
	)
}

export const updateOrderStatus = async (req, res) => {
	const { orderId } = req.params
	const { status } = req.body

	if (req.user.role !== "admin") {
		throw createHttpError(403, "Access restricted")
	}

	const updated = await Order.findByIdAndUpdate(
		orderId,
		{ status },
		{ new: true }
	)

	if (!updated) {
		throw createHttpError(404, "Order not found")
	}

	return res.status(200).json(updated)
}

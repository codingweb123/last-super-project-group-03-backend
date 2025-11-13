import createHttpError from "http-errors"

import { Good } from "../models/good.js"

export async function getAllGoods(req, res) {
	const {
		page = 1,
		perPage = 8,
		category,
		search,
		gender,
		price,
		color,
		sizes,
	} = req.query
	const skip = (page - 1) * perPage

	const goodQuery = Good.find()

	if (gender) {
		goodQuery.where("gender").equals(gender)
	}

	if (color) {
		goodQuery.in("colors", color)
	}

	if (sizes) {
		goodQuery.in("sizes", sizes.split(","))
	}

	if (price) {
		const priceFrom = price.split(",")[0]
		const priceTo = price.split(",")[1]
		if (priceFrom > 19999 || priceFrom < 0) {
			throw createHttpError(
				400,
				"price from must be not less than 0 or larger than 19999"
			)
		}
		if (priceTo > 20000 || priceFrom < 1) {
			throw createHttpError(
				400,
				"price to must be not less than 1 or larger than 20000"
			)
		}
		goodQuery.where("price.value").gte(priceFrom).lte(priceTo)
	}

	if (search) {
		goodQuery.where({ $text: { $search: search } })
	}

	if (category) {
		goodQuery.where("category").equals(category)
	}

	const [totalGoods, goods] = await Promise.all([
		goodQuery.clone().countDocuments(),
		goodQuery.skip(skip).limit(perPage),
	])

	const totalPages = Math.ceil(totalGoods / perPage)
	res.status(200).json({
		page,
		perPage,
		totalGoods,
		totalPages,
		goods,
	})
}

export async function getGoodById(req, res, next) {
	const good = await Good.findById(req.params.goodId)
	// Checks if there's no good.
	if (!good) {
		next(createHttpError(404, "Good not found"))
		return
	}

	res.status(200).json(good)
}

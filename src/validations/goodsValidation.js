import { Joi, Segments } from "celebrate"
import { isValidObjectId } from "mongoose"

function objectIdValidator(value, helpers) {
	return isValidObjectId(value) ? value : helpers.message("Invalid id format")
}

export const getAllGoodsSchema = {
	[Segments.QUERY]: Joi.object({
		category: Joi.string().custom(objectIdValidator),
		sizes: Joi.string().pattern(
			/^(XXS|XS|S|M|L|XL|XXL)((,(XXS|XS|S|M|L|XL|XXL))+)?$/
		),
		price: Joi.string().pattern(/\d+,\d+/),
		color: Joi.string().pattern(/white|black|grey|blue|green|red|pastel/),
		gender: Joi.string().pattern(/women|men|unisex/),
		page: Joi.number().integer().min(1).default(1),
		perPage: Joi.number().integer().min(5).max(20).default(8),
	}),
}

export const goodIdSchema = {
	[Segments.PARAMS]: Joi.object({
		goodId: Joi.string().custom(isValidObjectId).required(),
	}),
}

import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

function objectIdValidator(value, helpers) {
  return isValidObjectId(value) ? value : helpers.message('Invalid id format');
}

export const getAllGoodsSchema = {
  [Segments.QUERY]: Joi.object({
    category: Joi.string().custom(objectIdValidator),
    sizes: Joi.string().pattern(
      /(?<=^)(XXS|XS|S|M|L|XL|XXL)((,(XXS|XS|S|M|L|XL|XXL))+)?(?=$)/,
    ),
    fromPrice: Joi.number().integer().min(1).max(19999),
    toPrice: Joi.number().integer().min(2).max(20000),
    color: Joi.string().pattern(/white|black|grey|blue|green|red|pastel/),
    gender: Joi.string().pattern(/women|men|unisex/),
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(8).max(12),
  }),
};

export const goodIdSchema = {
  [Segments.PARAMS]: Joi.object({
    goodId: Joi.string().custom(isValidObjectId).required(),
  }),
};

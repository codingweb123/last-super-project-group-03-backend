import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';
import { userDataSchema } from './userValidation.js';

export const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
};

export const getUserOrdersSchema = {
  [Segments.QUERY]: Joi.object({
    status: Joi.string()
      .valid('processing', 'packing', 'completed', 'cancelled')
      .optional(),
  }),
};

export const createOrderSchema = {
  [Segments.BODY]: Joi.object({
    products: Joi.array()
      .items(
        Joi.object({
          id: Joi.string().custom(objectIdValidator).required(),
          amount: Joi.number().integer().min(1).default(1),
          size: Joi.string()
            .valid('XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL')
            .required(),
          color: Joi.string()
            .valid('white', 'black', 'grey', 'blue', 'green', 'red', 'pastel')
            .required(),
        }),
      )
      .min(1)
      .required(),
    userId: Joi.string().custom(objectIdValidator),
    comment: Joi.string().allow('').default(''),
    userData: userDataSchema.required(),
  }),
};

export const updateOrderStatusSchema = {
  [Segments.PARAMS]: Joi.object({
    orderId: Joi.string().custom(objectIdValidator).required(),
  }),
  [Segments.BODY]: Joi.object({
    status: Joi.string()
      .valid('processing', 'packing', 'completed', 'cancelled')
      .default('processing'),
  }),
};

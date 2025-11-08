import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';
import { userDataSchema } from './userValidation.js';

export const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
};

export const createOrderSchema = {
  [Segments.BODY]: Joi.object({
    products: Joi.array()
      .items(
        Joi.object({
          id: Joi.string().required(),
          amount: Joi.number().integer().min(1).default(1),
          size: Joi.string()
            .valid('XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL')
            .required(),
          color: Joi.string().required(),
        }),
      )
      .min(1)
      .required(),
    comment: Joi.string().allow('').default(''),
    userData: userDataSchema.optional(),
  }),
};

export const updateOrderStatusSchema = {
  [Segments.PARAMS]: Joi.object({
    orderId: Joi.string().custom(objectIdValidator).required(),
  }),
  [Segments.BODY]: Joi.object({
    status: Joi.string()
      .valid('Processing', 'Packing', 'Completed', 'Cancelled')
      .default('Processing')
      .required(),
  }),
};

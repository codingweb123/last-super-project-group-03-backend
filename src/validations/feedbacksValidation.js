import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

function objectIdValidator(value, helpers) {
  return isValidObjectId(value) ? value : helpers.message('Invalid id format');
}

export const createFeedbackSchema = {
  [Segments.BODY]: Joi.object({
    author: Joi.string().min(2).max(53).required(),
    date: Joi.date().required(),
    description: Joi.string().max(500).default(''),
    rate: Joi.number()
      .min(1)
      .max(5)
      .valid(1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5)
      .required(),
    category: Joi.string().custom(objectIdValidator).required(),
    goodId: Joi.string().custom(objectIdValidator).required(),
  }),
};

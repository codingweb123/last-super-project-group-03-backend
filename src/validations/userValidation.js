import { Joi, Segments } from 'celebrate';

export const userDataSchema = Joi.object({
  firstName: Joi.string().min(2).max(30).messages({
    'string.min': 'First name must be at least 2 characters long',
    'string.max': 'First name cannot exceed 30 characters',
  }),
  lastName: Joi.string().min(2).max(30).messages({
    'string.min': 'Last name must be at least 2 characters long',
    'string.max': 'Last name cannot exceed 30 characters',
  }),
  phone: Joi.string()
    .pattern(/^\+380\d{9}$/)
    .messages({
      'string.pattern.base':
        'Phone number must follow the format +380XXXXXXXXX',
    }),
  city: Joi.string().max(50).messages({
    'string.max': 'City name cannot exceed 50 characters',
  }),
  postalOffice: Joi.string().max(15).default('1').messages({
    'string.max': 'Post office number cannot exceed 10 characters',
  }),
});

export const updateUserSchema = {
  [Segments.BODY]: userDataSchema,
};

import { Joi, Segments } from 'celebrate';

export const resetPasswordSchema = {
  [Segments.BODY]: Joi.object({
    token: Joi.string().required(),
    password: Joi.string().min(6).required(),
  }),
};

export const requestResetEmailSchema = {
  [Segments.BODY]: Joi.object({
    phone: Joi.string()
      .pattern(/^\+380\d{9}$/)
      .required(),
    email: Joi.string().email().required(),
  }),
};

export const registerUserSchema = {
  [Segments.BODY]: Joi.object({
    firstName: Joi.string().min(2).max(100).required(),
    phone: Joi.string()
      .pattern(/^\+380\d{9}$/)
      .required(),
    password: Joi.string().min(6).required(),
  }),
};

export const loginUserSchema = {
  [Segments.BODY]: Joi.object({
    phone: Joi.string()
      .pattern(/^\+380\d{9}$/)
      .required(),
    password: Joi.string().min(6).required(),
  }),
};

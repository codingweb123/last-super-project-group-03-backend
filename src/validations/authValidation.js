import { Joi, Segments } from "celebrate";

export const resetPasswordSchema = {
  [Segments.BODY]: Joi.object({
    password: Joi.string().min(8).max(128).required(),
    token: Joi.string().required(),
  }),
};

export const requestResetEmailSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().max(64).required(),
  }),
};

export const registerUserSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().max(32).required(),
    phone: Joi.string().pattern(/^\+[0-9]{10,15}$/).required(),
    password: Joi.string().min(8).max(128).required(),
  }),
};

export const loginUserSchema = {
  [Segments.BODY]: Joi.object({
    phone: Joi.string().pattern(/^\+[0-9]{10,15}$/).required(),
    password: Joi.string().min(8).max(128).required(),
  }),
};

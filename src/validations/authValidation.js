import { Joi, Segments } from "celebrate";

export const registerUserSchema = {
  [Segments.BODY]: Joi.object({
    firstName: Joi.string().max(32).required(),
    phone: Joi.string().pattern(/^\+\d{12}$/).required(),
    password: Joi.string().min(8).max(128).required(),
  }),
};

export const loginUserSchema = {
  [Segments.BODY]: Joi.object({
    phone: Joi.string().pattern(/^\+\d{12}$/).required(),
    password: Joi.string().min(8).max(128).required(),
  }),
};

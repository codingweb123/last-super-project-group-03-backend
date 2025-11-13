import { Joi, Segments } from "celebrate"

export const updateUserSchema = {
	[Segments.BODY]: Joi.object({
		firstName: Joi.string().min(2).max(32).messages({
			"string.min": "First name must be at least {#limit} characters long",
			"string.max": "First name cannot exceed {#limit} characters",
		}),
		lastName: Joi.string().min(2).max(32).messages({
			"string.min": "Last name must be at least {#limit} characters long",
			"string.max": "Last name cannot exceed {#limit} characters",
		}),
		phone: Joi.string()
			.pattern(/^\+380\d{9}$/)
			.messages({
				"string.pattern.base":
					"Phone number must follow the format +380XXXXXXXXX",
			}),
		city: Joi.string().max(32).messages({
			"string.max": "City name cannot exceed {#limit} characters",
		}),
		postalOffice: Joi.number().min(1).messages({
			"string.max": "Post office number cannot exceed {#limit} characters",
		}),
	}).min(1),
}

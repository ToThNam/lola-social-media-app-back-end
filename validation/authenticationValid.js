import Joi from "@hapi/joi";

export const autheticationSchema = Joi.object({
  email: Joi.string().email().lowercase().trim().required(),
  password: Joi.string().min(3).max(16).required(),
});

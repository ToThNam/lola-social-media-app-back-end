import Joi from '@hapi/joi';

export const registerSchema = Joi.object({
  email: Joi.string().email().lowercase().trim().required(), 
  password: Joi.string().min(3).max(16).required(), 
  firstName: Joi.string().min(3).max(256).trim().required(),  
  lastName: Joi.string().min(3).max(256).trim().required(),
});
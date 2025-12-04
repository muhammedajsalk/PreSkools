import Joi from "joi";

export const createTeacherSchema = Joi.object({
  fullName: Joi.string().min(3).max(50).required(),
  phone: Joi.string().pattern(/^[0-9]{12}$/).required().messages({
    "string.pattern.base": "Phone number must be exactly 12 digits",
  }),
  email: Joi.string().email().lowercase().required(),
  qualification: Joi.string().required(),
  experience: Joi.string().allow(""),
  joiningDate: Joi.date().iso().required(),
});

export const updateTeacherSchema = Joi.object({
  fullName: Joi.string().min(3).max(50),
  phone: Joi.string().pattern(/^[0-9]{12}$/),
  email: Joi.string().email().lowercase(),
  qualification: Joi.string(),
  experience: Joi.string(),
  joiningDate: Joi.date().iso(),
  isActive: Joi.boolean(), 
}).min(1); 
import Joi from "joi";

export const createSchoolValidation = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  address: Joi.string().min(5).required(),
  phone: Joi.string().pattern(/^[0-9]{10}$/).required(),
  email: Joi.string().email().required(),
  admin_phone: Joi.string().pattern(/^[0-9]{10}$/).required(),
  plan: Joi.string().valid("SEED", "SPROUT", "BLOOM").default("SEED"),
});

export const updateSchoolValidation = Joi.object({
  name: Joi.string().min(3).max(100),
  address: Joi.string().min(5),
  phone: Joi.string().pattern(/^[0-9]{10}$/),
  email: Joi.string().email(),
  plan: Joi.string().valid("SEED", "SPROUT", "BLOOM"),
  status: Joi.string().valid("ACTIVE", "INACTIVE", "PAST_DUE"),
}).min(1); 

export const querySchoolValidation = Joi.object({
  page: Joi.number().min(1).default(1),
  limit: Joi.number().min(1).max(200).default(10),
  search: Joi.string().allow(""),
  plan: Joi.string().valid("SEED", "SPROUT", "BLOOM", "").allow(""),
  status: Joi.string().valid("ACTIVE", "INACTIVE", "PAST_DUE", "").allow(""),
  sortBy: Joi.string().valid("name", "createdAt", "subscription_plan").default("createdAt"),
  sortOrder: Joi.string().valid("asc", "desc").default("desc"),
});

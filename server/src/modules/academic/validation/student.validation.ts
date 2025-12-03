import Joi from "joi";

export const createStudentSchema = Joi.object({
  name: Joi.string().required(),
  admission_no: Joi.string().required(),
  dob: Joi.date().required(),
  gender: Joi.string().valid("Male", "Female", "Other").required(),
  parent_name: Joi.string().required(),
  parent_phone: Joi.string().pattern(/^[0-9]{12}$/).required(),
  class_id: Joi.string().required(),
  address: Joi.string().optional().allow(""),
  blood_group: Joi.string().optional(),
});


export const updateStudentSchema = Joi.object({
  name: Joi.string(),
  class_id: Joi.string(),
  parent_phone: Joi.string().pattern(/^[0-9]{12}$/),
  status: Joi.string().valid("ACTIVE", "ALUMNI", "DROPPED"),
  address: Joi.string(),
  blood_group: Joi.string(),
}).min(1);

import Joi from "joi";

export const createClassSchema = Joi.object({
  name: Joi.string().required().min(2),
  teacher_id: Joi.string().optional(), 
});


export const updateClassSchema = Joi.object({
  name: Joi.string().min(2),
  teacher_id: Joi.string(),
  isActive: Joi.boolean(),
}).min(1);

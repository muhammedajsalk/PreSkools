import Joi from "joi";

export const createActivitySchema = Joi.object({
  student_ids: Joi.array().items(Joi.string().required()).min(1).required().messages({
    "array.min": "Select at least one student",
  }),
  class_id: Joi.string().required(),
  date: Joi.date().iso().optional(),
  type: Joi.string().valid("MEAL", "NAP", "HYGIENE", "LEARNING", "PHOTO", "NOTE").required(),
  
  // Conditional Validation based on Type
  data: Joi.object().when('type', {
    is: 'MEAL',
    then: Joi.object({
      food_item: Joi.string().allow("").optional(),
      quantity: Joi.string().valid("ALL", "HALF", "NONE", "EXTRA").required(),
      description: Joi.string().allow("").optional(),
    }).required()
  }).when('type', {
    is: 'NAP',
    then: Joi.object({
      start_time: Joi.string().required(),
      duration: Joi.number().required(),
      quality: Joi.string().valid("GOOD", "RESTLESS", "REFUSED").required(),
      description: Joi.string().allow("").optional(),
    }).required()
  }).when('type', {
    is: 'HYGIENE',
    then: Joi.object({
      subtype: Joi.string().valid("DIAPER", "POTTY", "HANDWASH").required(),
      description: Joi.string().allow("").optional(),
    }).required()
  }).when('type', {
    // General validation for others (Photo, Learning, Note)
    is: Joi.valid('PHOTO', 'LEARNING', 'NOTE'),
    then: Joi.object({
      title: Joi.string().optional(),
      description: Joi.string().allow("").optional(),
      media_urls: Joi.array().items(Joi.string()).optional(),
    }).required()
  }).required()
});
import Joi from "joi";

export const querySchema = Joi.object({
  page: Joi.number().default(1),
  limit: Joi.number().default(10),
  search: Joi.string().allow(""),
  class_id: Joi.string().optional(),
});

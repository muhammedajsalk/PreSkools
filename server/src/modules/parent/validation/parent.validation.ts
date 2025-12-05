// File: server/src/modules/parent/parent.validation.ts

import Joi from "joi";

export const getQuickStatsSchema = Joi.object({
  // Student ID is required to look up stats
  studentId: Joi.string().required(), 
});
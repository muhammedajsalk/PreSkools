import Joi from "joi";

export const markAttendanceSchema = Joi.object({
  class_id: Joi.string().required(),
  date: Joi.date().iso().required(), // "2024-12-02"
  records: Joi.array().items(
    Joi.object({
      student_id: Joi.string().required(),
      status: Joi.string().valid("PRESENT", "ABSENT", "LATE", "EXCUSED").required(),
      remark: Joi.string().allow("").optional()
    })
  ).min(1).required()
});

export const getAttendanceSchema = Joi.object({
  class_id: Joi.string().required(),
  date: Joi.date().iso().optional(), // If missing, fetch range or month?
  month: Joi.number().min(1).max(12).optional(),
  year: Joi.number().optional()
});

export const getAnalyticsSchema = Joi.object({
  class_id: Joi.string().optional(), // Optional: If teacher wants to see all classes or just one
  timeRange: Joi.string().valid('today', 'week', 'month', '3months', '6months', 'year', 'specific').default('week'),
  startDate: Joi.date().iso().optional(), // Only if timeRange is 'specific'
  endDate: Joi.date().iso().optional(),
});
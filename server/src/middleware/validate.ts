import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { AppError } from "../utils/AppError";

// Default to 'body' if no source is specified
type ValidationSource = "body" | "query" | "params";

const validate = (schema: Joi.ObjectSchema, source: ValidationSource = "body") => {
  return (req: Request, res: Response, next: NextFunction) => {
    // 1. Pick the data source
    const data = req[source];

    // 2. Validate
    const { error, value } = schema.validate(data, {
      abortEarly: false, // Show all errors, not just the first
      stripUnknown: true, // Remove fields not in the schema
      convert: true, // Convert "123" to 123
    });

    if (error) {
      const errorMessage = error.details
        .map((detail) => detail.message)
        .join(", ");
      return next(new AppError(errorMessage, 400));
    }

    // 3. Replace request data with validated/sanitized data
    req[source] = value;
    next();
  };
};

export default validate;
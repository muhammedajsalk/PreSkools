import { Request, Response, NextFunction } from "express";
import Joi, { Schema } from "joi";
import { AppError } from "../utils/AppError";

const validate = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false, 
      stripUnknown: true,
    });

    if (error) {
      const message = error.details.map((detail) => detail.message).join(", ");
      return next(new AppError(message, 400));
    }

    next();
  };
};

export default validate;
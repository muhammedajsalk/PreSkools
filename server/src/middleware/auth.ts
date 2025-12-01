import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/AppError";


interface UserPayload {
  id: string;
  role: string;
  school_id: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new AppError("You are not logged in! Please log in to get access.", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as UserPayload;

    req.user = decoded;
    
    next();
  } catch (error) {
    return next(new AppError("Invalid Token. Please log in again.", 401));
  }
};


export const restrictTo = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user!.role)) {
      return next(new AppError("You do not have permission to perform this action", 403));
    }
    next();
  };
};



// // Example: Only Super Admin can create a school
// router.post("/create-school", protect, restrictTo("SUPER_ADMIN"), createSchool);
import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import School from "../modules/school/model/school.model";
import { checkTierAccess, SubscriptionPlan } from "../utils/billing.utils"; // Import the helper

export const restrictToPlan = (requiredPlan: SubscriptionPlan) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // 1. Ensure user is logged in and has a school_id attached by the 'protect' middleware
    if (!req.user || !req.user.school_id) {
      return next(new AppError("Unauthorized. Login or School context required.", 401));
    }

    // 2. Fetch the School's current plan from the database
    const school = await School.findById(req.user.school_id).lean();

    if (!school) {
      return next(new AppError("School not found or invalid context.", 404));
    }
    
    const currentPlan = school.subscription_plan as SubscriptionPlan;

    // 3. Check access hierarchy (e.g., BLOOM is allowed SPROUT features)
    const isAllowed = checkTierAccess(currentPlan, requiredPlan);

    if (!isAllowed) {
      // 4. Access Denied: Throw 403 Forbidden
      return next(
        new AppError(
          `Feature restricted. Current plan (${currentPlan}) requires an upgrade to ${requiredPlan} or higher.`,
          403
        )
      );
    }

    next(); // Access granted
  };
};



// example:-

// router.get(
//   "/export/students",
//   protect,
//   restrictTo("SCHOOL_ADMIN"),
//   restrictToPlan("BLOOM"), // 🔒 RESTRICTED TO BLOOM+
//   // ... controller
// );
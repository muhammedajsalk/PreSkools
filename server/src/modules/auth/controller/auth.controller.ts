import { Request, Response, NextFunction, CookieOptions } from "express";
import { getMeService, loginService } from "../services/auth.service";
import { AppError } from "../../../utils/AppError";
import { catchAsync } from "../../../middleware/catchAsync";
import User from "../model/user.model";

export const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { token, stepTwoPassword } = req.body;

  if (!token) {
    return next(new AppError("Firebase token is missing.", 400));
  }

  const result = await loginService(token, stepTwoPassword);

  if (result.isStepTwoRequired) {
    return res.status(200).json({
      success: true,
      message: "OTP verified. Proceed to Step 2.",
      step: 2,
      role: result.role,
    });
  }

  return res
    .status(200)
    .cookie("token", result.jwtToken as string, result.cookieOptions as CookieOptions)
    .json({
      success: true,
      token: result.jwtToken,
      user: result.user,
    });

});

export const getMe = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  console.log("hello")
  console.log(req.user?.id)
  const user = await getMeService(req.user?.id)
  res.status(200).json({
    success: true,
    data: user,
  });
});

import admin from "../../../config/firebase";
import { AppError } from "../../../utils/AppError";
import User, { IUser } from "../model/user.model";
import jwt, { SignOptions } from "jsonwebtoken";

export const loginService = async (token: string, stepTwoPassword?: string) => {
  const decodedToken = await admin.auth().verifyIdToken(token);
  const { uid, phone_number } = decodedToken;

  let user = await User.findOne({ firebase_uid: uid }).select("+password") as IUser;

  if (!user && phone_number) {
    // Note: Ensure phone numbers in DB match Firebase format (e.g., +919999999999)
    user = await User.findOne({ phone: phone_number }).select("+password") as IUser;

    if (user) {
      user.firebase_uid = uid;
      user.isActive = true; 
      await user.save();
    }
  }

  if (!user) {
    throw new AppError("User not registered in system. Contact Admin.", 401);
  }

  const isAdmin = ["SUPER_ADMIN", "SCHOOL_ADMIN"].includes(user.role);

  if (isAdmin && user.password && !stepTwoPassword) {
    return {
      isStepTwoRequired: true,
      role: user.role,
    };
  }

  if (isAdmin && user.password) {
    const isMatch = await user.matchPassword!(stepTwoPassword!);
    if (!isMatch) {
      throw new AppError("Invalid credentials.", 401);
    }
  }


  const jwtToken = jwt.sign(
    { id: user._id, role: user.role, school_id: user.school_id },
    process.env.JWT_SECRET as string,
    { expiresIn: process.env.JWT_EXPIRE || "7d" } as SignOptions
  );

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    expires: new Date(Date.now() + (Number(process.env.JWT_COOKIE_EXPIRE) || 7) * 24 * 60 * 60 * 1000),
  };

  return {
    isStepTwoRequired: false,
    jwtToken,
    cookieOptions,
    user,
  };
};

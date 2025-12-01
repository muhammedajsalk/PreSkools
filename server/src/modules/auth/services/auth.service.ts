import admin from "../../../config/firebase";
import User from "../model/user.model";
import jwt from "jsonwebtoken";

export const loginService = async (token: string) => {

  if (!token) {
    throw new Error("Token is required");
  }

  const decodedToken = await admin.auth().verifyIdToken(token);
  const { uid } = decodedToken;

  const user = await User.findOne({ firebase_uid: uid });
  if (!user) {
    throw new Error("User not registered in system. Contact Admin.");
  }

  const accessToken = jwt.sign(
    {
      id: user._id,
      role: user.role,
      school_id: user.school_id,
    },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" }
  );

  return {
    success: true,
    token: accessToken,
    user: {
      id: user._id,
      name: user.name,
      role: user.role,
      school_id: user.school_id,
    },
  };
};

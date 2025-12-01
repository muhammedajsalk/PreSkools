import mongoose, { Schema, Document } from "mongoose";


export interface IUser extends Document {
  name: string;
  phone: string; 
  firebase_uid: string;
  role: "SUPER_ADMIN" | "SCHOOL_ADMIN" | "TEACHER" | "PARENT";
  school_id?: mongoose.Types.ObjectId;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}


const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    firebase_uid: { type: String, required: true, unique: true },
    role: {
      type: String,
      enum: ["SUPER_ADMIN", "SCHOOL_ADMIN", "TEACHER", "PARENT"],
      default: "PARENT",
    },
    school_id: { type: Schema.Types.ObjectId, ref: "School" },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true, 
  }
);


export default mongoose.model<IUser>("User", UserSchema);
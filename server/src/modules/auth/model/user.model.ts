import mongoose, { Schema, Document } from "mongoose";
import bcrypt from 'bcrypt';


export interface IUser extends Document {
  name: string;
  phone: string;
  firebase_uid?: string;
  role: "SUPER_ADMIN" | "SCHOOL_ADMIN" | "TEACHER" | "PARENT";
  school_id?: mongoose.Types.ObjectId;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  password?: string;
  matchPassword?(enteredPassword: string): Promise<boolean>;
}


const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    firebase_uid: { type: String},
    role: {
      type: String,
      enum: ["SUPER_ADMIN", "SCHOOL_ADMIN", "TEACHER", "PARENT"],
      default: "PARENT",
    },
    school_id: { type: Schema.Types.ObjectId, ref: "School" },
    isActive: { type: Boolean, default: false },
    password: {
      type: String,
      select: false, 
    },
  },
  {
    timestamps: true,
  }
);



UserSchema.pre('save', async function (next) {
  if (!this.isModified('password') || !this.password) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password as string, salt);
  next();
});

UserSchema.methods.matchPassword = async function (enteredPassword:string) {
  return await bcrypt.compare(enteredPassword, this.password);
};


export default mongoose.model<IUser>("User", UserSchema);

UserSchema.index({ firebase_uid: 1 }, { unique: true, sparse: true });
UserSchema.index({ phone: 1 }, { unique: true });
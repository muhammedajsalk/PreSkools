import mongoose, { Schema, Document } from "mongoose";

export interface IClass extends Document {
  name: string;
  teacher_id?: mongoose.Types.ObjectId;
  school_id: mongoose.Types.ObjectId;
  isActive: boolean;
}

const ClassSchema = new Schema<IClass>(
  {
    name: { type: String, required: true },
    teacher_id: { type: Schema.Types.ObjectId, ref: "User" },
    school_id: { type: Schema.Types.ObjectId, ref: "School", required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

ClassSchema.index({ name: 1, school_id: 1 }, { unique: true });

export const ClassModel = mongoose.model<IClass>("Class", ClassSchema);
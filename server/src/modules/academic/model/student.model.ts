import mongoose, { Schema, Document } from "mongoose";

export interface IStudent extends Document {
  name: string;
  admission_no: string;
  dob: Date;
  gender: "Male" | "Female" | "Other";
  parent_name: string;
  parent_phone: string;
  class_id: mongoose.Types.ObjectId;
  school_id: mongoose.Types.ObjectId;
  address?: string;
  blood_group?: string;
  status: "ACTIVE" | "ALUMNI" | "DROPPED";
}

const StudentSchema = new Schema<IStudent>(
  {
    name: { type: String, required: true },
    admission_no: { type: String, required: true },
    dob: { type: Date, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    parent_name: { type: String, required: true },
    parent_phone: { type: String, required: true },
    address: { type: String },
    blood_group: { type: String },

    class_id: { type: Schema.Types.ObjectId, ref: "Class", required: true },
    school_id: { type: Schema.Types.ObjectId, ref: "School", required: true },

    status: {
      type: String,
      enum: ["ACTIVE", "ALUMNI", "DROPPED"],
      default: "ACTIVE",
    },
  },
  { timestamps: true }
);


StudentSchema.index({ admission_no: 1, school_id: 1 }, { unique: true });

export const StudentModel = mongoose.model<IStudent>("Student", StudentSchema);
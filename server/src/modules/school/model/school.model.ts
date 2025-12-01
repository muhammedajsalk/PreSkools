import mongoose, { Schema, Document } from "mongoose";

export interface ISchool extends Document {
  name: string;
  address: string;
  phone: string;
  email: string;
  logo_url?: string;
  subscription_plan: "SEED" | "SPROUT" | "BLOOM";
  subscription_status: "ACTIVE" | "INACTIVE" | "PAST_DUE";
  admin_id: mongoose.Types.ObjectId; 
  createdAt: Date;
  updatedAt: Date;
}

const SchoolSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    logo_url: { type: String },
    subscription_plan: {
      type: String,
      enum: ["SEED", "SPROUT", "BLOOM"],
      default: "SEED",
    },
    subscription_status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE", "PAST_DUE"],
      default: "ACTIVE",
    },
    admin_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default mongoose.model<ISchool>("School", SchoolSchema);
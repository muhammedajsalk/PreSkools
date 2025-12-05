import mongoose, { Schema, Document } from "mongoose";

export interface ISchool extends Document {
  name: string;
  address: string;
  phone: string;
  email: string;
  logo_url?: string;
  subscription_plan: "SEED" | "SPROUT" | "BLOOM";
  subscription_status: 'ACTIVE' | 'TRIAL' | 'PAST_DUE' | 'CANCELED';
  plan_start_date: Date;
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
      enum: ['SEED', 'SPROUT', 'BLOOM'],
      default: 'SEED',
      required: true 
    },
    subscription_status: {
      type: String,
      enum: ['ACTIVE', 'TRIAL', 'PAST_DUE', 'CANCELED'],
      default: 'TRIAL', // Start all new schools in trial mode
    },
    plan_start_date: { 
        type: Date, 
        default: Date.now 
    },
    admin_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default mongoose.model<ISchool>("School", SchoolSchema);
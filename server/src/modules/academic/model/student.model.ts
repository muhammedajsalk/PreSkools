import mongoose, { Schema, Document } from "mongoose";

export interface IStudent extends Document {
  name: string;
  admission_no: string;
  roll_no?: string;
  dob: Date;
  gender: "Male" | "Female" | "Other";
  avatar?: string;
  
  // ✅ PRIMARY CONTACT (Crucial for Searching & Login)
  // These are copies of either the Father or Mother details
  parent_name: string; 
  parent_phone: string;
  parent_email?: string;

  // Detailed Parent Info
  parents: {
    father: { name: string; phone: string; email?: string; occupation?: string; };
    mother: { name: string; phone: string; email?: string; occupation?: string; };
    guardian?: { name?: string; phone?: string; relation?: string; };
  };

  parent_ids: mongoose.Types.ObjectId[]; 

  address: {
    street?: string;
    city?: string;
    state?: string;
    zip_code?: string;
  };
  
  medical_info: {
    allergies: string[];
    conditions: string[];
    blood_group: string;
    doctor_name?: string;
    doctor_phone?: string;
  };

  transport: {
    mode: "BUS" | "PRIVATE" | "WALK";
    route_name?: string;
    pickup_point?: string;
  };

  documents: {
    title: string;
    doc_url: string;
    uploaded_at: Date;
  }[];

  class_id: mongoose.Types.ObjectId;
  school_id: mongoose.Types.ObjectId;
  status: "ACTIVE" | "ALUMNI" | "DROPPED";
}

const StudentSchema = new Schema<IStudent>(
  {
    name: { type: String, required: true },
    admission_no: { type: String, required: true },
    roll_no: { type: String },
    dob: { type: Date, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    avatar: { type: String },

    // ✅ KEPT FLAT FIELDS (Primary Contact)
    // This makes searching "Find Student by Parent Phone" much faster
    parent_name: { type: String, required: true },
    parent_phone: { type: String, required: true }, 
    parent_email: { type: String },

    parents: {
      father: {
        name: { type: String },
        phone: { type: String },
        email: { type: String },
        occupation: { type: String },
      },
      mother: {
        name: { type: String },
        phone: { type: String },
        email: { type: String },
        occupation: { type: String },
      },
      guardian: {
        name: { type: String },
        phone: { type: String },
        relation: { type: String },
      },
    },

    parent_ids: [{ type: Schema.Types.ObjectId, ref: "User" }], 

    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zip_code: { type: String },
    },

    medical_info: {
      type: {
        allergies: { type: [String], default: [] },
        conditions: { type: [String], default: [] },
        blood_group: { type: String, default: "" },
        doctor_name: { type: String },
        doctor_phone: { type: String },
      },
      default: {},
    },

    transport: {
      type: {
        mode: { type: String, enum: ["BUS", "PRIVATE", "WALK"], default: "PRIVATE" },
        route_name: { type: String },
        pickup_point: { type: String },
      },
      default: {},
    },

    documents: [
      {
        title: { type: String, required: true }, // ✅ Required
        doc_url: { type: String, required: true }, // ✅ Required
        uploaded_at: { type: Date, default: Date.now },
      },
    ],

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

// Index for searching parents quickly
StudentSchema.index({ parent_phone: 1 });
StudentSchema.index({ admission_no: 1, school_id: 1 }, { unique: true });

export const StudentModel = mongoose.model<IStudent>("Student", StudentSchema);
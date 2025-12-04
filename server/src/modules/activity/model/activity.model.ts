import mongoose, { Schema, Document } from "mongoose";

export interface IActivity extends Document {
  school_id: mongoose.Types.ObjectId;
  class_id: mongoose.Types.ObjectId;
  student_id: mongoose.Types.ObjectId;
  teacher_id: mongoose.Types.ObjectId;
  
  type: "MEAL" | "NAP" | "HYGIENE" | "LEARNING" | "PHOTO" | "NOTE";
  date: Date;
  
  // Dynamic Data Object
  data: {
    // Meal
    food_item?: string;
    quantity?: "ALL" | "HALF" | "NONE" | "EXTRA";
    
    // Nap
    start_time?: string;
    duration?: number;
    quality?: "GOOD" | "RESTLESS" | "REFUSED";
    
    // Hygiene
    subtype?: "DIAPER" | "POTTY" | "HANDWASH";
    
    // General
    title?: string;
    description?: string;
    media_urls?: string[];
  };

  createdAt: Date;
}

const ActivitySchema = new Schema<IActivity>(
  {
    school_id: { type: Schema.Types.ObjectId, ref: "School", required: true },
    class_id: { type: Schema.Types.ObjectId, ref: "Class", required: true },
    student_id: { type: Schema.Types.ObjectId, ref: "Student", required: true },
    teacher_id: { type: Schema.Types.ObjectId, ref: "User", required: true },

    type: {
      type: String,
      enum: ["MEAL", "NAP", "HYGIENE", "LEARNING", "PHOTO", "NOTE"],
      required: true,
    },
    date: { type: Date, default: Date.now },

    data: {
      food_item: String,
      quantity: { type: String, enum: ["ALL", "HALF", "NONE", "EXTRA"] },
      
      start_time: String,
      duration: Number,
      quality: { type: String, enum: ["GOOD", "RESTLESS", "REFUSED"] },
      
      subtype: { type: String, enum: ["DIAPER", "POTTY", "HANDWASH"] },
      
      title: String,
      description: String,
      media_urls: [String],
    },
  },
  { timestamps: true }
);

// Index for Parent Feed (Find my child's logs, sorted by date)
ActivitySchema.index({ student_id: 1, date: -1 });

export default mongoose.model<IActivity>("Activity", ActivitySchema);
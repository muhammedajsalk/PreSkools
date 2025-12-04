import mongoose, { Schema, Document } from "mongoose";

export interface IAttendanceRecord {
  student_id: mongoose.Types.ObjectId;
  status: "PRESENT" | "ABSENT" | "LATE" | "EXCUSED";
  remark?: string;
}

export interface IAttendance extends Document {
  school_id: mongoose.Types.ObjectId;
  class_id: mongoose.Types.ObjectId;
  date: Date;
  recorded_by: mongoose.Types.ObjectId; 
  records: IAttendanceRecord[];
}

const AttendanceSchema = new Schema<IAttendance>(
  {
    school_id: { type: Schema.Types.ObjectId, ref: "School", required: true },
    class_id: { type: Schema.Types.ObjectId, ref: "Class", required: true },
    date: { type: Date, required: true },
    recorded_by: { type: Schema.Types.ObjectId, ref: "User", required: true },
    
    records: [
      {
        student_id: { type: Schema.Types.ObjectId, ref: "Student", required: true },
        status: { 
          type: String, 
          enum: ["PRESENT", "ABSENT", "LATE", "EXCUSED"], 
          default: "PRESENT" 
        },
        remark: { type: String }
      }
    ]
  },
  { timestamps: true }
);

// Ensure only one attendance record exists per class per day
AttendanceSchema.index({ class_id: 1, date: 1 }, { unique: true });

export default mongoose.model<IAttendance>("Attendance", AttendanceSchema);
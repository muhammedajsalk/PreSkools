import mongoose from "mongoose";
import dotenv from "dotenv";
import Attendance from "../modules/attendance/model/attendance.model";
import { StudentModel } from "../modules/academic/model/student.model";
import { ClassModel } from "../modules/academic/model/class.model";
import User from "../modules/auth/model/user.model";
import School from "../modules/school/model/school.model";

dotenv.config();

const seedAttendance = async () => {
  try {
    if (!process.env.MONGO_URI) throw new Error("MONGO_URI missing");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("🌱 Connected to MongoDB...");

    // 1. CLEANUP OLD ATTENDANCE
    console.log("🧹 Clearing old attendance records...");
    await Attendance.deleteMany({});

    // 2. GET CONTEXT (School, Class, Teacher)
    const school = await School.findOne();
    if (!school) throw new Error("No School found. Run seed:smart first.");

    // Find a class that actually has a teacher
    const classObj = await ClassModel.findOne({ school_id: school._id, teacher_id: { $ne: null } });
    if (!classObj) throw new Error("No Class with a Teacher found.");

    const teacher = await User.findById(classObj.teacher_id);
    if (!teacher) throw new Error("Teacher not found.");

    // 3. GET STUDENTS
    const students = await StudentModel.find({ class_id: classObj._id });
    if (students.length === 0) throw new Error("No students in this class. Run seed:students first.");

    console.log(`\n🏫 Generating Attendance for: ${school.name}`);
    console.log(`📚 Class: ${classObj.name}-${classObj.section}`);
    console.log(`👩‍🏫 Teacher: ${teacher.name}`);
    console.log(`👶 Students: ${students.length}`);
    console.log("---------------------------------------------------");

    // 4. GENERATE 60 DAYS OF DATA
    const today = new Date();
    const attendanceBatch = [];

    for (let i = 60; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      date.setHours(0, 0, 0, 0);
      
      const dayOfWeek = date.getDay();

      // ✅ SKIP WEEKENDS (0 = Sunday, 6 = Saturday)
      if (dayOfWeek === 0 || dayOfWeek === 6) continue;

      // Generate Records for this day
      const records = students.map((student) => {
        const rand = Math.random();
        let status: "PRESENT" | "ABSENT" | "LATE" = "PRESENT";

        // Realistic randomness:
        if (rand > 0.92) status = "ABSENT"; // 8% chance
        else if (rand > 0.85) status = "LATE";   // 7% chance

        // Make one specific student chronically late/absent for testing charts
        if (student.name.includes("Student 1") && Math.random() > 0.6) status = "LATE";

        return {
          student_id: student._id,
          status,
          remark: status === "ABSENT" ? "Sick leave" : ""
        };
      });

      attendanceBatch.push({
        school_id: school._id,
        class_id: classObj._id,
        date: date,
        recorded_by: teacher._id,
        records: records
      });
    }

    // 5. INSERT ALL
    await Attendance.insertMany(attendanceBatch);
    console.log(`✅ Successfully inserted ${attendanceBatch.length} days of attendance (Mon-Fri only)!`);
    
    process.exit(0);

  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
};

seedAttendance();
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../modules/auth/model/user.model";
import School from "../modules/school/model/school.model";
import { ClassModel } from "../modules/academic/model/class.model";
import { StudentModel } from "../modules/academic/model/student.model";

// Load environment variables
dotenv.config();

const resetDatabase = async () => {
  try {
    // 1. Connect
    if (!process.env.MONGO_URI) throw new Error("MONGO_URI missing");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("🌱 Connected to MongoDB...");

    // =================================================================
    // 2. DELETE EVERYTHING (Except System Admin)
    // =================================================================
    console.log("🧹 Starting cleanup...");

    // A. Delete all non-user data completely
    const schoolResult = await School.deleteMany({});
    console.log(`   - Deleted ${schoolResult.deletedCount} Schools`);

    const classResult = await ClassModel.deleteMany({});
    console.log(`   - Deleted ${classResult.deletedCount} Classes`);
    
    const studentResult = await StudentModel.deleteMany({});
    console.log(`   - Deleted ${studentResult.deletedCount} Students`);

    // B. Delete Users EXCEPT the Super Admin
    // This query says: "Delete everyone whose role is NOT 'SUPER_ADMIN'"
    const userResult = await User.deleteMany({ 
      role: { $ne: "SUPER_ADMIN" } 
    });
    console.log(`   - Deleted ${userResult.deletedCount} Users (Teachers/Parents/Principals)`);

    // =================================================================
    // 3. VERIFY
    // =================================================================
    const admin = await User.findOne({ role: "SUPER_ADMIN" });
    if (admin) {
      console.log("\n✅ Cleanup Complete!");
      console.log("👑 System Admin Preserved:");
      console.log(`   Name: ${admin.name}`);
      console.log(`   Phone: ${admin.phone}`);
    } else {
      console.warn("\n⚠️ Warning: No System Admin found. You may need to run the full seed script.");
    }

    process.exit(0);

  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
};

resetDatabase();
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../modules/auth/model/user.model";
import School from "../modules/school/model/school.model";
import { ClassModel } from "../modules/academic/model/class.model";
import { StudentModel } from "../modules/academic/model/student.model";

// Load environment variables
dotenv.config();

const seedDatabase = async () => {
  try {
    // 1. Connect
    if (!process.env.MONGO_URI) throw new Error("MONGO_URI missing");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("🌱 Connected to MongoDB...");

    // =================================================================
    // 2. NUCLEAR CLEANUP (Fixes the Duplicate Key Error)
    // =================================================================
    console.log("💣 Dropping collections to clear old indexes...");
    
    // We use .collection.drop() instead of .deleteMany() to wipe indexes too
    try { await User.collection.drop(); } catch (e) { /* Ignore if doesn't exist */ }
    try { await School.collection.drop(); } catch (e) { }
    try { await ClassModel.collection.drop(); } catch (e) { }
    try { await StudentModel.collection.drop(); } catch (e) { }

    // Wait 1 second for MongoDB to process the drops
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("✅ Cleanup Complete. Starting Seed...");

    // =================================================================
    // 3. SYSTEM ADMIN (The Only Active User Initially)
    // =================================================================
    console.log("👑 Creating System Admin...");
    await User.create({
      name: "System Admin (Ajsal)",
      phone: "+919999999999",
      role: "SUPER_ADMIN",
      // REAL CREDENTIALS FOR LOGIN
      firebase_uid: "TTDSREeDGOcfquoHqc7etAuJudw1", 
      password: "Ajsal@123",
      isActive: true,
    });

    // =================================================================
    // 4. GENERATE 2 SCHOOLS (Loop)
    // =================================================================
    const schoolsData = [
      { name: "Little Buds Academy", location: "Kochi, Kerala" },
      { name: "Green Valley Int.", location: "Trivandrum, Kerala" }
    ];

    for (let i = 0; i < schoolsData.length; i++) {
      const sData = schoolsData[i];
      const schoolIndex = i + 1;

      console.log(`\n🏫 [School ${schoolIndex}] Setup: ${sData.name}...`);

      // A. Create School Admin (Placeholder - No UID)
      // They will claim this account later using OTP
      const principal = await User.create({
        name: `Principal ${sData.name.split(" ")[0]}`,
        phone: `+91888888880${schoolIndex}`, 
        role: "SCHOOL_ADMIN",
        firebase_uid: undefined, // Allows multiple undefineds now
        password: "Principal@123", // Optional password
        isActive: false, 
      });

      // B. Create School
      const school = await School.create({
        name: sData.name,
        address: sData.location,
        phone: `+91484100000${schoolIndex}`,
        email: `admin@school${schoolIndex}.com`,
        subscription_plan: i === 0 ? "BLOOM" : "SPROUT",
        admin_id: principal._id,
      });

      // Link Principal back to School
      principal.school_id = school._id as any;
      await principal.save();

      // C. Create 2 Teachers
      const teachers = [];
      for (let t = 1; t <= 2; t++) {
        const teacher = await User.create({
          name: `Teacher ${t} (${sData.name})`,
          phone: `+9177777${schoolIndex}0${t}`, 
          role: "TEACHER",
          firebase_uid: undefined, // No UID
          school_id: school._id,
          isActive: false,
        });
        teachers.push(teacher);
      }
      console.log(`   - Created 2 Teachers`);

      // D. Create Classes
      const classes = [];
      const classNames = ["LKG-A", "UKG-A"];
      for (let c = 0; c < 2; c++) {
        const newClass = await ClassModel.create({
          name: classNames[c].split("-")[0],
          section: "A",
          school_id: school._id,
          teacher_id: teachers[c]._id,
        });
        classes.push(newClass);
      }

      // E. Create 10 Students per School
      console.log(`   - Creating 10 Students & Parents...`);
      
      for (let s = 1; s <= 10; s++) {
        // Assign to LKG (0-4) or UKG (5-9)
        const assignedClass = s <= 5 ? classes[0] : classes[1];
        const padId = String(s).padStart(2, '0'); // 01, 02...

        // Create Father
        const father = await User.create({
          name: `Father of ${s}`,
          phone: `+91666${schoolIndex}000${padId}`, 
          role: "PARENT",
          firebase_uid: undefined,
          school_id: school._id,
          isActive: false,
        });

        // Create Mother
        const mother = await User.create({
          name: `Mother of ${s}`,
          phone: `+91555${schoolIndex}000${padId}`,
          role: "PARENT",
          firebase_uid: undefined,
          school_id: school._id,
          isActive: false,
        });

        // Create Student
        await StudentModel.create({
          name: `Student ${s} (${sData.name})`,
          admission_no: `ADM-${schoolIndex}-${202400 + s}`,
          dob: new Date("2019-01-01"),
          gender: s % 2 === 0 ? "Female" : "Male",
          parent_name: father.name,
          parent_phone: father.phone,
          class_id: assignedClass._id,
          school_id: school._id,
          parent_ids: [father._id, mother._id],
          status: "ACTIVE",
        });
      }
    }

    console.log("\n✅ Database Seeded Successfully!");
    console.log("---------------------------------------------------");
    console.log("🔑 SYSTEM ADMIN LOGIN:");
    console.log("   Phone: +919999999999");
    console.log("   Pass:  Ajsal@123");
    console.log("---------------------------------------------------");
    console.log("⚠️  Other users (Principals, Teachers, Parents) are");
    console.log("    created as 'Placeholders' with NO Firebase UID.");
    console.log("    They must Login via OTP to claim their accounts.");
    console.log("---------------------------------------------------");

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding Failed:", error);
    process.exit(1);
  }
};

seedDatabase();
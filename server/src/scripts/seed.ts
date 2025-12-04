import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../modules/auth/model/user.model";
import School from "../modules/school/model/school.model";
import { ClassModel } from "../modules/academic/model/class.model";
import { StudentModel } from "../modules/academic/model/student.model";

dotenv.config();

const seedStudents = async () => {
  try {
    if (!process.env.MONGO_URI) throw new Error("MONGO_URI missing");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("🌱 Connected to MongoDB...");

    // 1. FIND EXISTING SCHOOL
    // We take the first school we find in your database
    const school = await School.findOne();
    if (!school) {
      console.error("❌ No School found! Please create a school first.");
      process.exit(1);
    }
    console.log(`\n🏫 Found School: ${school.name}`);

    // 2. FIND EXISTING TEACHER
    // We take the first teacher linked to this school
    const teacher = await User.findOne({ role: "TEACHER", school_id: school._id });
    if (!teacher) {
      console.error("❌ No Teacher found! Please create a teacher first.");
      process.exit(1);
    }
    console.log(`👩‍🏫 Found Teacher: ${teacher.name}`);

    // 3. ENSURE CLASS EXISTS (LKG-A)
    // We need a class to put the students in
    let classObj = await ClassModel.findOne({ 
      name: "LKG", 
      section: "A", 
      school_id: school._id 
    });

    if (!classObj) {
      console.log("📦 Creating Class 'LKG-A'...");
      classObj = await ClassModel.create({
        name: "LKG",
        section: "A",
        school_id: school._id,
        teacher_id: teacher._id,
        isActive: true
      });
    } else {
      console.log(`📦 Found Class: ${classObj.name}-${classObj.section}`);
    }

    // 4. CREATE 10 STUDENTS + PARENTS
    console.log("\n🚀 Creating 10 Students & Parents...");

    const studentsData = [
      { name: "Aarav Patel", gender: "Male", blood: "O+" },
      { name: "Vihaan Singh", gender: "Male", blood: "B+" },
      { name: "Diya Sharma", gender: "Female", blood: "A+" },
      { name: "Ananya Gupta", gender: "Female", blood: "O-" },
      { name: "Ishaan Kumar", gender: "Male", blood: "AB+" },
      { name: "Saanvi Reddy", gender: "Female", blood: "B-" },
      { name: "Reyansh Malhotra", gender: "Male", blood: "A+" },
      { name: "Myra Kapoor", gender: "Female", blood: "O+" },
      { name: "Kabir Joshi", gender: "Male", blood: "B+" },
      { name: "Zara Khan", gender: "Female", blood: "AB-" }
    ];

    for (let i = 0; i < studentsData.length; i++) {
      const sData = studentsData[i];
      const uniqueSuffix = Date.now().toString().slice(-4) + i; // Randomizes phone numbers

      // A. Create Father User (Placeholder)
      const father = await User.create({
        name: `Mr. ${sData.name.split(" ")[1]}`, // e.g. "Mr. Patel"
        phone: `+9198${uniqueSuffix}001`, // Unique Phone
        email: `parent.${i + 1}@test.com`,
        role: "PARENT",
        school_id: school._id,
        firebase_uid: undefined, // Will claim later
        isActive: false,
      });

      // B. Create Mother User (Placeholder)
      const mother = await User.create({
        name: `Mrs. ${sData.name.split(" ")[1]}`,
        phone: `+9198${uniqueSuffix}002`,
        role: "PARENT",
        school_id: school._id,
        isActive: false,
      });

      // C. Create Student
      await StudentModel.create({
        name: sData.name,
        admission_no: `ADM-${202400 + i + 1}`,
        dob: new Date("2019-06-15"),
        gender: sData.gender,
        
        // Primary Contact
        parent_name: father.name,
        parent_phone: father.phone,
        parent_email: father.email,
        parent_ids: [father._id, mother._id],

        // Detailed Info
        parents: {
          father: { name: father.name, phone: father.phone, email: father.email, occupation: "Business" },
          mother: { name: mother.name, phone: mother.phone, occupation: "Homemaker" }
        },

        address: {
          street: `${i + 10} Green Park Avenue`,
          city: "Mumbai",
          state: "Maharashtra",
          zip_code: "400001"
        },

        medical_info: {
          blood_group: sData.blood,
          allergies: [],
          conditions: []
        },

        // Links
        class_id: classObj._id,
        school_id: school._id,
        status: "ACTIVE"
      });

      console.log(`   ✅ Created: ${sData.name}`);
    }

    console.log("\n✨ Successfully added 10 students!");
    process.exit(0);

  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
};

seedStudents();
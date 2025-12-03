import School from "../model/school.model";
import User from "../../auth/model/user.model";
import { AppError } from "../../../utils/AppError";
import mongoose, { SortOrder } from "mongoose";

interface SchoolQueryParams {
  page: number;
  limit: number;
  search?: string;
  plan?: string;
  status?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}


interface CreateSchoolPayload {
  name: string;
  address: string;
  phone: string;
  email: string;
  admin_phone: string;
  plan?: "SEED" | "SPROUT" | "BLOOM";
}

export const createSchoolService = async (payload: CreateSchoolPayload) => {

  const { name, address, phone, email, admin_phone, plan } = payload;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const schoolAdminUser = await User.findOne({ phone: admin_phone, role: "SCHOOL_ADMIN" });

    if (schoolAdminUser) {
      throw new AppError("This user is already an admin of another school.", 400);
    }

    const password = email.split("@")[0];

    const newAdmin = await User.create({
      name: `${name} admin`,
      phone: `+91${admin_phone}`,
      role: "SCHOOL_ADMIN",
      password: `${password}@123`
    })

    const school = await School.create({
      name,
      address,
      phone:`+91${phone}`,
      email,
      admin_id: newAdmin._id,
      subscription_plan: plan || "SEED",
    });

    newAdmin.school_id = school._id as mongoose.Types.ObjectId; 
    newAdmin.role = "SCHOOL_ADMIN";
    await newAdmin.save();

    return school;

  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }

};

export const getMySchoolService = async (schoolId: string) => {
  const school = await School.findById(schoolId);
  if (!school) throw new AppError("School not found", 404);
  return school;
};

export const getAllSchoolsService = async ({
  page,
  limit,
  search,
  plan,
  status,
  sortBy,
  sortOrder,
}: SchoolQueryParams) => {
  const skip = (page - 1) * limit;
  const query: any = {};

  if (search) {
    query.$or = [
      { name: new RegExp(search, "i") },
      { email: new RegExp(search, "i") },
      { phone: new RegExp(search, "i") },
    ];
  }

  if (plan) query.subscription_plan = plan;
  if (status) query.subscription_status = status;

  const sortOption: Record<string, SortOrder> = { [sortBy || "createdAt"]: sortOrder === "asc" ? 1 : -1 };

  const [schools, total] = await Promise.all([
    School.find(query).populate("admin_id", "name phone email").skip(skip).limit(limit).sort(sortOption).lean(),
    School.countDocuments(query),
  ]);

  return {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    schools,
  };
};

export const getSchoolByIdService = async (id: string) => {
  const school = await School.findById(id).populate("admin_id", "name email");
  if (!school) throw new AppError("School not found", 404);
  return school;
};

export const updateSchoolService = async (id: string, data: Partial<CreateSchoolPayload>) => {
  const updated = await School.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  if (!updated) throw new AppError("School not found", 404);
  return updated;
};

export const deleteSchoolService = async (id: string) => {
  const deleted = await School.findByIdAndDelete(id);
  if (!deleted) throw new AppError("School not found", 404);
  return deleted;
};
import Joi from "joi";

// --- Reusable Nested Schemas ---

const medicalInfoSchema = Joi.object({
  allergies: Joi.array().items(Joi.string()).default([]),
  conditions: Joi.array().items(Joi.string()).default([]),
  blood_group: Joi.string().allow("").optional(),
  doctor_name: Joi.string().allow("").optional(),
  doctor_phone: Joi.string().allow("").optional(),
});

const transportSchema = Joi.object({
  mode: Joi.string().valid("BUS", "PRIVATE", "WALK").default("PRIVATE"),
  route_name: Joi.string().allow("").optional(),
  pickup_point: Joi.string().allow("").optional(),
});

const documentSchema = Joi.object({
  title: Joi.string().required(),
  doc_url: Joi.string().required(),
  uploaded_at: Joi.date().optional(),
});

// Address is now an object
const addressSchema = Joi.object({
  street: Joi.string().allow("").optional(),
  city: Joi.string().allow("").optional(),
  state: Joi.string().allow("").optional(),
  zip_code: Joi.string().allow("").optional(),
});

// Specific schema for Father/Mother details
const parentDetailSchema = Joi.object({
  name: Joi.string().allow("").optional(), // ✅ Allow empty
  phone: Joi.string().pattern(/^[0-9]{10,13}$/).allow("").optional(), // ✅ Allow empty string
  email: Joi.string().email().allow("").optional(),
  occupation: Joi.string().allow("").optional(),
});

// Specific schema for Guardian (optional fields)
const guardianDetailSchema = Joi.object({
  name: Joi.string().allow("").optional(),
  phone: Joi.string().pattern(/^[0-9]{10,13}$/).allow("").optional(),
  relation: Joi.string().allow("").optional(),
});

// Grouping them into the 'parents' object
const parentsSchema = Joi.object({
  father: parentDetailSchema.optional(),
  mother: parentDetailSchema.optional(),
  guardian: guardianDetailSchema.optional(),
});

// --- CREATE SCHEMA ---
export const createStudentSchema = Joi.object({
  name: Joi.string().required(),
  admission_no: Joi.string().required(),
  dob: Joi.date().required(),
  gender: Joi.string().valid("Male", "Female", "Other").required(),
  
  // ✅ ADDED: Flat fields (Required by Mongoose Model)
  parent_name: Joi.string().required(),
  parent_phone: Joi.string().pattern(/^[0-9]{10,13}$/).required(),
  parent_email: Joi.string().email().allow("").optional(),
  
  // Nested Parents Object
  parents: parentsSchema.required(),
  
  class_id: Joi.string().required(),
  
  // Nested Address
  address: addressSchema.optional(),
  
  avatar: Joi.string().allow("").optional(),
  roll_no: Joi.string().allow("").optional(),

  // Nested Objects
  medical_info: medicalInfoSchema.optional(),
  transport: transportSchema.optional(),
  documents: Joi.array().items(documentSchema).optional(),
});

// --- UPDATE SCHEMA ---
export const updateStudentSchema = Joi.object({
  name: Joi.string(),
  class_id: Joi.string(),
  status: Joi.string().valid("ACTIVE", "ALUMNI", "DROPPED"),
  
  // Allow updating flat parent fields if needed
  parent_name: Joi.string(),
  parent_phone: Joi.string().pattern(/^[0-9]{10,13}$/),
  parent_email: Joi.string().email().allow(""),

  avatar: Joi.string(),
  roll_no: Joi.string(),

  // Allow partial updates to parents
  parents: Joi.object({
      father: parentDetailSchema.optional(),
      mother: parentDetailSchema.optional(),
      guardian: guardianDetailSchema.optional(),
  }),

  address: addressSchema,
  medical_info: medicalInfoSchema,
  transport: transportSchema,
  documents: Joi.array().items(documentSchema),

}).min(1); // Require at least one field to update
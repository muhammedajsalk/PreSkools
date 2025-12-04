import { Request, Response, NextFunction } from "express";
import cloudinary from "../../../config/cloudinary";
import { AppError } from "../../../utils/AppError";
import fs from "fs";

export const uploadImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      return next(new AppError("No file uploaded", 400));
    }

    // 1. Get Class Info from Body (Frontend must send this in FormData)
    // Default to "general" if not provided
    const className = req.body.className || "general";
    const section = req.body.section || "";

    // 2. Create a clean folder name (e.g., "LKG-A")
    // Removes spaces and special characters to prevent URL issues
    const safeFolderName = `${className}${section ? `-${section}` : ""}`
      .replace(/[^a-zA-Z0-9-_]/g, "") // Remove weird chars
      .toUpperCase();

    // 3. Upload to Dynamic Folder
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: `kinderconnect/activities/${safeFolderName}`, // <--- DYNAMIC FOLDER
      use_filename: true,
      unique_filename: true,
    });

    // Cleanup local file
    if (fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(200).json({
      success: true,
      url: result.secure_url,
      public_id: result.public_id
    });

  } catch (error) {
    // Cleanup if error occurs
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    next(error);
  }
};
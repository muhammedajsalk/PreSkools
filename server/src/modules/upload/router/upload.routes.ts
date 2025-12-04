import { Router } from "express";
import multer from "multer";
import { uploadImage } from "../controller/upload.controller";
import { protect } from "../../../middleware/auth";

// Setup local temporary storage
const upload = multer({ dest: "uploads/" }); 

const router = Router();

router.post("/", protect, upload.single("file"), uploadImage);

export default router;
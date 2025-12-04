import { Router } from "express";
import { getMe, login } from "../controller/auth.controller";

const router = Router();

import { protect} from "../../../middleware/auth";


router.post("/login", login);

router.get("/me",protect,getMe)

export default router;
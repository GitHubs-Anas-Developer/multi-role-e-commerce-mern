import express from "express";
import { adminAuthLoginController,adminAuthRegisterController ,adminProfile} from "../controller/auth.controller.js";
import { verifyAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

adminAuthRegisterController()
router.post("/auth/login", adminAuthLoginController);
router.get("/auth/profile",verifyAdmin,adminProfile)

export default router;

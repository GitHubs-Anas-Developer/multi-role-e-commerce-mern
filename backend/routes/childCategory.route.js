import express from "express";
import upload from "../middleware/multer.js";
import { verifyAdmin } from "../middleware/auth.middleware.js";
import { createChildCategory, fetchChildCategories } from "../controller/childCategory.controller.js";

const router = express.Router();

router.post("/create", verifyAdmin, upload.single("image"), createChildCategory);
router.get("/all", verifyAdmin, fetchChildCategories);

export default router;

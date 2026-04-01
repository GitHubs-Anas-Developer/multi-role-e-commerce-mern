import express from "express";
import upload from "../middleware/multer.js";
import { verifyAdmin } from "../middleware/auth.middleware.js";
import { createChildCategory, deleteChildCategory, fetchChildCategories, fetchChildCategoriesBySubCategory, filterStatus, getOneChildCategory, searchChildCategory, updateChildCategory } from "../controller/childCategory.controller.js";

const router = express.Router();

router.post("/create", verifyAdmin, upload.single("image"), createChildCategory);
router.get("/", verifyAdmin, fetchChildCategories);
router.get("/one/:id", verifyAdmin, getOneChildCategory);
router.put("/update/:id", verifyAdmin,upload.single("image"), updateChildCategory);
router.delete("/delete/:id", verifyAdmin, deleteChildCategory);
router.get("/search", verifyAdmin, searchChildCategory);
router.get("/filter/status", verifyAdmin, filterStatus);
router.get("/by-subcategory/:id", verifyAdmin, fetchChildCategoriesBySubCategory);

export default router;

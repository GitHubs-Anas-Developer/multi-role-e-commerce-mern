import express from "express";
import upload from "../middleware/multer.js";
import { verifyAdmin } from "../middleware/auth.middleware.js";
import {
  createSubCategory,
  deleteSubCategory,
  fetchSubcategories,
  fetchSubCategoriesByCategory,
  getOneSubCategory,
  updateSubCategory,
} from "../controller/subCategory.controller.js.js";

const router = express.Router();

router.post("/create", verifyAdmin, upload.single("image"), createSubCategory);
router.get("/all", verifyAdmin, fetchSubcategories);
router.get("/one/:id", verifyAdmin, getOneSubCategory);
router.put("/update/:id", verifyAdmin,upload.single("image"), updateSubCategory);
router.delete("/delete/:id", verifyAdmin, deleteSubCategory);
router.get("/by-category/:id", verifyAdmin, fetchSubCategoriesByCategory);



export default router;

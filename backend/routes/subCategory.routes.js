import express from "express";
import upload from "../middleware/multer.js";
import { verifyAdmin } from "../middleware/auth.middleware.js";
import {
  createSubCategory,
  deleteSubCategory,
  fetchSubcategories,
  fetchSubCategoriesByCategory,
  filterSubcategoryStatus,
  getOneSubCategory,
  searchSubCategory,
  updateSubCategory,
} from "../controller/subCategory.controller.js.js";

const router = express.Router();

router.post("/create", verifyAdmin, upload.single("image"), createSubCategory);
router.get("/", verifyAdmin, fetchSubcategories);
router.get("/one/:id", verifyAdmin, getOneSubCategory);
router.put(
  "/update/:id",
  verifyAdmin,
  upload.single("image"),
  updateSubCategory,
);
router.delete("/delete/:id", verifyAdmin, deleteSubCategory);
router.get("/by-category/:id", verifyAdmin, fetchSubCategoriesByCategory);
router.get("/search", verifyAdmin, searchSubCategory);
router.get("/filter/status", verifyAdmin, filterSubcategoryStatus);

export default router;

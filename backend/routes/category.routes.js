import express from "express";
import upload from "../middleware/multer.js";
import {
  createCategory,
  deleteCategory,
  filterStatus,
  getAllCategories,
  getOneCategory,
  searchCategory,
  updateCategory,
} from "../controller/category.controller.js";
import { verifyAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create", verifyAdmin, upload.single("image"), createCategory);
router.get("/", verifyAdmin, getAllCategories);
router.get("/one/:id", verifyAdmin, getOneCategory);
router.put("/update/:id", verifyAdmin, upload.single("image"), updateCategory);
router.delete("/delete/:id", verifyAdmin, deleteCategory);
router.get("/search", verifyAdmin, searchCategory);
router.get("/filter/status", verifyAdmin, filterStatus);



export default router;

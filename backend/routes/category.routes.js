import express from "express";
import upload from "../middleware/multer.js";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getOneCategory,
  updateCategory,
} from "../controller/category.controller.js";
import { verifyAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create", verifyAdmin, upload.single("image"), createCategory);
router.get("/all", verifyAdmin, getAllCategories);
router.get("/one/:id", verifyAdmin, getOneCategory);
router.put("/update/:id", verifyAdmin, upload.single("image"), updateCategory);
router.delete("/delete/:id", verifyAdmin, deleteCategory);

export default router;

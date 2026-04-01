import express from "express";
import upload from "../middleware/multer.js";
import { verifyAdmin } from "../middleware/auth.middleware.js";
import { createProduct, deleteProduct, getAllProducts} from "../controller/product.controller.js";
const router = express.Router();

router.post(
  "/create",
  verifyAdmin,
  upload.any(),
  createProduct,
);
router.get("/", verifyAdmin, getAllProducts);
router.delete("/delete/:id", verifyAdmin, deleteProduct);

export default router;

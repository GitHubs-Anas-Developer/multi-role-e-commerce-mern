import dotenv from "dotenv";
import express from "express";
import dbConnect from "./config/db.config.js";
import adminAuthRoutes from "./routes/auth.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import subCategoryRoutes from "./routes/subCategory.routes.js";
import childCategoryRoutes from "./routes/childCategory.route.js";

import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();

const app = express();

const allowedOrigins = ["http://localhost:3000"];

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use("/api/admin", adminAuthRoutes);
app.use("/api/admin/category", categoryRoutes);
app.use("/api/admin/sub-category", subCategoryRoutes);
app.use("/api/admin/child-category", childCategoryRoutes);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  dbConnect();
  console.log(`server is running ${PORT}`);
});

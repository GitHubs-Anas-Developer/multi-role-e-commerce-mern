import adminModel from "../models/admin.models.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { generateToken } from "../utils/generateToken.js";
dotenv.config();

export const adminAuthRegisterController = async () => {
  const fullName = process.env.ADMIN_FULL_NAME;
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const existingAdmin = await adminModel.findOne({ email });

  if (!fullName || !email || !password)
    return console.log("All fields are mandatory");
  if (existingAdmin) return console.log("Admin already exists");

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const createAdmin = await adminModel.create({
    fullName,
    email,
    password: hashPassword,
  });
};

export const adminAuthLoginController = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    if (!email || !password)
      return res.status(400).json({
        success: false,
        message: "All fields are mandatory",
      });

    const admin = await adminModel.findOne({ email });
    if (!admin)
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res.status(400).json({
        success: false,
        message: "invalid password",
      });

    const token = generateToken(res, admin._id);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const adminProfile = async (req, res) => {
  try {
    const adminId = req.admin;
    if (!adminId)
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });

    const admin = await adminModel.findById(adminId).select("-password");
    if (!admin)
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    res.status(200).json({
      success: true,
      admin,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

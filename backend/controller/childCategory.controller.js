import cloudinary from "../config/cloudinary.config.js";
import childCategoryModel from "../models/childCategory.model.js";

export const createChildCategory = async (req, res) => {
  try {
    const { name, description, parentCategory, subCategory } = req.body;

    if (!name || !description || !parentCategory || !subCategory) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "childCategory" }, (error, result) => {
          if (error) reject(error);
          resolve(result);
        })
        .end(req.file.buffer);
    });

    const childCategory = await childCategoryModel.create({
      name,
      description,
      parentCategory,
      subCategory,
      image: {
        url: result.secure_url,
        public_id: result.public_id,
      },
    });

    res.status(201).json({
      success: true,
      message: "Child category created successfully",
      childCategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const fetchChildCategories = async (req, res) => {
  try {
    const childCategories = await childCategoryModel
      .find()
      .sort({
        createdAt: -1,
      })
      .populate("parentCategory", "name")
      .populate("subCategory", "name")

    console.log("childCategories", childCategories);

    if (childCategories.length == 0)
      return res.status(404).json({
        success: false,
        message: "No child categories found",
      });

    res.status(200).json({
      success: true,
      message: "Child category fetched successfully",
      childCategories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

import cloudinary from "../config/cloudinary.config.js";
import categoryModel from "../models/category.models.js";

// Create a new category
export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res
        .status(400)
        .json({ message: "name and description is required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "category" }, (error, result) => {
          if (error) reject(error);
          resolve(result);
        })
        .end(req.file.buffer);
    });

    const category = await categoryModel.create({
      name,
      description,
      image: {
        url: result.secure_url,
        public_id: result.public_id,
      },
    });

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    console.error("Create category error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Get all categories
export const getAllCategories = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 1;
    const skip = (page - 1) * limit;

    const categories = await categoryModel
      .find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    if (categories.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No categories found",
      });
    }

    const totalCategory = await categoryModel.countDocuments();

    const activeCategoryCount = await categoryModel.countDocuments({
      isActive: true,
    });

    const inactiveCategoryCount = await categoryModel.countDocuments({
      isActive: false,
    });

    res.status(200).json({
      success: true,
      message: "Categories fetched successfully",
      data: {
        page,
        totalPages: Math.ceil(totalCategory / limit),
        categories,
        totalCategory,
        activeCategoryCount,
        inactiveCategoryCount,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Update category

export const updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;

    if (!categoryId) {
      return res.status(400).json({
        success: false,
        message: "Category ID is required",
      });
    }

    const { name, description, isActive } = req.body;
    const updateData = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (typeof isActive === "boolean") updateData.isActive = isActive;

    // 🔹 If image is provided
    if (req.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "categories" }, (error, result) => {
            if (error) return reject(error);
            resolve(result);
          })
          .end(req.file.buffer);
      });

      updateData.image = {
        public_id: uploadResult.public_id,
        url: uploadResult.secure_url,
      };
    }

    const updatedCategory = await categoryModel.findByIdAndUpdate(
      categoryId,
      updateData,
      { new: true },
    );

    if (!updatedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      updatedCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;

    if (!categoryId)
      return res.status(400).json({
        success: false,
        message: "Category ID is required",
      });

    const category = await categoryModel.findById(categoryId);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    if (category.image && category.image.public_id) {
      await cloudinary.uploader.destroy(category.image.public_id);
    }

    const deletedCategory = await categoryModel.findByIdAndDelete(categoryId);

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
      deletedCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const getOneCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;

    if (!categoryId) {
      return res.status(400).json({
        success: false,
        message: "Category ID is required",
      });
    }

    const category = await categoryModel.findById(categoryId);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Category fetched successfully",
      category,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
export const searchCategory = async (req, res) => {
  try {
    const { keyword } = req.query;

    const query = { name: { $regex: keyword, $options: "i" } };

    const categories = await categoryModel.find(query).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const filterStatus = async (req, res) => {
  try {
    const { status } = req.query;
    let statusValue;

    if (status === "active") statusValue = true;
    if (status === "inactive") statusValue = false;

    const query = { isActive: statusValue };

    const statusCategories = await categoryModel.find(query).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      statusCategories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

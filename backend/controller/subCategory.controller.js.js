import cloudinary from "../config/cloudinary.config.js";
import SubCategory from "../models/subCategory.model.js";
import categoryModel from "../models/category.models.js";

export const createSubCategory = async (req, res) => {
  try {
    const { name, description, parentCategory } = req.body;

    if (!name || !description || !parentCategory) {
      return res.status(400).json({
        message: "name, description, and parentCategory are required",
      });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    // Upload image to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "subCategory" },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
      stream.end(req.file.buffer);
    });

    // Create sub-category
    const subCategory = await SubCategory.create({
      name,
      description,
      image: {
        url: result.secure_url,
        public_id: result.public_id,
      },
      parentCategory,
    });

    res.status(201).json({
      success: true,
      message: "Sub-category created successfully",
      subCategory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const fetchSubcategories = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;

    const skip = (page - 1) * limit;

    const subCategories = await SubCategory.find()
      .skip(skip)
      .limit(limit)
      .sort({
        createdAt: -1,
      })
      .populate("parentCategory", "name");

    const totalSubCategory = await SubCategory.countDocuments();

    const activeSubCategoryCount = await SubCategory.countDocuments({
      isActive: true,
    });

    const inactiveSubCategoryCount = await SubCategory.countDocuments({
      isActive: false,
    });

    if (subCategories.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Subcategories not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Categories fetched successfully",
      data: {
        page,
        subCategories,
        totalPages: Math.ceil(totalSubCategory / limit),
        totalSubCategory,
        activeSubCategoryCount,
        inactiveSubCategoryCount,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server not found",
      error: error.message,
    });
  }
};

export const getOneSubCategory = async (req, res) => {
  try {
    const subCategoryId = req.params.id;
    if (!subCategoryId) {
      return res.status(400).json({
        success: false,
        message: "subCategory ID is required",
      });
    }
    const subcategory =
      await SubCategory.findById(subCategoryId).populate("parentCategory");

    const otherCategories = await categoryModel
      .find({ _id: { $ne: subcategory.parentCategory._id } })
      .select("name");

    if (!subcategory) {
      return res.status(404).json({
        success: false,
        message: "SubCategory not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "SubCategory fetched successfully",
      data: { subcategory, otherCategories },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server not found",
      error: error.message,
    });
  }
};

export const updateSubCategory = async (req, res) => {
  try {
    const subCategoryId = req.params.id;
    if (!subCategoryId) {
      return res.status(400).json({
        success: false,
        message: "subCategory ID is required",
      });
    }

    const { parentCategory, SubCategoryName, description, isActive } = req.body;

    const updateData = {};
    if (SubCategoryName) updateData.name = SubCategoryName;
    if (description) updateData.description = description;
    if (parentCategory) updateData.parentCategory = parentCategory;
    if (typeof isActive === "boolean") updateData.isActive = isActive;

    // 🔹 If image is provided
    if (req.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "subCategory" }, (error, result) => {
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
    const updateSubCategory = await SubCategory.findByIdAndUpdate(
      subCategoryId,
      updateData,
      { new: true },
    ).populate("parentCategory");

    if (!updateSubCategory) {
      return res.status(404).json({
        success: false,
        message: "subCategory not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "subCategory updated successfully",
      updateSubCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server not found",
      error: error.message,
    });
  }
};

export const deleteSubCategory = async (req, res) => {
  try {
    const subCategoryId = req.params.id;

    if (!subCategoryId) {
      return res.status(400).json({
        success: false,
        message: "subCategory ID is required",
      });
    }

    const subCategory = await SubCategory.findById(subCategoryId);

    if (!subCategory) {
      return res.status(404).json({
        success: false,
        message: "subCategory not found",
      });
    }

    if (subCategory.image && subCategory.image.public_id) {
      await cloudinary.uploader.destroy(subCategory.image.public_id);
    }

    const deletedSubCategory =
      await SubCategory.findByIdAndDelete(subCategoryId);

    res.status(200).json({
      success: true,
      message: "subCategory deleted successfully",
      deletedSubCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server not found",
      error: error.message,
    });
  }
};

export const fetchSubCategoriesByCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    if (!categoryId) {
      return res.status(400).json({
        success: false,
        message: "categoryId ID is required",
      });
    }

    const subCategories = await SubCategory.find({
      parentCategory: categoryId,
    }).select("_id name image");

    if (subCategories.length == 0)
      return res.status(404).json({
        success: false,
        message: "subCategories not found",
      });

    return res.status(200).json({
      success: true,
      subCategories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server not found",
      error: error.message,
    });
  }
};
export const searchSubCategory = async (req, res) => {
  try {
    const { keyword } = req.query;

    const query = { name: { $regex: keyword, $options: "i" } };

    const subcategories = await SubCategory.find(query)
      .populate("parentCategory")
      .sort({
        createdAt: -1,
      })
      .lean();

    res.status(200).json({
      success: true,
      subcategories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server not found",
      error: error.message,
    });
  }
};

export const filterSubcategoryStatus = async (req, res) => {
  try {
    const { status } = req.query;
    let statusValue;

    if (status === "active") statusValue = true;
    if (status === "inactive") statusValue = false;

    const statusSubcategories = await SubCategory.find({
      isActive: statusValue,
    }).populate("parentCategory");

    if (statusSubcategories.length === 0) {
      return res.status(404).json({
        success: false,
        message: "sub-category not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Sub-categories fetched successfully",
      statusSubcategories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server not found",
      error: error.message,
    });
  }
};

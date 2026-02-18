import cloudinary from "../config/cloudinary.config.js";
import childCategoryModel from "../models/childCategory.model.js";
import categoryModel from "../models/category.models.js";
import subCategoryModel from "../models/subCategory.model.js";

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
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;

    const skip = (page - 1) * limit;

    const childCategories = await childCategoryModel
      .find()
      .skip(skip)
      .limit(limit)
      .sort({
        createdAt: -1,
      })
      .populate("parentCategory", "name")
      .populate("subCategory", "name");

    const totalChildCategory = await childCategoryModel.countDocuments();

    const activeChildCategoryCount = await childCategoryModel.countDocuments({
      isActive: true,
    });

    const inactiveChildCategoryCount = await childCategoryModel.countDocuments({
      isActive: false,
    });

    if (childCategories.length == 0)
      return res.status(404).json({
        success: false,
        message: "No child categories found",
      });

    res.status(200).json({
      success: true,
      message: "Child category fetched successfully",
      data: {
        currentPage: page,
        childCategories,
        totalChildCategory,
        totalPages: Math.ceil(totalChildCategory / limit),
        activeChildCategoryCount,
        inactiveChildCategoryCount,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getOneChildCategory = async (req, res) => {
  try {
    const childCategoryId = req.params.id;

    console.log(childCategoryId);

    if (!childCategoryId)
      return res.status(400).json({
        success: false,
        message: "ChildCategory ID is required",
      });

    const childCategory = await childCategoryModel
      .findOne({
        _id: childCategoryId,
      })
      .populate("parentCategory", "name _id")
      .populate("subCategory", "name _id");

    //  Fetch all other parent categories excluding current one
    const optionCategory = await categoryModel
      .find({ _id: { $ne: childCategory.parentCategory } })
      .select("name _id");

    //  Fetch all other subcategories excluding current one
    const optionSubCategory = await subCategoryModel
      .find({ _id: { $ne: childCategory.subCategory } })
      .select("name _id");

    if (!childCategory)
      return res.status(404).json({
        success: false,
        message: "ChildCategory not found",
      });

    res.status(200).json({
      success: true,
      message: "get one child category fetched successfully",
      data: {
        childCategory,
        optionCategory,
        optionSubCategory,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const updateChildCategory = async (req, res) => {
  try {
    const childCategoryId = req.params.id;

    if (!childCategoryId)
      return res.status(400).json({
        success: false,
        message: "ChildCategory ID is required",
      });

    const { name, description, parentCategory, subCategory, isActive } =
      req.body;
    const updatedData = {};

    if (name) updatedData.name = name;
    if (description) updatedData.description = description;
    if (parentCategory) updatedData.parentCategory = parentCategory;
    if (subCategory) updatedData.subCategory = subCategory;
    if (typeof isActive === "boolean") updatedData.isActive = isActive;

    // 🔹 If image is provided
    if (req.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "childCategory" }, (error, result) => {
            if (error) return reject(error);
            resolve(result);
          })
          .end(req.file.buffer);
      });

      updatedData.image = {
        public_id: uploadResult.public_id,
        url: uploadResult.secure_url,
      };
    }

    const updatedChildCategory = await childCategoryModel
      .findByIdAndUpdate(childCategoryId, updatedData, { new: true })
      .populate("parentCategory")
      .populate("subCategory");

    if (!updatedChildCategory) {
      return res.status(404).json({
        success: false,
        message: "ChildCategory not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "ChildCategory updated successfully",
      updatedChildCategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const deleteChildCategory = async (req, res) => {
  try {
    const childCategoryId = req.params.id;

    if (!childCategoryId)
      return res.status(400).json({
        success: false,
        message: "ChildCategory ID is required",
      });

    const childCategory = await childCategoryModel.findOne({
      _id: childCategoryId,
    });

    if (!childCategory)
      return res.status(404).json({
        success: false,
        message: "ChildCategory not found",
      });

    if (childCategory.image && childCategory.image?.public_id) {
      cloudinary.uploader.destroy(childCategory.image?.public_id);
    }

    const deletedChildCategory =
      await childCategoryModel.findByIdAndDelete(childCategoryId);

    res.status(200).json({
      success: true,
      message: "Child category deleted successfully",
      deletedChildCategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// search child-category
export const searchChildCategory = async (req, res) => {
  try {
    const { keyword } = req.query;
    const query = { name: { $regex: keyword, $options: "i" } };
    const childCategories = await childCategoryModel
      .find(query)
      .populate("parentCategory")
      .populate("subCategory")
      .sort({
        createdAt: -1,
      })
      .lean();
    res.status(200).json({
      success: true,
      childCategories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
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

    const statusChildCategories = await childCategoryModel
      .find({
        isActive: statusValue,
      })
      .populate("parentCategory")
      .populate("subCategory");

    if (statusChildCategories.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Child-category not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Sub-categories fetched successfully",
      statusChildCategories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

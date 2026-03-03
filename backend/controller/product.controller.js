import Product from "../models/product.model.js";
import slugify from "slugify";

// Utility: Generate Unique Slug
const generateUniqueSlug = async (name) => {
  let slug = slugify(name, { lower: true, strict: true });
  let existing = await Product.findOne({ slug });

  if (!existing) return slug;

  let counter = 1;
  while (existing) {
    slug = `${slugify(name, { lower: true, strict: true })}-${counter}`;
    existing = await Product.findOne({ slug });
    counter++;
  }

  return slug;
};

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      brand,
      category,
      subCategory,
      childCategory,
      mrp,
      price,
      tax = 0,
      stock,
      variants = [],
      specifications = {},
      weight,
      dimensions,
      shippingCost = 0,
      freeShipping = false,
      sku,
    } = req.body;

    // Required Validation
    if (
      !name ||
      !description ||
      !category ||
      !subCategory ||
      !childCategory ||
      !mrp ||
      !price
    ) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing",
      });
    }

    // Price Validation
    if (price > mrp) {
      return res.status(400).json({
        success: false,
        message: "Selling price cannot be greater than MRP",
      });
    }

    // Unique SKU Check
    if (sku) {
      const existingSKU = await Product.findOne({ sku });
      if (existingSKU) {
        return res.status(400).json({
          success: false,
          message: "SKU already exists",
        });
      }
    }

    // Generate Unique Slug
    const slug = await generateUniqueSlug(name);

    // Auto Discount Calculation
    const discountPercentage =
      mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;

    // Auto Stock from Variants (if variants exist)
    let totalStock = stock || 0;
    if (variants.length > 0) {
      totalStock = variants.reduce(
        (acc, variant) => acc + (variant.stock || 0),
        0,
      );
    }

    // Image Handling (if using multer)
    const images = req.files?.images?.map((file) => file.path) || [];
    const thumbnail = req.files?.thumbnail?.[0]?.path || "";

    const product = await Product.create({
      name,
      slug,
      description,
      brand,
      category,
      subCategory,
      childCategory,
      mrp,
      price,
      discountPercentage,
      tax,
      stock: totalStock,
      variants,
      specifications,
      weight,
      dimensions,
      shippingCost,
      freeShipping,
      images,
      thumbnail,
      sku,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
export const getAllProducts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const products = await Product.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalProducts = await Product.countDocuments();

    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No products found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: {
        page,
        totalPages: Math.ceil(totalProducts / limit),
        totalProducts,
        products,
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

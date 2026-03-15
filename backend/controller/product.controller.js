import cloudinary from "../config/cloudinary.config.js";
import Product from "../models/product.model.js";
import slugify from "slugify";
export const createProduct = async (req, res) => {
  try {
    const files = req.files || {};

    const thumbnailFile = files.thumbnail?.[0] || null;
    const imageFiles = files.images || [];

    const tags = req.body.tags ? JSON.parse(req.body.tags) : [];
    const highlights = req.body.highlights
      ? JSON.parse(req.body.highlights)
      : [];
    const specifications = req.body.specifications
      ? JSON.parse(req.body.specifications)
      : [];
    const variants = req.body.variants ? JSON.parse(req.body.variants) : [];
    const shipping = req.body.shipping ? JSON.parse(req.body.shipping) : {};

    const {
      name,
      slug,
      sku,
      brand,
      description,
      category,
      subCategory,
      childCategory,
      mrp,
      discount,
      price,
      finalPrice,
      tax,
      stock,
      warranty,
      returnPolicy,
      metaTitle,
      metaDescription,
    } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Product name is required",
      });
    }

    if (!sku) {
      return res.status(400).json({
        success: false,
        message: "SKU is required",
      });
    }

    if (!brand) {
      return res.status(400).json({
        success: false,
        message: "Brand is required",
      });
    }

    if (!description) {
      return res.status(400).json({
        success: false,
        message: "Description is required",
      });
    }

    if (!category || !subCategory || !childCategory) {
      return res.status(400).json({
        success: false,
        message: "Category, subCategory and childCategory are required",
      });
    }

    if (mrp === undefined || discount === undefined || stock === undefined) {
      return res.status(400).json({
        success: false,
        message: "MRP, discount and stock are required",
      });
    }

    if (!thumbnailFile) {
      return res.status(400).json({
        success: false,
        message: "Thumbnail is required",
      });
    }

    const generatedSlug = slug || slugify(name, { lower: true, strict: true });

    const existingProduct = await Product.findOne({
      $or: [{ sku }, { slug: generatedSlug }],
    });

    if (existingProduct) {
      return res.status(400).json({
        success: false,
        message: "Product with same SKU or slug already exists",
      });
    }

    // upload thumbnail
    const thumbnailUploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "thumbnail-product" }, (error, result) => {
          if (error) return reject(error);
          resolve(result);
        })
        .end(thumbnailFile.buffer);
    });

    // upload multiple product images
    const imageUrls = await Promise.all(
      imageFiles.map(
        (file) =>
          new Promise((resolve, reject) => {
            cloudinary.uploader
              .upload_stream({ folder: "product-images" }, (error, result) => {
                if (error) return reject(error);
                resolve(result.secure_url);
              })
              .end(file.buffer);
          }),
      ),
    );

    const product = new Product({
      name,
      slug: generatedSlug,
      sku,
      brand,
      tags,
      description,
      category,
      subCategory,
      childCategory,
      mrp: Number(mrp),
      discount: Number(discount),
      price: Number(price || 0),
      finalPrice: Number(finalPrice || 0),
      tax: Number(tax || 0),
      stock: Number(stock),
      highlights,
      specifications,
      variants,
      thumbnail: thumbnailUploadResult.secure_url,
      images: imageUrls,
      shipping,
      warranty,
      returnPolicy,
      metaTitle,
      metaDescription,
    });

    await product.save();

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const skip = (page - 1) * limit;

    const products = await Product.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate("category", "name")
      .populate("subCategory", "name")
      .populate("childCategory", "name");
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
        products,
        totalProducts,
        totalPages: Math.ceil(totalProducts / limit),
        currentPage: page,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    if (!productId)
      return res.status(400).json({
        success: false,
        message: "Product id is required",
      });
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      deletedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

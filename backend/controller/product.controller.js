import { json } from "express";
import cloudinary from "../config/cloudinary.config.js";
import Product from "../models/product.model.js";
import slugify from "slugify";
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      slug,
      sku,
      brand,
      description,
      status,
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
      variants, // ADD THIS
    } = req.body;

    // Validation (fixed category return)
    if (!name || !slug || !sku || !brand || !description) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
      });
    }

    if (!category || !subCategory || !childCategory) {
      return res.status(400).json({
        // ADD res.status()
        success: false,
        message: "All category fields required",
      });
    }

    // Parse arrays/objects
    const tags = req.body.tags ? JSON.parse(req.body.tags) : [];
    const highlights = req.body.highlights
      ? JSON.parse(req.body.highlights)
      : [];
    const specifications = req.body.specifications
      ? JSON.parse(req.body.specifications)
      : {};
    const shipping = req.body.shipping ? JSON.parse(req.body.shipping) : {};
    const variantsArray = variants ? JSON.parse(variants) : []; // PARSE VARIANTS

    // UPLOAD HELPER (move to top)
    const uploadBuffer = (buffer, folder) =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder },
          (error, result) => {
            if (error) return reject(error);
            resolve(result.secure_url);
          },
        );
        stream.end(buffer);
      });

    // 1. MAIN THUMBNAIL
    const thumbnailFile = req.files.find(
      (file) => file.fieldname === "thumbnail",
    );
    if (!thumbnailFile) {
      return res.status(400).json({
        success: false,
        message: "Thumbnail required",
      });
    }
    const thumbnailUrl = await uploadBuffer(
      thumbnailFile.buffer,
      "product/thumbnail",
    );

    // 2. MAIN IMAGES
    const imageFiles = req.files.filter((file) => file.fieldname === "images");
    const imageUrls = await Promise.all(
      imageFiles.map((file) => uploadBuffer(file.buffer, "product/images")),
    );

    // 3. VARIANTS (now works)
    const updatedVariants = await Promise.all(
      variantsArray.map(async (variant, index) => {
        const variantThumbnailFile = req.files.find(
          (file) => file.fieldname === `variantThumbnail_${index}`,
        );
        const variantImageFiles = req.files.filter(
          (file) => file.fieldname === `variantImages_${index}`,
        );

        let variantThumbnail = null;
        let variantImages = [];

        if (variantThumbnailFile) {
          variantThumbnail = await uploadBuffer(
            variantThumbnailFile.buffer,
            "product/variants/thumbnail",
          );
        }

        if (variantImageFiles.length) {
          variantImages = await Promise.all(
            variantImageFiles.map((file) =>
              uploadBuffer(file.buffer, "product/variants/images"),
            ),
          );
        }

        return {
          ...variant,
          thumbnail: variantThumbnail,
          images: variantImages,
        };
      }),
    );

    const newProduct = {
      name,
      slug,
      sku,
      brand,
      description,
      status,
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
      tags,
      highlights,
      specifications,
      shipping,
      variants: updatedVariants,
      thumbnail: thumbnailUrl,
      images: imageUrls,
    };

    await Product.create(newProduct);

    console.log("Product created:", newProduct);

    return res.status(201).json({
      success: true,
      data: newProduct,
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
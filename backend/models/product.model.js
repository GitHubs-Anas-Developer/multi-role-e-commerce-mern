import mongoose from "mongoose";

const specificationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    value: { type: String, required: true },
  },
  { _id: false },
);

const variantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    value: { type: String, required: true },
    price: { type: Number, default: 0 },
    stock: { type: Number, default: 0 },
  },
  { _id: false },
);

const shippingSchema = new mongoose.Schema(
  {
    weight: { type: Number, default: 0 },
    shippingCost: { type: Number, default: 0 },
    length: { type: Number, default: 0 },
    width: { type: Number, default: 0 },
    height: { type: Number, default: 0 },
    freeShipping: { type: Boolean, default: false },
  },
  { _id: false },
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    sku: { type: String, required: true, unique: true, trim: true },
    brand: { type: String, required: true, trim: true },
    tags: [{ type: String }],
    description: { type: String, required: true },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
      required: true,
    },
    childCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChildCategory",
      required: true,
    },

    mrp: { type: Number, required: true },
    discount: { type: Number, required: true, default: 0 },
    price: { type: Number, default: 0 },
    finalPrice: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    stock: { type: Number, required: true },

    highlights: [{ type: String }],
    specifications: [specificationSchema],
    variants: [variantSchema],

    thumbnail: { type: String, required: true },
    images: [{ type: String }],

    shipping: { type: shippingSchema, default: {} },

    warranty: { type: String, default: "" },
    returnPolicy: { type: String, default: "" },

    metaTitle: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
  },
  { timestamps: true },
);

const Product = mongoose.model("Product", productSchema);

export default Product;

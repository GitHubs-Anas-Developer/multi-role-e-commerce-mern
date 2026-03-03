import mongoose from "mongoose";

const variantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    value: {
      type: String,
    },
    price: {
      type: Number,
    },
    stock: {
      type: Number,
    },
    image: {
      type: String,
    },
  },
  {
    _id: false,
  },
);

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comment: {
      type: String,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
  },
  { timestamps: true },
);

const productSchema = new mongoose.Schema(
  {
    //    BASIC INFO
    name: {
      type: String,
      trim: true,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
    },

    // CATEGORY
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

    // PRICING
    mrp: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discountPercentage: {
      type: Number,
      default: 0,
      required: true,
    },
    tax: {
      type: Number,
      default: 0,
      required: true,
    },
    // gst: {
    //   type: Number,
    //   required: true,
    // },
    stock: {
      type: Number,
      required: true,
    },
    lowStockThreshold: {
      type: Number,
      default: 5,
    },

    // IMAGES
    images: [
      {
        type: String,
      },
    ],
    thumbnail: {
      type: String,
    },

    // VARIANTS
    variants: [variantSchema],

    // SPECIFICATIONS (Dynamic key-value)
    specifications: {
      type: Map,
      of: String,
    },

    // SHIPPING
    weight: {
      type: Number,
    },
    dimensions: {
      length: Number,
      width: Number,
      height: Number,
    },
    shippingCost: {
      type: Number,
      default: 0,
    },
    freeShipping: {
      type: Boolean,
      default: false,
    },

    // // STATUS
    // status: {
    //   type: String,
    //   enum: ["draft", "published", "unpublished"],
    //   default: "draft",
    // },

    // isFeatured: {
    //   type: Boolean,
    //   default: false,
    // },

    // REVIEWS
    reviews: [reviewSchema],
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },

    // OTHER
    sku: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Product", productSchema);

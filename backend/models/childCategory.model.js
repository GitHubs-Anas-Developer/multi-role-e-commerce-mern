import mongoose from "mongoose";

const childCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    slug: {
      type: String,
      trim: true,
      lowercase: true,
    },
    image: {
      url: {
        type: String,
      },
      public_id: {
        type: String,
      },
    },
    parentCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
      required: true,
    },
    level: {
      type: Number,
      enum: [1, 2, 3],
      default: 3,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

childCategorySchema.index(
  { name: 1, parentCategory: 1, subCategory: 1 },
  { unique: true }
);

const childCategory = mongoose.model("ChildCategory", childCategorySchema);

export default childCategory;

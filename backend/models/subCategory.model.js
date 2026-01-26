import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema(
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

    level: {
      type: Number,
      enum: [1, 2, 3],
      default: 2,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

// Prevent duplicate sub-category under same parent
subCategorySchema.index({ name: 1, parentCategory: 1 }, { unique: true });

const SubCategory = mongoose.model("SubCategory", subCategorySchema);

export default SubCategory;

import { createSlice } from "@reduxjs/toolkit";
import {
  createCategory,
  deleteCategory,
  fetchCategories,
  getOneCategory,
  updateCategory,
} from "./categoryThunks";

const initialState = {
  category: [],
  categories: [],
  pending: false,
  error: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    // handle create category

    builder
      .addCase(createCategory.pending, (state) => {
        state.pending = true;
        state.error = null;
      })

      .addCase(createCategory.fulfilled, (state, action) => {
        state.pending = false;
        state.categories.unshift(action.payload);
      })

      .addCase(createCategory.rejected, (state, action) => {
        state.pending = false;
        state.error = action.error?.message || "Create category failed";
      })

      // handle fetch categories
      .addCase(fetchCategories.pending, (state) => {
        state.pending = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.pending = false;
        state.categories = action.payload;
      })

      .addCase(fetchCategories.rejected, (state, action) => {
        state.pending = false;
        state.error = action.error?.message || "fetch categories failed";
      })

      // handle delete category
      .addCase(deleteCategory.pending, (state) => {
        state.pending = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.pending = false;
        state.categories = state.categories.filter(
          (category) => category._id !== action.payload._id
        );
      })

      // get One Category
      .addCase(getOneCategory.pending, (state) => {
        state.pending = true;
        state.error = null;
      })
      .addCase(getOneCategory.fulfilled, (state, action) => {
        state.pending = false;
        state.category = action.payload;
      })
      .addCase(getOneCategory.rejected, (state, action) => {
        state.pending = false;
        state.error = action.error;
      })

      // handle delete category
      .addCase(deleteCategory.rejected, (state, action) => {
        state.pending = false;
        state.error = action.error?.message || "delete category failed";
      })

      //update category
      .addCase(updateCategory.pending, (state) => {
        state.pending = true;
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.pending = false;
        const index = state.categories.findIndex(
          (category) => category._id === action.payload._id
        );
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.pending = false;
        state.error = action.error?.message || "update category failed";
      });
  },
});

export default categorySlice.reducer;

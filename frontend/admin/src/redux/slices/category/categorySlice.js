import { createSlice } from "@reduxjs/toolkit";
import {
  createCategory,
  deleteCategory,
  fetchCategories,
  filterStatusCategory,
  getOneCategory,
  searchCategory,
  updateCategory,
} from "./categoryThunks";

const initialState = {
  currentPage: 1,
  totalPages: 1,
  category: null,
  categories: [],
  totalCategory: 0,
  activeCategoryCount: 0,
  inactiveCategoryCount: 0,
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      //  CREATE CATEGORY
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.unshift(action.payload);
        state.totalCategory += 1;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || action.error?.message || "Create category failed";
      })

      //  FETCH CATEGORIES
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPage = action.payload.page;
        state.totalPages = action.payload.totalPages;
        state.categories = action.payload.categories;
        state.totalCategory = action.payload.totalCategory;
        state.activeCategoryCount = action.payload.activeCategoryCount;
        state.inactiveCategoryCount = action.payload.inactiveCategoryCount;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || action.error?.message || "Fetch categories failed";
      })

      //  DELETE CATEGORY
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.filter(
          (category) => category._id !== action.payload._id,
        );
        state.totalCategory -= 1;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || action.error?.message || "Delete category failed";
      })

      //  GET ONE CATEGORY
      .addCase(getOneCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOneCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload;
      })
      .addCase(getOneCategory.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || action.error?.message || "Get category failed";
      })

      //  UPDATE CATEGORY
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.categories.findIndex(
          (category) => category._id === action.payload._id,
        );

        if (index !== -1) {
          const oldStatus = state.categories[index].isActive;
          const newStatus = action.payload.isActive;

          // Update category
          state.categories[index] = action.payload;

          //  Update counts only if status changed
          if (oldStatus !== newStatus) {
            if (newStatus) {
              state.activeCategoryCount += 1;
              state.inactiveCategoryCount -= 1;
            } else {
              state.activeCategoryCount -= 1;
              state.inactiveCategoryCount += 1;
            }
          }
        }
      })

      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || action.error?.message || "Update category failed";
      })

      //  SEARCH CATEGORY
      .addCase(searchCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(searchCategory.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || action.error?.message || "Search failed";
      })

      // FILTER STATUS
      .addCase(filterStatusCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(filterStatusCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(filterStatusCategory.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || action.error?.message || "Filter failed";
      });
  },
});

export default categorySlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import {
  createSubcategory,
  deleteSubCategory,
  fetchSubcategories,
  fetchSubCategoriesByCategory,
  filterStatusSubCategory,
  getOneSubCategory,
  searchSubCategory,
  updateSubCategory,
} from "./subcategoryThunk";

const initialState = {
  subcategory: null,
  subcategories: [],
  otherCategories: [],
  currentPage: 1,
  totalPages: 1,
  totalSubCategory: 0,
  activeSubCategoryCount: 0,
  inactiveSubCategoryCount: 0,
  loading: false,
  loadingList: false,
  error: null,
};

const subcategorySlice = createSlice({
  initialState,
  name: "subcategory",
  extraReducers: (builder) => {
    builder
      // create sub-category
      .addCase(createSubcategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(createSubcategory.fulfilled, (state, action) => {
        state.loading = false;
        state.subcategories.push(action.payload);
      })
      .addCase(createSubcategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetch subcategories
      .addCase(fetchSubcategories.pending, (state) => {
        state.loadingList = true;
      })
      .addCase(fetchSubcategories.fulfilled, (state, action) => {
        state.loadingList = false;
        state.subcategories = action.payload.subCategories;
        state.totalSubCategory = action.payload.totalSubCategory;
        state.activeSubCategoryCount = action.payload.activeSubCategoryCount;
        state.inactiveSubCategoryCount =
          action.payload.inactiveSubCategoryCount;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.page;
      })
      .addCase(fetchSubcategories.rejected, (state, action) => {
        state.loadingList = false;
        state.error = action.payload;
      })

      // get one sub-category
      .addCase(getOneSubCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOneSubCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.subcategory = action.payload.subcategory;
        state.otherCategories = action.payload.otherCategories;
      })
      .addCase(getOneSubCategory.rejected, (state) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateSubCategory.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.subcategories.findIndex(
          (item) => item._id === action.payload._id,
        );

        if (index !== -1) {
          // Get old status BEFORE update
          const oldStatus = state.subcategories[index].isActive;
          const newStatus = action.payload.isActive;

          //  Update item
          state.subcategories[index] = action.payload;

          //  Update counts properly
          if (oldStatus !== newStatus) {
            if (newStatus) {
              state.activeSubCategoryCount += 1;
              state.inactiveSubCategoryCount -= 1;
            } else {
              state.activeSubCategoryCount -= 1;
              state.inactiveSubCategoryCount += 1;
            }
          }
        }
      })

      //delete Sub-category
      .addCase(deleteSubCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteSubCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.subcategories = state.subcategories.filter(
          (item) => item._id !== action.payload._id,
        );
      })
      .addCase(deleteSubCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetchSubCategoriesByCategory
      .addCase(fetchSubCategoriesByCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSubCategoriesByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.subcategories = action.payload;
      })
      .addCase(fetchSubCategoriesByCategory.rejected, (state) => {
        state.loading = false;
      })

      // search categories
      .addCase(searchSubCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchSubCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.subcategories = action.payload;
      })
      .addCase(searchSubCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })

      // FILTER STATUS
      .addCase(filterStatusSubCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(filterStatusSubCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.subcategories = action.payload;
      })
      .addCase(filterStatusSubCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default subcategorySlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import {
  createSubcategory,
  deleteSubCategory,
  fetchSubcategories,
  fetchSubCategoriesByCategory,
  getOneSubCategory,
  updateSubCategory,
} from "./subcategoryThunk";
import { updateCategory } from "../category/categoryThunks";

const initialState = {
  subcategory: null,
  subcategories: [],
  loading: false,
  loadingList: false,
  error: null,
};

const subcategorySlice = createSlice({
  initialState,
  name: "subcategory",
  reducers: {},

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
        state.subcategories = action.payload;
      })
      .addCase(fetchSubcategories.rejected, (state,action) => {
        state.loadingList = false;
        state.error = action.payload;
      })

      // get one sub-category
      .addCase(getOneSubCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOneSubCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.subcategory = action.payload;
      })
      .addCase(getOneSubCategory.rejected, (state) => {
        state.loading = false;
        state.error = action.payload;
      })

      // sub-category update
      .addCase(updateSubCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateSubCategory.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.subcategories.findIndex(
          (item) => item._id === action.payload._id
        );
        console.log("index", index);
        if (index !== -1) {
          state.subcategories[index] = action.payload;
        }
      })
      .addCase(updateSubCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //delete Sub-category
      .addCase(deleteSubCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteSubCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.subcategories = state.subcategories.filter(
          (item) => item._id !== action.payload._id
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
      });
  },
});

export default subcategorySlice.reducer;

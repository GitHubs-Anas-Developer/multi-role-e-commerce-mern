const { createSlice } = require("@reduxjs/toolkit");
const {
  createChildCategory,
  fetchChildCategories,
  deleteChildCategory,
  getOneChildCategory,
  updateChildCategory,
  searchChildCategory,
  filterStatusChildCategory,
} = require("./childcategoryThunk");

const initialState = {
  childCategory: null,
  childCategories: [],
  currentPage: 1,
  totalPages: 1,
  optionCategory: [],
  optionSubCategory: [],
  totalChildCategory: 0,
  activeChildCategoryCount: 0,
  inactiveChildCategoryCount: 0,
  loading: false,
  error: null,
};

// create child-category
const childCategorySlice = createSlice({
  name: "childCategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createChildCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createChildCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.childCategories.unshift(action.payload);
        state.error = null;
      })
      .addCase(createChildCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetch child-categories
      .addCase(fetchChildCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchChildCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.childCategories = action.payload.childCategories;
        state.totalChildCategory = action.payload.totalChildCategory;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.activeChildCategoryCount =
          action.payload.activeChildCategoryCount;
        state.inactiveChildCategoryCount =
          action.payload.inactiveChildCategoryCount;
      })
      .addCase(fetchChildCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // get one child-category
      .addCase(getOneChildCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOneChildCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.childCategory = action.payload.childCategory;
        state.optionCategory = action.payload.optionCategory;
        state.optionSubCategory = action.payload.optionSubCategory;
      })
      .addCase(getOneChildCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // update child-category
      .addCase(updateChildCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateChildCategory.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.childCategories.findIndex(
          (child) => child._id === action.payload._id,
        );

        if (index !== -1) {
          // Get old status BEFORE update
          const oldStatus = state.childCategories[index].isActive;
          const newStatus = action.payload.isActive;
          //  Update item
          state.childCategories[index] = action.payload;

          //  Update counts properly

          if (oldStatus !== newStatus) {
            if (newStatus) {
              state.activeChildCategoryCount += 1;
              state.inactiveChildCategoryCount -= 1;
            } else {
              state.activeChildCategoryCount -= 1;
              state.inactiveChildCategoryCount += 1;
            }
          }
        }
      })
      .addCase(updateChildCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Update child category failed";
      })

      // delete child-category
      .addCase(deleteChildCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteChildCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.childCategories = state.childCategories.filter(
          (child) => child._id !== action.payload._id,
        );
      })
      .addCase(deleteChildCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "delete child-category failed";
      })

      // search child-category
      .addCase(searchChildCategory.pending, (state) => {
        state.pending = true;
      })
      .addCase(searchChildCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.childCategories = action.payload;
      })
      .addCase(searchChildCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      // FILTER STATUS
      .addCase(filterStatusChildCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(filterStatusChildCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.childCategories = action.payload;
      })
      .addCase(filterStatusChildCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default childCategorySlice.reducer;

const { createSlice } = require("@reduxjs/toolkit");
const {
  createChildCategory,
  fetchChildCategories,
} = require("./childcategoryThunk");

const initialState = {
  childCategory: null,
  childCategories: [],
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
        state.childCategories.push(action.payload);
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
        state.childCategories = action.payload;
      })
      .addCase(fetchChildCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default childCategorySlice.reducer;

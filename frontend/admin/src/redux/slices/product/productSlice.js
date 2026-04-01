import { createSlice } from "@reduxjs/toolkit";
import { createProduct, getProductsAll } from "./productThunks";

const initialState = {
  currentPage: 1,
  totalPages: 1,
  totalProducts: 0,
  products: [],
  product: null,
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getProductsAll.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductsAll.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPage = action.payload?.page || 1;
        state.totalPages = action.payload?.totalPages || 1;
        state.totalProducts = action.payload?.totalProducts || 0;
        state.products = action.payload?.products || [];
      })
      .addCase(getProductsAll.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error?.message || "Fetch products failed";
      })

      // create product
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.unshift(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;

import { api } from "@/services/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getProductsAll = createAsyncThunk(
  "admin/product/fetch",
  async (page = 1, { rejectWithValue }) => {
    try {
      const response = await api.get(`/product/?page=${page}&limit=10`);
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Fetch products failed",
      );
    }
  },
);

export const createProduct = createAsyncThunk(
  "/admin/create/product",
  async (data, { rejectWithValue }) => {
    console.log("new products", data);
    try {
      const response = await api.post("/product/create", data);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);


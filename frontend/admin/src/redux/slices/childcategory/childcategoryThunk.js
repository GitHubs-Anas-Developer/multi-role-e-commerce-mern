import { api } from "@/services/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createChildCategory = createAsyncThunk(
  "admin/create/child-category",
  async (data, { rejectWithValue }) => {
    console.log("data", data);
    try {
      const response = await api.post("/child-category/create", data);
      return response.data;
    } catch (error) {
      rejectWithValue(
        error.response?.message ||
          error.message ||
          "child category create failed"
      );
    }
  }
);

export const fetchChildCategories = createAsyncThunk(
  "admin/child-categories/all",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/child-category/all");
      return response.data?.childCategories;
    } catch (error) {
      rejectWithValue(
        error.response?.message ||
          error.message ||
          "child category fetch failed"
      );
    }
  }
);

import { api } from "@/services/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

// create a new category
export const createCategory = createAsyncThunk(
  "admin/category/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/category/create", data);
      return response.data.category;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "category failed"
      );
    }
  }
);

// Fetch all categories
export const fetchCategories = createAsyncThunk(
  "admin/categories/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/category/all");
      return response.data?.categories;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Fetch categories failed"
      );
    }
  }
);

// get one category

export const getOneCategory = createAsyncThunk(
  "admin/category/getOne",
  async (category_id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/category/one/${category_id}`);
      return response.data?.category;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Get category failed"
      );
    }
  }
);

// Delete category

export const deleteCategory = createAsyncThunk(
  "admin/category/delete",
  async (category_id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/category/delete/${category_id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Delete category failed"
      );
    }
  }
);

// Update category
export const updateCategory = createAsyncThunk(
  "admin/category/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/category/update/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Update category failed"
      );
    }
  }
);

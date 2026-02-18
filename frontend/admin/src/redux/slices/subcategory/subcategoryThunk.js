import { api } from "@/services/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createSubcategory = createAsyncThunk(
  "admin/subcategory/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/sub-category/create", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(err.response?.data || err.message);
    }
  },
);

export const fetchSubcategories = createAsyncThunk(
  "admin/subcategory/all",
  async (page = 1, { rejectWithValue }) => {
    try {
      const response = await api.get(`/sub-category/?page=${page}&limit=10`);
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(err.response?.data || err.message);
    }
  },
);

export const getOneSubCategory = createAsyncThunk(
  "admin/sub-category/getOne",
  async (subCategoryId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/sub-category/one/${subCategoryId}`);
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(err.response?.data || err.message);
    }
  },
);

export const updateSubCategory = createAsyncThunk(
  "admin/sub-category/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/sub-category/update/${id}`, data);
      return response.data.updateSubCategory;
    } catch (error) {
      return rejectWithValue(err.response?.data || err.message);
    }
  },
);

export const deleteSubCategory = createAsyncThunk(
  "admin/sub-category/delete",
  async (subCategoryId, { rejectWithValue }) => {
    try {
      const response = await api.delete(
        `/sub-category/delete/${subCategoryId}`,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(err.response?.data || err.message);
    }
  },
);

export const fetchSubCategoriesByCategory = createAsyncThunk(
  "subcategory/fetchByCategory",
  async (categoryId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/sub-category/by-category/${categoryId}`);
      return res.data?.subCategories;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  },
);

// search Sub-category
export const searchSubCategory = createAsyncThunk(
  "admin/category/search",
  async (keyword, { rejectWithValue }) => {
    try {
      const response = await api.get(`sub-category/search?keyword=${keyword}`);
      return response.data?.subcategories;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "search subcategory failed",
      );
    }
  },
);

export const filterStatusSubCategory = createAsyncThunk(
  "admin/subcategory/status",
  async (status, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/sub-category/filter/status?status=${status}`,
      );
      return response.data?.statusSubcategories;
    } catch (error) {
      rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "status subcategory failed",
      );
    }
  },
);

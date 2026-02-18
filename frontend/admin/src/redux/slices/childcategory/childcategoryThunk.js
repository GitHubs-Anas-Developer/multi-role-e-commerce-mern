import { api } from "@/services/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createChildCategory = createAsyncThunk(
  "admin/create/child-category",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/child-category/create", data);
      return response.data.childCategory;
    } catch (error) {
      rejectWithValue(
        error.response?.message ||
          error.message ||
          "child category create failed",
      );
    }
  },
);

export const fetchChildCategories = createAsyncThunk(
  "admin/child-categories/all",
  async (page = 1, { rejectWithValue }) => {
    try {
      const response = await api.get(`/child-category/?page=${page}&limit=10`);
      return response.data?.data;
    } catch (error) {
      rejectWithValue(
        error.response?.message ||
          error.message ||
          "child category fetch failed",
      );
    }
  },
);

// get One Child-category

export const getOneChildCategory = createAsyncThunk(
  "admin/child-category/one",
  async (childId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/child-category/one/${childId}`);
      return response.data?.data;
    } catch (error) {
      rejectWithValue(
        error.message?.message ||
          error.message ||
          "child category fetch failed",
      );
    }
  },
);

export const updateChildCategory = createAsyncThunk(
  "admin/child-category/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/child-category/update/${id}`, data);
      return response.data.updatedChildCategory;
    } catch (error) {
      rejectWithValue(
        error.message?.message ||
          error.message ||
          "child category update failed",
      );
    }
  },
);

export const deleteChildCategory = createAsyncThunk(
  "admin/child-categories/delete",
  async (childCategoryId, { rejectWithValue }) => {
    try {
      const response = await api.delete(
        `/child-category/delete/${childCategoryId}`,
      );
      return response.data.deletedChildCategory;
    } catch (error) {
      rejectWithValue(
        error.response?.message ||
          error.message ||
          "child category deleted failed",
      );
    }
  },
);

// search Sub-category
export const searchChildCategory = createAsyncThunk(
  "admin/child-category/search",
  async (keyword, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `child-category/search?keyword=${keyword}`,
      );
      return response.data.childCategories;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "search childCategory failed",
      );
    }
  },
);

export const filterStatusChildCategory = createAsyncThunk(
  "admin/child-category/status",
  async (status, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/child-category/filter/status?status=${status}`,
      );
      return response.data?.statusChildCategories;
    } catch (error) {
      rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "status child-category failed",
      );
    }
  },
);

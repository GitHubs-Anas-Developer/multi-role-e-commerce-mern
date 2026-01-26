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
  }
);

export const fetchSubcategories = createAsyncThunk(
  "admin/subcategory/all",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/sub-category/all");
      return response.data?.subCategories;
    } catch (error) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const getOneSubCategory = createAsyncThunk(
  "admin/sub-category/getOne",
  async (subCategoryId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/sub-category/one/${subCategoryId}`);
      return response.data?.subcategory;
    } catch (error) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const updateSubCategory = createAsyncThunk(
  "admin/sub-category/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/sub-category/update/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const deleteSubCategory = createAsyncThunk(
  "admin/sub-category/delete",
  async (subCategoryId, { rejectWithValue }) => {
    try {
      const response = await api.delete(
        `/sub-category/delete/${subCategoryId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
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
  }
);

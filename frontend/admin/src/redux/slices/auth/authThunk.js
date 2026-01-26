import { api } from "@/services/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

/* ================= LOGIN ================= */

export const loginAdmin = createAsyncThunk(
  "auth/admin/login",
  async (data, thunkAPI) => {
    try {
      const response = await api.post("/auth/login", data);
      return response?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || "Login failed"
      );
    }
  }
);

/* ================= GET PROFILE ================= */

export const getAdminProfile = createAsyncThunk(
  "auth/admin/profile",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/auth/profile", {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || "Unauthorized"
      );
    }
  }
);

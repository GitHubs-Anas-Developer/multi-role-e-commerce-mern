import { createSlice } from "@reduxjs/toolkit";
import { loginAdmin, getAdminProfile } from "./authThunk";

const initialState = {
  adminLogged: false,
  admin: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.adminLogged = false;
      state.admin = null;
      state.error = null;
      state.loading = false;
    },
  },

  extraReducers: (builder) => {
    builder

      /* ===== LOGIN ===== */
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.adminLogged = true;
        // Login returns token, admin data will be set after profile fetch
        state.admin = action.payload?.admin || null;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.adminLogged = false;
        state.error = action.payload || action.error?.message || "Login failed";
      })

      /* ===== PROFILE ===== */
      .addCase(getAdminProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAdminProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.adminLogged = true;
        state.admin = action.payload?.admin || null;
      })
      .addCase(getAdminProfile.rejected, (state, action) => {
        state.loading = false;
        state.adminLogged = false;
        state.error = action.payload || action.error?.message || "Failed to fetch profile";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

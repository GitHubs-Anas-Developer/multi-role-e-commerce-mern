"use client";
import AdminWrapper from "@/components/layout/AdminWrapper";
import { useEffect } from "react";
import { getAdminProfile } from "@/redux/slices/auth/authThunk";
import { useDispatch, useSelector } from "react-redux";
import Login from "../auth/login/page";
import { Spin } from "antd";

/**
 * AdminLayout - Protected route layout for admin pages
 * 
 * This layout ensures that all nested admin routes are protected/authenticated
 * and displays a loading spinner while the profile is being checked.
 * 
 * - Verifies admin session on mount via getAdminProfile()
 * - Shows loading spinner during authentication check
 * - Renders AdminWrapper if authenticated, Login page if not
 */
function AdminLayout({ children }) {
  const dispatch = useDispatch();
  const { adminLogged, loading } = useSelector((state) => state.auth);
  
  useEffect(() => {
    dispatch(getAdminProfile());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }
  
  return (
    <>{adminLogged ? <AdminWrapper>{children}</AdminWrapper> : <Login />}</>
  );
}

export default AdminLayout;
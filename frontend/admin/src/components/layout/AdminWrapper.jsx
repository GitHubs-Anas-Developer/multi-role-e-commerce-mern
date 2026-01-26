"use client";
import { Layout } from "antd";
import React from "react";
import Sidebar from "./Sidebar";
import HeaderComponent from "./Header";

const { Content } = Layout;

function AdminWrapper({ children }) {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />

      {/* RIGHT SIDE LAYOUT */}
      <Layout>
        <HeaderComponent />
        <Content
          style={{
            margin: 20,
            padding: 20,
            background: "#fff",
            borderRadius: 8,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}

export default AdminWrapper;

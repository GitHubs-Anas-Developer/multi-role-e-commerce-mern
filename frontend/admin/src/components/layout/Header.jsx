"use client";
import { Avatar, Badge, Flex, Space } from "antd";
import React from "react";
import SearchBar from "../common/SearchBar";
import { BsChatSquareDots } from "react-icons/bs";
import { IoNotificationsOutline } from "react-icons/io5";
import { UserOutlined } from "@ant-design/icons";
import Profile from "../profile/Profile";

function HeaderComponent() {
  return (
    <Flex
      justify="space-between"
      align="center"
      style={{
        height: 64,
        background: "#fff",
        padding: "0 20px",
        borderBottom: "1px solid #f0f0f0",
      }}
    >
      {/* LEFT SIDE */}
      <Space>
        <strong style={{ fontSize: 20 }}>Admin Panel</strong>
      </Space>

      {/* RIGHT SIDE */}
      <Space size={20}>
        <SearchBar />

        <Badge count={4} offset={[0, 4]}>
          <BsChatSquareDots size={20} style={{ cursor: "pointer" }} />
        </Badge>

        <Badge count={1} offset={[0, 4]}>
          <IoNotificationsOutline size={22} style={{ cursor: "pointer" }} />
        </Badge>

        <Profile />
      </Space>
    </Flex>
  );
}

export default HeaderComponent;

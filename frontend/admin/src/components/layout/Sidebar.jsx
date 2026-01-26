"use client";
import React, { useState } from "react";
import { Button, Layout, Menu } from "antd";
import {
  MdDashboard,
  MdCategory,
  MdReviews,
  MdInventory,
  MdOutlinePayment,
  MdReport,
  MdSettings,
} from "react-icons/md";
import { FaUsers, FaProductHunt, FaShippingFast, FaBox } from "react-icons/fa";
import { GiKnightBanner } from "react-icons/gi";
import { RiDiscountPercentFill } from "react-icons/ri";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { BiSolidCategory } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { FaUsersRectangle } from "react-icons/fa6";
import { BiCategoryAlt } from "react-icons/bi";
import { MdSubdirectoryArrowRight } from "react-icons/md";
import { FaChild } from "react-icons/fa";
function Sidebar() {
  const { Sider, Header } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{ backgroundColor: "#fff" }}
    >
      <div className="demo-logo-vertical">
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{ width: "100%", marginTop: 20 }}
        />
      </div>

      <Menu
        mode="inline"
        onClick={(items) => router.push(items.key)}
        defaultSelectedKeys={["1"]}
        items={[
          {
            key: "/admin/dashboard",
            icon: <MdDashboard size={20} />,
            label: "Dashboard ",
          },
          {
            key: "/admin/users",
            icon: <FaUsers size={20} />,
            label: "Users ",
          },
          {
            key: "/admin/vendors",
            icon: <FaUsersRectangle size={20} />,
            label: "Vendor ",
            children: [
              {
                label: "List All vendor Products",
                key: "/admin/vendorsS",
              },
            ],
          },
          {
            key: "/admin/products",
            icon: <FaProductHunt size={20} />,
            label: "Product ",
          },
          {
            key: "/admin/orders",
            icon: <FaBox size={20} />,
            label: "Order ",
          },
          {
            key: "/admin/categories",
            icon: <BiCategoryAlt size={20} />,
            label: "Category",
          },
          {
            key: "/admin/sub-categories",
            icon: <MdSubdirectoryArrowRight size={20} />,
            label: "Sub-Category ",
          },
          {
            key: "/admin/child-categories",
            icon: <FaChild size={20} />,
            label: "Child-Category ",
          },
          {
            key: "7",
            icon: <GiKnightBanner size={20} />,
            label: "Banner/Slider ",
          },
          {
            key: "8",
            icon: <RiDiscountPercentFill size={20} />,
            label: "Coupon/Discount ",
          },
          {
            key: "9",
            icon: <MdReviews size={20} />,
            label: "Reviews & Ratings ",
          },
          {
            key: "10",
            icon: <MdInventory size={20} />,
            label: "Stock/Inventory ",
          },
          {
            key: "11",
            icon: <MdOutlinePayment size={20} />,
            label: "Payment/Payout ",
          },
          {
            key: "12",
            icon: <FaShippingFast size={20} />,
            label: "Shipping/Delivery ",
          },
          {
            key: "13",
            icon: <MdReport size={20} />,
            label: "Reports/Analytics ",
          },
          // { key: "14", icon: <MdSettings size={20} />, label: "Settings" },
        ]}
      ></Menu>
    </Sider>
  );
}

export default Sidebar;

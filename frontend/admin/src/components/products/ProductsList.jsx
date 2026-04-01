"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  Tag,
  Space,
  Button,
  Image,
  Card,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getProductsAll } from "@/redux/slices/product/productThunks";
import ProductSkeleton from "../ui/ProductSkeleton";
import ProductFilter from "./ProductFilter";

function ProductsList() {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProductsAll());
  }, [dispatch]);
  const columns = [
    {
      title: "Product",
      dataIndex: "name",
      key: "name",
      render: (name, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Image
            src={record.thumbnail || "/no-image.png"}
            alt={name}
            width={45}
            height={45}
            preview={false}
            style={{ objectFit: "cover", borderRadius: 6 }}
          />
          <div>
            <div style={{ fontWeight: 600 }}>{name}</div>
            <div style={{ fontSize: "12px", color: "#888" }}>
              {record.sku || "No SKU"}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Category",
      dataIndex: ["category", "name"],
      key: "category",
      render: (category) => category || "Uncategorized",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `₹${price ? price.toLocaleString() : 0}`,
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      render: (stock) => {
        if (stock === 0) return <Tag color="red">Out of Stock</Tag>;
        if (stock <= 10) return <Tag color="orange">Low Stock ({stock})</Tag>;
        return <Tag color="green">In Stock ({stock})</Tag>;
      },
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (status) => (
        <Tag color={status ? "green" : "default"}>
          {status ? "Active" : "Inactive"}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button size="small" icon={<EyeOutlined />} />
          <Button size="small" icon={<EditOutlined />} />
          <Button danger size="small" icon={<DeleteOutlined />} />
        </Space>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="p-6">
        <ProductSkeleton />
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh" }}>
      <ProductFilter/>
      <Card style={{ marginTop: 20, borderRadius: 12 }}>
        <Table columns={columns} dataSource={products} rowKey="_id" />
      </Card>
    </div>
  );
}

export default ProductsList;

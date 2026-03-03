"use client";
import React from "react";
import { Table, Tag, Space, Button, Image } from "antd";
import ProductsHeader from "./ProductsHeader";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

function ProductsList() {
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      width: 80,
    },
    {
      title: "Product",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <Image
          src={image}
          alt="product"
          width={50}
          height={50}
          style={{ objectFit: "cover", borderRadius: 6 }}
        />
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `₹ ${price}`,
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      render: (stock) =>
        stock > 10 ? (
          <Tag color="green">In Stock ({stock})</Tag>
        ) : (
          <Tag color="red">Low Stock ({stock})</Tag>
        ),
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (status) =>
        status ? (
          <Tag color="blue">Active</Tag>
        ) : (
          <Tag color="red">Inactive</Tag>
        ),
    },
    {
      title: "Featured",
      dataIndex: "isFeatured",
      key: "isFeatured",
      render: (featured) => (featured ? <Tag color="gold">Featured</Tag> : "-"),
    },
    {
      title: "Actions",
      key: "actions",
      render: () => (
        <Space>
          <Button type="primary" icon={<EditOutlined />} />
          <Button danger icon={<DeleteOutlined />} />
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      _id: "1",
      name: "iPhone 15 Pro",
      image: "https://via.placeholder.com/60",
      category: "Mobiles",
      price: 120000,
      stock: 25,
      rating: 4.8,
      isActive: true,
      isFeatured: true,
    },
    {
      key: "2",
      _id: "2",
      name: "Samsung Galaxy S24",
      image: "https://via.placeholder.com/60",
      category: "Mobiles",
      price: 90000,
      stock: 5,
      rating: 4.5,
      isActive: false,
      isFeatured: false,
    },
    {
      key: "3",
      _id: "3",
      name: "Nike Air Max",
      image: "https://via.placeholder.com/60",
      category: "Shoes",
      price: 15000,
      stock: 40,
      rating: 4.3,
      isActive: true,
      isFeatured: false,
    },
    {
      key: "4",
      _id: "4",
      name: "Sony Headphones",
      image: "https://via.placeholder.com/60",
      category: "Electronics",
      price: 30000,
      stock: 8,
      rating: 4.9,
      isActive: true,
      isFeatured: true,
    },
  ];

  return (
    <>
      <ProductsHeader />
      <Table columns={columns} dataSource={data} bordered pagination={false} />
    </>
  );
}

export default ProductsList;

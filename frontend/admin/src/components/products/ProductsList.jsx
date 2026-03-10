"use client";
import React, { useEffect } from "react";
import { Table, Tag, Space, Button, Image } from "antd";
import ProductsHeader from "./ProductsHeader";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getProductsAll } from "@/redux/slices/product/productThunks";
import ProductSkeleton from "../ui/ProductSkeleton";

function ProductsList() {
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProductsAll());
  }, []);

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

  if (loading) return <ProductSkeleton />;

  return (
    <>
      <ProductsHeader />
      <Table
        columns={columns}
        dataSource={products}
        bordered
        pagination={false}
      />
    </>
  );
}

export default ProductsList;

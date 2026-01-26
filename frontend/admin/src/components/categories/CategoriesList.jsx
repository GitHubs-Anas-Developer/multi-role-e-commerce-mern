"use client";
import React, { useEffect, useState } from "react";
import { Button, Image, message, Popconfirm, Space, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import CategoryHeader from "./CategoryHeader";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategory,
  fetchCategories,
  getOneCategory,
} from "@/redux/slices/category/categoryThunks";
import EditCategoryForm from "./EditCategoryForm";

function CategoriesList() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { categories, pending } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteCategory(id)).unwrap();
      message.success("Category deleted successfully 🎉");
      dispatch(fetchCategories());
    } catch (err) {
      message.error(err || "Delete failed");
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    // {
    //   title: "Description",
    //   dataIndex: "description",
    //   key: "description",
    // },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (img) => (
        <Image
          width={42}
          src={img?.url}
          alt="category"
          className="rounded-lg border border-gray-200 bg-white p-1"
        />
      ),
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive) => (
        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full shadow-sm
            ${
              isActive
                ? "bg-green-100 text-green-700 border border-green-300"
                : "bg-red-100 text-red-700 border border-red-300"
            }`}
        >
          {isActive ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            className="rounded-lg"
            onClick={() => {
              setDrawerOpen(true);
              dispatch(getOneCategory(record._id));
            }}
          >
            Edit
          </Button>

          <Popconfirm
            title="Are you sure to delete?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => handleDelete(record._id)}
          >
            <Button danger icon={<DeleteOutlined />} className="!rounded-lg">
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <CategoryHeader />
      <Table
        rowKey="_id"
        loading={pending}
        columns={columns}
        dataSource={Array.isArray(categories) ? categories : []}
        bordered={true}
        pagination={false}
        className="rounded-xl overflow-hidden"
      />
      <EditCategoryForm drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
    </div>
  );
}

export default CategoriesList;

"use client";
import React, { useEffect } from "react";
import ChildCategoryHeader from "./ChildCategoryHeader";
import { Button, Image, Popconfirm, Space, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchChildCategories } from "@/redux/slices/childcategory/childcategoryThunk";

function ChildCategoryList() {
  const { childCategories, loading, error } = useSelector(
    (state) => state.childCategory,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchChildCategories());
  }, [dispatch]);

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Child Category ",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Sub Category",
      dataIndex: "subCategory",
      key: "subCategory",
      render: (subCategory) => subCategory.name,
    },
    {
      title: "Parent Category",
      dataIndex: "parentCategory",
      key: "parentCategory",
      render: (parentCategory) => parentCategory.name,
    },

    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => <Image width={40} src={image?.url} alt="" />,
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
          {/* Edit Button */}
          <Button type="primary" icon={<EditOutlined />}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete?"
            okText="Yes"
            cancelText="No"
          >
            <Button danger icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <ChildCategoryHeader />
      <Table
        rowKey="_id"
        loading={loading}
        columns={columns}
        dataSource={childCategories}
        bordered
        pagination={false}
      />
    </div>
  );
}

export default ChildCategoryList;

"use client";
import React, { useEffect, useState } from "react";
import { Button, Image, message, Popconfirm, Space, Switch, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import CategoryHeader from "./CategoryHeader";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategory,
  fetchCategories,
  getOneCategory,
  updateCategory,
} from "@/redux/slices/category/categoryThunks";
import EditCategoryForm from "./EditCategoryForm";

function CategoriesList() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const {
    totalPages,
    currentPage,
    categories,
    totalCategory,
    activeCategoryCount,
    inactiveCategoryCount,
    loading,
  } = useSelector((state) => state.category);
  const dispatch = useDispatch();

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
      render: (img) =>
        img ? (
          <Image
            width={42}
            src={img?.url}
            alt="category"
            className="rounded-lg border border-gray-200 bg-white p-1 "
          />
        ) : (
          "No Image"
        ),
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      align: "center",
      render: (isActive, record) => (
        <Switch
          checked={isActive}
          checkedChildren="Active"
          unCheckedChildren="Inactive"
          onChange={(checked) => {
            // dispatch update status
            dispatch(
              updateCategory({
                id: record._id,
                data: { isActive: checked },
              }),
            );
          }}
        />
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
            <Button danger icon={<DeleteOutlined />} className="rounded-lg">
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div
      style={{
        height: "100vh",
        overflowY: "auto",
      }}
    >
      <CategoryHeader
        currentPage={currentPage}
        pageSize={totalPages}
        totalCategory={totalCategory}
        activeCategoryCount={activeCategoryCount}
        inactiveCategoryCount={inactiveCategoryCount}
        loading={loading}
        onPageChange={(p) => dispatch(fetchCategories(p))}
      />
      <Table
        rowKey="_id"
        loading={loading}
        columns={columns}
        dataSource={Array.isArray(categories) ? categories : []}
        bordered={true}
        className="rounded-xl overflow-hidden"
        pagination={false}
      />
      <EditCategoryForm drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
    </div>
  );
}

export default CategoriesList;

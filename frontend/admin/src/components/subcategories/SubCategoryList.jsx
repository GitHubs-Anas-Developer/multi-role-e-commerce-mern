"use client";
import React, { useState } from "react";
import { Button, Image, message, Popconfirm, Space, Switch, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import SubCategoryHeader from "./SubCategoryHeader";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSubCategory,
  fetchSubcategories,
  getOneSubCategory,
  updateSubCategory,
} from "@/redux/slices/subcategory/subcategoryThunk";
import EditSubCategoryForm from "./EditSubCategoryForm";

function SubCategoryList() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const dispatch = useDispatch();

  const {
    subcategories,
    currentPage,
    pageSize,
    totalSubCategory,
    loading,
    error,
  } = useSelector((state) => state.subCategory);

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteSubCategory(id)).unwrap();
      message.success("SubCategory deleted successfully 🎉");
      dispatch(fetchSubcategories());
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
      title: "Sub-Category",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Parent Category",
      dataIndex: "parentCategory",
      key: "parentCategory",
      render: (parent) => parent.name || "N/A",
    },

    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (img) =>
        img ? (
          <Image
            width={42}
            height={42}
            src={img.url}
            alt="subcategory"
            className="rounded-lg border border-gray-200 bg-white p-1"
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
              updateSubCategory({
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
            onClick={() => {
              setDrawerOpen(true); // open drawer
              dispatch(getOneSubCategory(record._id));
            }}
          >
            Edit
          </Button>

          <Popconfirm
            title="Are you sure to delete?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => {
              dispatch(handleDelete(record._id));
            }}
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
    <div
      style={{
        height: "100vh",
        overflowY: "auto",
      }}
    >
      <SubCategoryHeader
        currentPage={currentPage}
        pageSize={pageSize}
        totalSubCategory={totalSubCategory}
        onPageChange={(p) => dispatch(fetchSubcategories(p))}
      />
      <Table
        columns={columns}
        dataSource={Array.isArray(subcategories) ? subcategories : []}
        rowKey="_id"
        bordered
        loading={loading}
        pagination={false}
      />
      <EditSubCategoryForm
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
      />
    </div>
  );
}

export default SubCategoryList;

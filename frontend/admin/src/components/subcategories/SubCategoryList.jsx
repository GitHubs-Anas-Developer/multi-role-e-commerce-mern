"use client";
import React, { useEffect, useState } from "react";
import { Button, Image, message, Popconfirm, Space, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import SubCategoryHeader from "./SubCategoryHeader";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSubCategory,
  fetchSubcategories,
  getOneSubCategory,
} from "@/redux/slices/subcategory/subcategoryThunk";
import EditSubCategoryForm from "./EditSubCategoryForm";

function SubCategoryList() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const dispatch = useDispatch();

  const { subcategories, loading, error } = useSelector(
    (state) => state.subCategory,
  );

  console.log(" Subcategories from Redux:", subcategories);
  const handleDelete = async (id) => {
    try {
      await dispatch(deleteSubCategory(id)).unwrap();
      message.success("SubCategory deleted successfully 🎉");
      dispatch(fetchSubcategories());
    } catch (err) {
      message.error(err || "Delete failed");
    }
  };

  useEffect(() => {
    dispatch(fetchSubcategories());
  }, [dispatch]);

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
      render: (img) => (img ? <Image width={50} src={img.url} alt="" /> : "No Image"),
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
    <>
      <SubCategoryHeader />
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
    </>
  );
}

export default SubCategoryList;

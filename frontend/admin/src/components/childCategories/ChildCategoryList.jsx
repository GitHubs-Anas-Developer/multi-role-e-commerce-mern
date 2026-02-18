"use client";
import React, { useEffect, useState } from "react";
import ChildCategoryHeader from "./ChildCategoryHeader";
import { Button, Image, message, Popconfirm, Space, Switch, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteChildCategory,
  fetchChildCategories,
  getOneChildCategory,
  updateChildCategory,
} from "@/redux/slices/childcategory/childcategoryThunk";
import EditChildCategoryForm from "./EditChildCategoryForm";

function ChildCategoryList() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const {
    childCategories,
    totalPages,
    currentPage,
    totalChildCategory,
    loading,
    error,
  } = useSelector((state) => state.childCategory);

  const dispatch = useDispatch();

  const handleDelete = async (childId) => {
    try {
      await dispatch(deleteChildCategory(childId)).unwrap();
      message.success("Child category deleted successfully 🎉");
    } catch (error) {
      message.error(error?.message || "Child category delete failed ❌");
    }
  };

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
      render: (subCategory) => subCategory?.name,
    },
    {
      title: "Parent Category",
      dataIndex: "parentCategory",
      key: "parentCategory",
      render: (parentCategory) => parentCategory?.name,
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
      align: "center",
      render: (isActive, record) => (
        <Switch
          checked={isActive}
          checkedChildren="Active"
          unCheckedChildren="Inactive"
          onChange={(checked) => {
            // dispatch update status
            dispatch(
              updateChildCategory({
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
          {/* Edit Button */}
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => {
              setDrawerOpen(!drawerOpen);
              dispatch(getOneChildCategory(record._id));
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
      <ChildCategoryHeader
        currentPage={currentPage}
        pageSize={totalPages}
        totalCategory={totalChildCategory}
        onPageChange={(p) => dispatch(fetchChildCategories(p))}
      />
      <Table
        rowKey="_id"
        loading={loading}
        columns={columns}
        dataSource={Array.isArray(childCategories) ? childCategories : []}
        bordered
        pagination={false}
      />
      <EditChildCategoryForm
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
      />
    </div>
  );
}

export default ChildCategoryList;

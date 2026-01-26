"use client";
import React, { useEffect } from "react";
import { Form, Input, message, Modal, Select, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "@/redux/slices/category/categoryThunks";
import { createSubcategory } from "@/redux/slices/subcategory/subcategoryThunk";

function CreateSubCategoryForm({
  subCategoryFormModel,
  setSubCategoryFormModel,
}) {
  const { categories } = useSelector((state) => state.category);
  const { subcategories, loading, error } = useSelector(
    (state) => state.subCategory
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const categoryOptions = categories?.map((cate) => ({
    label: cate?.name,
    value: cate?._id,
  }));

  const [form] = Form.useForm();

  const handleOk = (values) => {
    const formData = new FormData();
    formData.append("name", values.subCategoryName);
    formData.append("parentCategory", values.parentCategory);
    formData.append("description", values.description || "");
    if (values.image[0]?.originFileObj) {
      formData.append("image", values.image[0].originFileObj);
    }
    dispatch(createSubcategory(formData));
  };

  const handleCancel = () => {
    setSubCategoryFormModel(!subCategoryFormModel); // close modal
    form.resetFields();
  };

  useEffect(() => {
    if (!loading && !error && subCategoryFormModel) {
      message.success("Sub-category created successfully");
      form.resetFields();
      setSubCategoryFormModel(false);
    }

    if (error) {
      message.error(error);
    }
  }, [loading, error, subcategories]);

  return (
    <>
      <Modal
        title="Create New Sub-Category"
        open={subCategoryFormModel}
        onOk={() => form.submit()}
        onCancel={handleCancel}
        okText="Create"
        confirmLoading={loading}
      >
        <Form layout="vertical" form={form} onFinish={handleOk}>
          <Form.Item
            label="Sub-Category Name"
            name="subCategoryName"
            rules={[
              { required: true, message: "Please enter sub-category name!" },
            ]}
          >
            <Input placeholder="e.g., Smartphones, T-Shirts" />
          </Form.Item>

          <Form.Item
            label="Parent Category"
            name="parentCategory"
            rules={[
              { required: true, message: "Please select a parent category!" },
            ]}
          >
            <Select
              placeholder="Select a category"
              options={categoryOptions}
              loading={loading}
            />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <Input.TextArea
              placeholder="Enter sub-category description"
              rows={4}
            />
          </Form.Item>

          <Form.Item
            label="Upload Sub-Category Icon"
            name="image"
            valuePropName="fileList"
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) return e;
              return e?.fileList;
            }}
          >
            <Upload
              listType="picture-card"
              beforeUpload={() => false}
              maxCount={1}
              accept="image/png,image/jpeg,image/jpg"
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default CreateSubCategoryForm;

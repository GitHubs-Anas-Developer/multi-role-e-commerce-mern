"use client";
import React, { use, useEffect } from "react";
import { Form, Input, Modal, Upload, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { createCategory } from "@/redux/slices/category/categoryThunks";

function CreateCategoryForm({ categoryFormModel, setCategoryFormModel }) {
  const { loading, error } = useSelector((state) => state.category);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleOk = (values) => {
    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("description", values.description || "");

    if (values.image && values.image.length > 0) {
      formData.append("image", values.image[0].originFileObj);
    }

    dispatch(createCategory(formData));
  };

  const handleCancel = () => {
    form.resetFields();
    setCategoryFormModel(false);
  };
  useEffect(() => {
    //  SUCCESS TOAST
    if (!loading && !error && categoryFormModel) {
      message.success("Category created successfully ");
      form.resetFields();
      setCategoryFormModel(false);
    }

    //  ERROR TOAST
    if (error) {
      message.error(error);
    }
  }, [loading, error]);

  return (
    <Modal
      title="Create New Category"
      open={categoryFormModel}
      onOk={() => form.submit()}
      onCancel={handleCancel}
      okText="Create"
      confirmLoading={loading}
    >
      <Form layout="vertical" form={form} onFinish={handleOk}>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter category name!" }]}
        >
          <Input placeholder="e.g., Electronics, Fashion" />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input.TextArea rows={4} placeholder="Enter category description" />
        </Form.Item>

        <Form.Item
          label="Upload Category Icon or Image"
          name="image"
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
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
  );
}

export default CreateCategoryForm;

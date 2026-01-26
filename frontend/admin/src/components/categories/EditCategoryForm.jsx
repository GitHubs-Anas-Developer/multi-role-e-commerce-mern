import React, { useEffect } from "react";
import { Button, Drawer, Form, Input, message, Space, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getOneCategory,
  updateCategory,
} from "@/redux/slices/category/categoryThunks";

function EditCategoryForm({ drawerOpen, setDrawerOpen, categoryId }) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const { category, loading, error } = useSelector((state) => state.category);

  // 🔹 Fetch category by ID
  useEffect(() => {
    if (drawerOpen && categoryId) {
      dispatch(getOneCategory(categoryId));
    }
  }, [drawerOpen, categoryId, dispatch]);

  // 🔹 Prefill form when category loaded
  useEffect(() => {
    if (category) {
      form.setFieldsValue({
        name: category.name,
        description: category.description,
        image: category.image
          ? [
              {
                uid: "-1",
                name: "category.png",
                status: "done",
                url: category.image.url,
              },
            ]
          : [],
      });
    }
  }, [category, form]);

  const handleClose = () => {
    setDrawerOpen(false);
    form.resetFields();
  };

  const handleSubmit = (values) => {
    dispatch(updateCategory({ id: category._id, data: values }));

    if ((!category && !loading) || !error) {
      message.success("Category updated successfully ");
      setDrawerOpen(!drawerOpen);
    }
  };

  return (
    <Drawer
      title="Edit Category"
      placement="right"
      onClose={handleClose}
      open={drawerOpen}
      width={500}
      extra={
        <Space>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            type="primary"
            onClick={() => form.submit()}
            loading={loading}
          >
            Update
          </Button>
        </Space>
      }
    >
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Form.Item
          label="Category Name"
          name="name"
          rules={[{ required: true, message: "Name is required" }]}
        >
          <Input placeholder="Enter category name" />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item
          label="Category Image"
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
              <div style={{ marginTop: 8 }}>Update</div>
            </div>
          </Upload>
        </Form.Item>
      </Form>
    </Drawer>
  );
}

export default EditCategoryForm;

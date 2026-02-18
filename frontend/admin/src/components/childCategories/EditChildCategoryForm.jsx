"use client";
import {
  getOneChildCategory,
  updateChildCategory,
} from "@/redux/slices/childcategory/childcategoryThunk";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Drawer,
  Form,
  Input,
  message,
  Select,
  Space,
  Upload,
} from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function EditChildCategoryForm({ drawerOpen, setDrawerOpen }) {
  const { childCategory, optionCategory, optionSubCategory, loading, error } =
    useSelector((state) => state.childCategory);

  console.log(childCategory);

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  // 🔹 Prefill form when category loaded
  useEffect(() => {
    if (childCategory) {
      form.setFieldsValue({
        name: childCategory.name,
        description: childCategory.description,
        parentCategory: childCategory.parentCategory?._id,
        subCategory: childCategory.subCategory?._id,
        image: childCategory.image
          ? [
              {
                uid: "-1",
                name: "category.png",
                status: "done",
                url: childCategory.image.url,
              },
            ]
          : [],
      });
    }
  }, [childCategory, form]);

  const handleSubmit = (values) => {
    dispatch(updateChildCategory({ id: childCategory._id, data: values })).then(
      (data) => {
        console.log("data",data)
        message.success("Child category updated");
        form.resetFields();
        setDrawerOpen(!drawerOpen);
      },
    );
  };

  const handleClose = () => {
    setDrawerOpen(false);
  };
  return (
    <Drawer
      title="Edit Child Category"
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
          label="Child Category Name"
          name="name"
          rules={[{ required: true, message: "Name is required" }]}
        >
          <Input placeholder="Enter Child category name" />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea rows={4} />
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
            options={optionCategory.map((cat) => ({
              label: cat.name,
              value: cat._id,
            }))}
          ></Select>
        </Form.Item>

        <Form.Item
          label="Sub Category"
          name="subCategory"
          rules={[{ required: true, message: "Please select a Sub category!" }]}
        >
          <Select
            placeholder="Select a category"
            options={optionSubCategory.map((sub) => ({
              label: sub.name,
              value: sub._id,
            }))}
          />
        </Form.Item>

        <Form.Item
          label="Image"
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

export default EditChildCategoryForm;

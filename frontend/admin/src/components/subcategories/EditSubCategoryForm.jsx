import { updateSubCategory } from "@/redux/slices/subcategory/subcategoryThunk";
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

function EditSubCategoryForm({ drawerOpen, setDrawerOpen }) {
  const { subcategory, loading, error } = useSelector(
    (state) => state.subCategory
  );

  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    dispatch(updateSubCategory({ id: subcategory._id, data: values }))
      .unwrap()
      .then(() => {
        message.success("SubCategory updated successfully");
        setDrawerOpen(!drawerOpen);
        form.resetFields();
      })
      .catch((err) => {
        message.error(err || "Update failed");
      });

    if ((!loading, !error)) {
      setDrawerOpen(!drawerOpen);
    }
  };

  const handleClose = () => {
    setDrawerOpen(!drawerOpen);
    form.resetFields();
  };

  useEffect(() => {
    if (subcategory) {
      form.setFieldsValue({
        SubCategoryName: subcategory.name,
        description: subcategory.description,
        parentCategory: subcategory.parentCategory,
        image: subcategory.image
          ? [
              {
                uid: "-1",
                name: "sub-category.png",
                status: "done",
                url: subcategory.image.url,
              },
            ]
          : [],
      });
    }
  }, [subcategory, form]);
  return (
    <>
      <Drawer
        title="Edit SubCategory"
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
            label="SubCategory Name"
            name="SubCategoryName"
            rules={[
              { required: true, message: "Subcategory Name is required" },
            ]}
          >
            <Input placeholder="Enter Subcategory name" />
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
              options={"categoryOptions"}
              loading={loading}
            ></Select>
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
    </>
  );
}

export default EditSubCategoryForm;

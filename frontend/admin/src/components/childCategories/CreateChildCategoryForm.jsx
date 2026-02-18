import React, { useEffect } from "react";
import { Form, Input, message, Modal, Select, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "@/redux/slices/category/categoryThunks";
import { fetchSubCategoriesByCategory } from "@/redux/slices/subcategory/subcategoryThunk";
import { createChildCategory } from "@/redux/slices/childcategory/childcategoryThunk";

function CreateChildCategoryForm({
  childCategoryFormModel,
  setChildCategoryFormModel,
}) {
  const { categories } = useSelector((state) => state.category);
  const { subcategories } = useSelector((state) => state.subCategory);
  const { childCategories, loading, error } = useSelector(
    (state) => state.childCategory
  );

  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const categoryOptions = categories?.map((cate) => ({
    label: cate?.name,
    value: cate?._id,
  }));

  const subCategoryOptions = subcategories?.map((sub) => ({
    label: sub?.name,
    value: sub?._id,
  }));

  const selectCategoryValue = (value) => {
    dispatch(fetchSubCategoriesByCategory(value));
  };

  const handleOk = (values) => {
    const formData = new FormData();
    formData.append("name", values.childCategoryName);
    formData.append("description", values.description);
    formData.append("parentCategory", values.parentCategory);
    formData.append("subCategory", values.subCategory);
    if (values.image && values.image.length > 0) {
      formData.append("image", values.image[0].originFileObj);
    }
    dispatch(createChildCategory(formData));
    if (!loading && !error) {
      setChildCategoryFormModel(false);
      form.resetFields();
      message.success("Child-Category created successfully");
    } else {
      message.error("Failed to create Child-Category");
    }
  };

  const handleCancel = () => {
    setChildCategoryFormModel(!childCategoryFormModel); // close modal
  };
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  return (
    <> 
      <Modal
        title="Create New Child-Category"
        open={childCategoryFormModel}
        onOk={() => form.submit()}
        onCancel={handleCancel}
        okText="Create"
       
      >

        <Form layout="vertical" form={form} onFinish={handleOk}>
          <Form.Item
            label="Child-Category Name"
            name="childCategoryName"
            rules={[
              { required: true, message: "Please enter child-category name!" },
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
              onChange={selectCategoryValue}
            />
          </Form.Item>
          <Form.Item
            label="Sub-Category"
            name="subCategory"
            rules={[
              { required: true, message: "Please select a sub category!" },
            ]}
          >
            <Select
              placeholder="Select Sub-category"
              options={subCategoryOptions}
            />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input.TextArea
              placeholder="Enter child-category description"
              rows={4}
            />
          </Form.Item>
          <Form.Item
            label="Upload Child-Category Icon"
            name="image"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
          >
            <Upload
              action="/upload"
              listType="picture-card"
              maxCount={1}
              beforeUpload={() => false}
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

export default CreateChildCategoryForm;

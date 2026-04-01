"use client";

import React, { useEffect, useMemo } from "react";
import {
  Form,
  Input,
  InputNumber,
  Select,
  Button,
  Row,
  Col,
  Divider,
  Upload,
  Card,
  Typography,
  Space,
  message,
} from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "@/redux/slices/product/productThunks";
import { fetchCategories } from "@/redux/slices/category/categoryThunks";
import { fetchSubCategoriesByCategory } from "@/redux/slices/subcategory/subcategoryThunk";
import { fetchChildCategoriesBySubCategory } from "@/redux/slices/childcategory/childcategoryThunk";

const { Title, Text } = Typography;

function ProductCreateForm() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const { categories } = useSelector((state) => state.category);
  const { subcategories } = useSelector((state) => state.subCategory);
  const { childCategories } = useSelector((state) => state.childCategory);
  const { loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const categoryOptions = useMemo(
    () => categories?.map((c) => ({ label: c.name, value: c._id })) || [],
    [categories],
  );

  const subCategoryOptions = useMemo(
    () => subcategories?.map((c) => ({ label: c.name, value: c._id })) || [],
    [subcategories],
  );

  const childCategoryOptions = useMemo(
    () => childCategories?.map((c) => ({ label: c.name, value: c._id })) || [],
    [childCategories],
  );

  const brands = [
    { label: "Apple", value: "apple" },
    { label: "Samsung", value: "samsung" },
    { label: "Nokia", value: "nokia" },
  ];

  const selectCategoryValue = (value) => {
    form.setFieldsValue({ subCategory: null, childCategory: null });
    if (value) dispatch(fetchSubCategoriesByCategory(value));
  };

  const selectSubcategoryValue = (value) => {
    form.setFieldsValue({ childCategory: null });
    if (value) dispatch(fetchChildCategoriesBySubCategory(value));
  };

  const handleValuesChange = (changedValues, allValues) => {
    const { name, mrp, discount, tax } = allValues;

    if ("name" in changedValues && name) {
      const slug = name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");
      form.setFieldsValue({ slug });
    }

    if (
      ("mrp" in changedValues ||
        "discount" in changedValues ||
        "tax" in changedValues) &&
      typeof mrp === "number" &&
      typeof discount === "number"
    ) {
      const basePrice = mrp - (mrp * discount) / 100;
      const finalPrice =
        typeof tax === "number"
          ? basePrice + (basePrice * tax) / 100
          : basePrice;

      form.setFieldsValue({
        price: Math.round(basePrice),
        finalPrice: Math.round(finalPrice),
      });
    }
  };

  const normFile = (e) => {
    if (Array.isArray(e)) return e;
    return e?.fileList || [];
  };

  const uploadProps = {
    beforeUpload: () => false,
    listType: "picture-card",
  };
  const handleSubmit = async (values) => {
    const formData = new FormData();

    Object.keys(values).forEach((key) => {
      if (key === "thumbnail" || key === "images") return;

      const value = values[key];

      if (value === undefined || value === null) return;

      if (Array.isArray(value) || typeof value === "object") {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value);
      }
    });

    if (values.thumbnail?.length) {
      formData.append("thumbnail", values.thumbnail[0].originFileObj);
    }

    if (values.images?.length) {
      values.images.forEach((file) => {
        formData.append("images", file.originFileObj);
      });
    }

    const resultAction = await dispatch(createProduct(formData));

    if (createProduct.fulfilled.match(resultAction)) {
      form.resetFields();
      message.success("Product created successfully");
    } else {
      message.error(
        resultAction.payload?.message || "Failed to create product",
      );
    }
  };
  return (
    <div
      style={{
        height: "100vh",
        overflowY: "auto",
        padding: "16px 16px 100px",
      }}
    >
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col>
          <Title level={3} style={{ marginBottom: 0 }}>
            Create Product
          </Title>
          <Text type="secondary">
            Add a new product with pricing, media, and SEO details.
          </Text>
        </Col>
        <Col>
          <Space>
            <Button onClick={() => form.resetFields()}>Reset</Button>
            <Button type="primary" onClick={() => form.submit()}>
              Save Product
            </Button>
          </Space>
        </Col>
      </Row>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        onValuesChange={handleValuesChange}
      >
        <Row gutter={16} align="stretch">
          <Col xs={24} lg={16}>
            <Card
              bordered={false}
              style={{ marginBottom: 16 }}
              bodyStyle={{ padding: 20 }}
            >
              <div style={{ marginBottom: 8 }}>
                <Text strong>Basic Info</Text>
                <br />
                <Text type="secondary" style={{ fontSize: 12 }}>
                  Core information that appears on product listing and detail
                  page.
                </Text>
              </div>
              <Divider style={{ margin: "12px 0" }} />
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="name"
                    label="Product Name"
                    rules={[{ required: true, message: "Enter product name" }]}
                  >
                    <Input placeholder="e.g. iPhone 15 Pro 256GB" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="slug"
                    label="Slug"
                    rules={[{ required: true, message: "Slug is required" }]}
                  >
                    <Input disabled />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="sku"
                    label="SKU"
                    rules={[{ required: true, message: "Enter SKU" }]}
                  >
                    <Input placeholder="Internal stock keeping unit" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="brand"
                    label="Brand"
                    rules={[{ required: true, message: "Select brand" }]}
                  >
                    <Select
                      allowClear
                      options={brands}
                      placeholder="Select brand"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="tags" label="Tags">
                    <Select
                      mode="tags"
                      placeholder="Type and press enter to add tags"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                name="description"
                label="Description"
                rules={[{ required: true, message: "Enter description" }]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder="Short description shown on product page"
                />
              </Form.Item>
            </Card>

            <Card
              bordered={false}
              style={{ marginBottom: 16 }}
              bodyStyle={{ padding: 20 }}
            >
              <div style={{ marginBottom: 8 }}>
                <Text strong>Categories</Text>
                <br />
                <Text type="secondary" style={{ fontSize: 12 }}>
                  Organize the product into the correct category tree.
                </Text>
              </div>
              <Divider style={{ margin: "12px 0" }} />
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item
                    name="category"
                    label="Category"
                    rules={[{ required: true, message: "Select category" }]}
                  >
                    <Select
                      options={categoryOptions}
                      placeholder="Select"
                      onChange={selectCategoryValue}
                      allowClear
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="subCategory"
                    label="Subcategory"
                    rules={[{ required: true, message: "Select subcategory" }]}
                  >
                    <Select
                      options={subCategoryOptions}
                      placeholder="Select"
                      onChange={selectSubcategoryValue}
                      allowClear
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="childCategory"
                    label="Child Category"
                    rules={[
                      { required: true, message: "Select child category" },
                    ]}
                  >
                    <Select
                      options={childCategoryOptions}
                      placeholder="Select"
                      allowClear
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            <Card
              bordered={false}
              style={{ marginBottom: 16 }}
              bodyStyle={{ padding: 20 }}
            >
              <div style={{ marginBottom: 8 }}>
                <Text strong>Highlights</Text>
                <br />
                <Text type="secondary" style={{ fontSize: 12 }}>
                  Key selling points shown as bullet points on the product page.
                </Text>
              </div>
              <Divider style={{ margin: "12px 0" }} />
              <Form.List name="highlights">
                {(fields, { add, remove }) => (
                  <Space direction="vertical" style={{ width: "100%" }}>
                    {fields.map((field) => (
                      <Row key={field.key} gutter={8} align="middle">
                        <Col flex="auto">
                          <Form.Item
                            name={[field.name]}
                            rules={[
                              { required: true, message: "Enter highlight" },
                            ]}
                          >
                            <Input placeholder="e.g. 120Hz OLED display" />
                          </Form.Item>
                        </Col>
                        <Col>
                          <Button
                            danger
                            type="text"
                            icon={<DeleteOutlined />}
                            onClick={() => remove(field.name)}
                          />
                        </Col>
                      </Row>
                    ))}
                    <Button
                      type="dashed"
                      icon={<PlusOutlined />}
                      onClick={() => add()}
                      block
                    >
                      Add highlight
                    </Button>
                  </Space>
                )}
              </Form.List>
            </Card>

            <Card
              bordered={false}
              style={{ marginBottom: 16 }}
              bodyStyle={{ padding: 20 }}
            >
              <div style={{ marginBottom: 8 }}>
                <Text strong>Specifications</Text>
                <br />
                <Text type="secondary" style={{ fontSize: 12 }}>
                  Technical details like RAM, storage, battery, etc.
                </Text>
              </div>
              <Divider style={{ margin: "12px 0" }} />
              <Form.List name="specifications">
                {(fields, { add, remove }) => (
                  <Space direction="vertical" style={{ width: "100%" }}>
                    {fields.map((field) => (
                      <Row key={field.key} gutter={8} align="middle">
                        <Col span={10}>
                          <Form.Item
                            name={[field.name, "name"]}
                            style={{ marginBottom: 8 }}
                            rules={[
                              { required: true, message: "Enter spec name" },
                            ]}
                          >
                            <Input placeholder="Name (e.g. RAM)" />
                          </Form.Item>
                        </Col>
                        <Col span={10}>
                          <Form.Item
                            name={[field.name, "value"]}
                            style={{ marginBottom: 8 }}
                            rules={[
                              { required: true, message: "Enter spec value" },
                            ]}
                          >
                            <Input placeholder="Value (e.g. 8GB)" />
                          </Form.Item>
                        </Col>
                        <Col span={4}>
                          <Button
                            danger
                            type="text"
                            icon={<DeleteOutlined />}
                            onClick={() => remove(field.name)}
                          />
                        </Col>
                      </Row>
                    ))}
                    <Button
                      type="dashed"
                      icon={<PlusOutlined />}
                      onClick={() => add()}
                      block
                    >
                      Add specification
                    </Button>
                  </Space>
                )}
              </Form.List>
            </Card>
          </Col>

          <Col xs={24} lg={8}>
            <Card
              bordered={false}
              style={{ marginBottom: 16 }}
              bodyStyle={{ padding: 20 }}
            >
              <div style={{ marginBottom: 8 }}>
                <Text strong>Pricing & Stock</Text>
                <br />
                <Text type="secondary" style={{ fontSize: 12 }}>
                  Base pricing, discount and inventory.
                </Text>
              </div>
              <Divider style={{ margin: "12px 0" }} />
              <Row gutter={8}>
                <Col span={12}>
                  <Form.Item
                    name="mrp"
                    label="MRP"
                    rules={[{ required: true, message: "Enter MRP" }]}
                  >
                    <InputNumber
                      style={{ width: "100%" }}
                      min={0}
                      placeholder="0.00"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="discount"
                    label="Discount %"
                    rules={[{ required: true, message: "Enter discount" }]}
                  >
                    <InputNumber
                      style={{ width: "100%" }}
                      min={0}
                      max={100}
                      placeholder="0"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={8}>
                <Col span={12}>
                  <Form.Item name="price" label="Price">
                    <InputNumber
                      disabled
                      style={{ width: "100%" }}
                      placeholder="Auto"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="finalPrice" label="Final Price">
                    <InputNumber
                      disabled
                      style={{ width: "100%" }}
                      placeholder="Auto"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={8}>
                <Col span={12}>
                  <Form.Item name="tax" label="Tax %">
                    <InputNumber
                      style={{ width: "100%" }}
                      min={0}
                      max={100}
                      placeholder="0"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="stock"
                    label="Stock"
                    rules={[{ required: true, message: "Enter stock" }]}
                  >
                    <InputNumber style={{ width: "100%" }} min={0} />
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            <Card
              bordered={false}
              style={{ marginBottom: 16 }}
              bodyStyle={{ padding: 20 }}
            >
              <div style={{ marginBottom: 8 }}>
                <Text strong>Variants</Text>
                <br />
                <Text type="secondary" style={{ fontSize: 12 }}>
                  Different options like color and size with their own stock.
                </Text>
              </div>
              <Divider style={{ margin: "12px 0" }} />
              <Form.List name="variants">
                {(fields, { add, remove }) => (
                  <Space direction="vertical" style={{ width: "100%" }}>
                    {fields.map((field) => (
                      <Card
                        key={field.key}
                        size="small"
                        style={{ background: "#fafafa" }}
                        bodyStyle={{ padding: 12 }}
                      >
                        <Row gutter={8}>
                          <Col span={12}>
                            <Form.Item
                              name={[field.name, "name"]}
                              label="Variant Name"
                              rules={[
                                {
                                  required: true,
                                  message: "Enter variant name",
                                },
                              ]}
                            >
                              <Input placeholder="Color / Size" />
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item
                              name={[field.name, "value"]}
                              label="Value"
                              rules={[
                                {
                                  required: true,
                                  message: "Enter variant value",
                                },
                              ]}
                            >
                              <Input placeholder="Red / XL" />
                            </Form.Item>
                          </Col>
                        </Row>
                        <Row gutter={8}>
                          <Col span={12}>
                            <Form.Item
                              name={[field.name, "price"]}
                              label="Price"
                            >
                              <InputNumber style={{ width: "100%" }} />
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item
                              name={[field.name, "stock"]}
                              label="Stock"
                            >
                              <InputNumber style={{ width: "100%" }} />
                            </Form.Item>
                          </Col>
                        </Row>
                        <Button
                          danger
                          type="link"
                          size="small"
                          icon={<DeleteOutlined />}
                          onClick={() => remove(field.name)}
                          style={{ padding: 0 }}
                        >
                          Remove variant
                        </Button>
                      </Card>
                    ))}
                    <Button
                      type="dashed"
                      icon={<PlusOutlined />}
                      onClick={() => add()}
                      block
                    >
                      Add variant
                    </Button>
                  </Space>
                )}
              </Form.List>
            </Card>

            <Card
              bordered={false}
              style={{ marginBottom: 16 }}
              bodyStyle={{ padding: 20 }}
            >
              <div style={{ marginBottom: 8 }}>
                <Text strong>Media</Text>
                <br />
                <Text type="secondary" style={{ fontSize: 12 }}>
                  Upload thumbnail and gallery images.
                </Text>
              </div>
              <Divider style={{ margin: "12px 0" }} />

              <Form.Item
                name="thumbnail"
                label="Thumbnail"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                rules={[{ required: true, message: "Upload thumbnail" }]}
              >
                <Upload.Dragger {...uploadProps} maxCount={1}>
                  <Space direction="vertical">
                    <UploadOutlined />
                    <Text>Click or drag thumbnail here</Text>
                  </Space>
                </Upload.Dragger>
              </Form.Item>

              <Form.Item
                name="images"
                label="Product Images"
                valuePropName="fileList"
                getValueFromEvent={normFile}
              >
                <Upload.Dragger {...uploadProps} multiple maxCount={8}>
                  <Space direction="vertical">
                    <UploadOutlined />
                    <Text>Click or drag images here</Text>
                  </Space>
                </Upload.Dragger>
              </Form.Item>
            </Card>

            <Card
              bordered={false}
              style={{ marginBottom: 16 }}
              bodyStyle={{ padding: 20 }}
            >
              <div style={{ marginBottom: 8 }}>
                <Text strong>Shipping</Text>
                <br />
                <Text type="secondary" style={{ fontSize: 12 }}>
                  Dimensions and shipping rules.
                </Text>
              </div>
              <Divider style={{ margin: "12px 0" }} />
              <Row gutter={8}>
                <Col span={12}>
                  <Form.Item name={["shipping", "weight"]} label="Weight (kg)">
                    <InputNumber style={{ width: "100%" }} min={0} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name={["shipping", "shippingCost"]} label="Cost">
                    <InputNumber style={{ width: "100%" }} min={0} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={8}>
                <Col span={8}>
                  <Form.Item name={["shipping", "length"]} label="Length">
                    <InputNumber style={{ width: "100%" }} min={0} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name={["shipping", "width"]} label="Width">
                    <InputNumber style={{ width: "100%" }} min={0} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name={["shipping", "height"]} label="Height">
                    <InputNumber style={{ width: "100%" }} min={0} />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                name={["shipping", "freeShipping"]}
                label="Free Shipping"
              >
                <Select
                  allowClear
                  options={[
                    { label: "Yes", value: true },
                    { label: "No", value: false },
                  ]}
                />
              </Form.Item>
            </Card>

            <Card
              bordered={false}
              style={{ marginBottom: 16 }}
              bodyStyle={{ padding: 20 }}
            >
              <div style={{ marginBottom: 8 }}>
                <Text strong>Policies & SEO</Text>
              </div>
              <Divider style={{ margin: "12px 0" }} />
              <Form.Item name="warranty" label="Warranty">
                <Input placeholder="e.g. 1 year manufacturer warranty" />
              </Form.Item>
              <Form.Item name="returnPolicy" label="Return Policy">
                <Input placeholder="e.g. 7-day replacement only" />
              </Form.Item>
              <Form.Item name="metaTitle" label="Meta Title">
                <Input placeholder="SEO title for search engines" />
              </Form.Item>
              <Form.Item name="metaDescription" label="Meta Description">
                <Input.TextArea
                  rows={3}
                  placeholder="Short SEO description for search engines"
                />
              </Form.Item>
            </Card>

            <div
              style={{
                position: "sticky",
                bottom: 0,
                padding: "8px 0 0",
                background:
                  "linear-gradient(to top, rgba(245,245,245,1), rgba(245,245,245,0))",
              }}
            >
              <Card
                bordered={false}
                bodyStyle={{ padding: 12, textAlign: "right" }}
              >
                <Space>
                  <Button onClick={() => form.resetFields()}>Reset</Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    block
                  >
                    {loading ? "Submitting..." : "Submit"}
                  </Button>
                </Space>
              </Card>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default ProductCreateForm;

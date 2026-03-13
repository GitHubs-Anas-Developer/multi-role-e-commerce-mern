"use client";

import React from "react";
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
} from "antd";

import {
  PlusOutlined,
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";

function ProductCreateForm() {
  const [form] = Form.useForm();

  const brands = [
    { label: "Apple", value: "apple" },
    { label: "Samsung", value: "samsung" },
    { label: "Nokia", value: "nokia" },
  ];

  const categories = [
    { label: "Mobiles", value: "mobiles" },
    { label: "Laptop", value: "laptop" },
    { label: "Camera", value: "camera" },
  ];

  const handleValuesChange = (changedValues, allValues) => {
    const { mrp, discount, tax, productName } = allValues;

    // slug auto
    if (changedValues.productName) {
      const slug = productName?.toLowerCase().trim().replace(/\s+/g, "-");

      form.setFieldsValue({
        productSlug: slug,
      });
    }

    // price calculation
    if (mrp && discount !== undefined) {
      const price = mrp - (mrp * discount) / 100;

      let finalPrice = price;

      if (tax) {
        finalPrice = price + (price * tax) / 100;
      }

      form.setFieldsValue({
        price: Math.round(price),
        finalPrice: Math.round(finalPrice),
      });
    }
  };

  const uploadProps = {
    beforeUpload: () => false,
    listType: "picture",
  };

  return (
    <Card
      title="Create Product"
      style={{
        maxHeight: "85vh",
        overflowY: "auto",
        borderRadius: 10,
      }}
      bodyStyle={{ padding: 25 }}
    >
      <Form form={form} layout="vertical" onValuesChange={handleValuesChange}>
        {/* BASIC INFO */}

        <Divider orientation="left">Basic Information</Divider>

        <Row gutter={20}>
          <Col span={8}>
            <Form.Item
              label="Product Name"
              name="productName"
              rules={[{ required: true }]}
            >
              <Input placeholder="Enter product name" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Product Slug" name="productSlug">
              <Input disabled />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Brand" name="brand" rules={[{ required: true }]}>
              <Select options={brands} placeholder="Select brand" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={20}>
          <Col span={8}>
            <Form.Item label="Category" name="category">
              <Select options={categories} />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Sub Category" name="subCategory">
              <Input placeholder="Sub category" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Child Category" name="childCategory">
              <Input placeholder="Child category" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Product Description"
          name="description"
          rules={[{ required: true }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        {/* PRICING */}

        <Divider orientation="left">Pricing</Divider>

        <Row gutter={20}>
          <Col span={5}>
            <Form.Item label="MRP" name="mrp">
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col span={5}>
            <Form.Item label="Discount %" name="discount">
              <InputNumber style={{ width: "100%" }} min={0} max={100} />
            </Form.Item>
          </Col>

          <Col span={5}>
            <Form.Item label="Price" name="price">
              <InputNumber disabled style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col span={4}>
            <Form.Item label="Tax %" name="tax">
              <InputNumber min={0} max={28} style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col span={5}>
            <Form.Item label="Final Price" name="finalPrice">
              <InputNumber disabled style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>

        {/* IMAGES */}

        <Divider orientation="left">Images</Divider>

        <Row gutter={20}>
          <Col span={8}>
            <Form.Item
              label="Thumbnail"
              name="thumbnail"
              rules={[{ required: true }]}
            >
              <Upload.Dragger {...uploadProps} maxCount={1}>
                <UploadOutlined />
                <p>Upload Thumbnail</p>
              </Upload.Dragger>
            </Form.Item>
          </Col>

          <Col span={16}>
            <Form.Item label="Product Images" name="images">
              <Upload.Dragger {...uploadProps} multiple maxCount={8}>
                <UploadOutlined />
                <p>Upload Product Images</p>
              </Upload.Dragger>
            </Form.Item>
          </Col>
        </Row>

        {/* VARIANTS */}

        <Divider orientation="left">Variants</Divider>

        <Form.List name="variants">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field) => (
                <Row gutter={20} key={field.key}>
                  <Col span={6}>
                    <Form.Item
                      {...field}
                      label="Variant Name"
                      name={[field.name, "name"]}
                    >
                      <Input placeholder="Color / Size" />
                    </Form.Item>
                  </Col>

                  <Col span={6}>
                    <Form.Item
                      {...field}
                      label="Value"
                      name={[field.name, "value"]}
                    >
                      <Input placeholder="Red / XL" />
                    </Form.Item>
                  </Col>

                  <Col span={5}>
                    <Form.Item
                      {...field}
                      label="Variant Price"
                      name={[field.name, "price"]}
                    >
                      <InputNumber style={{ width: "100%" }} />
                    </Form.Item>
                  </Col>

                  <Col span={5}>
                    <Form.Item
                      {...field}
                      label="Stock"
                      name={[field.name, "stock"]}
                    >
                      <InputNumber style={{ width: "100%" }} />
                    </Form.Item>
                  </Col>

                  <Col span={2}>
                    <Button
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => remove(field.name)}
                      style={{ marginTop: 30 }}
                    />
                  </Col>
                </Row>
              ))}

              <Button
                type="dashed"
                icon={<PlusOutlined />}
                onClick={() => add()}
                style={{ marginTop: 10 }}
              >
                Add Variant
              </Button>
            </>
          )}
        </Form.List>

        <Divider orientation="left">Specifications</Divider>

        <Form.List name="specifications">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field) => (
                <Row gutter={16} key={field.key} align="middle">
                  <Col span={10}>
                    <Form.Item
                      {...field}
                      label="Specification Name"
                      name={[field.name, "name"]}
                      rules={[
                        { required: true, message: "Enter specification name" },
                      ]}
                    >
                      <Input placeholder="Example: RAM / Display / Battery" />
                    </Form.Item>
                  </Col>

                  <Col span={10}>
                    <Form.Item
                      {...field}
                      label="Specification Value"
                      name={[field.name, "value"]}
                      rules={[{ required: true, message: "Enter value" }]}
                    >
                      <Input placeholder="Example: 8GB / 6.7 inch / 5000mAh" />
                    </Form.Item>
                  </Col>

                  <Col span={4}>
                    <Button
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => remove(field.name)}
                      style={{ marginTop: 30 }}
                    />
                  </Col>
                </Row>
              ))}

              <Button
                type="dashed"
                icon={<PlusOutlined />}
                onClick={() => add()}
                style={{ marginTop: 10 }}
              >
                Add Specification
              </Button>
            </>
          )}
        </Form.List>

        {/* SHIPPING */}

        <Divider orientation="left">Shipping</Divider>

        <Row gutter={20}>
          <Col span={6}>
            <Form.Item label="Weight (kg)" name="weight">
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item label="Length" name="length">
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item label="Width" name="width">
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item label="Height" name="height">
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={20}>
          <Col span={6}>
            <Form.Item label="Shipping Cost" name="shippingCost">
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item label="Free Shipping" name="freeShipping">
              <Select
                options={[
                  { label: "Yes", value: true },
                  { label: "No", value: false },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>

        <Divider />

        <Button
          type="primary"
          size="large"
          block
          style={{
            height: 45,
            fontWeight: 600,
          }}
        >
          Create Product
        </Button>
      </Form>
    </Card>
  );
}

export default ProductCreateForm;

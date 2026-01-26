"use client";

import React from "react";
import {
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Space,
  Row,
  Col,
  Upload,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";

function VendorCreateForm({ vendorFormModel, setVendorFormModel }) {
  const handleOk = () => {};
  const handleCancel = () => {
    setVendorFormModel(!vendorFormModel);
  };

  return (
    <Modal
      title="Create Vendor"
      open={vendorFormModel}
      onOk={handleOk}
      onCancel={handleCancel}
      width={1000}
    >
      <Form layout="vertical">
        {/* Basic Details */}
        <h3 className="font-bold mb-4">Basic Details</h3>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Business Name / Store Name"
              name="businessName"
              rules={[
                { required: true, message: "Please enter business name" },
              ]}
            >
              <Input placeholder="Business Name / Store Name" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Owner Name"
              name="ownerName"
              rules={[{ required: true, message: "Please enter owner name" }]}
            >
              <Input placeholder="e.g., Brendan Eich" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Enter valid email",
                },
              ]}
            >
              <Input placeholder="example@mail.com" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Mobile Number"
              name="mobileNumber"
              rules={[{ required: true, message: "Please enter phone number" }]}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Enter strong password" }]}
            >
              <Input.Password />
            </Form.Item>
          </Col>
        </Row>

        {/* Business Details */}
        <h3 className="font-bold  mb-4">Business Details</h3>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              label="Business Type"
              name="businessType"
              rules={[{ required: true }]}
            >
              <Select
                placeholder="Select business type"
                options={[
                  { label: "Individual", value: "Individual" },
                  { label: "Company", value: "Company" },
                ]}
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Location">
              <Space.Compact style={{ width: "100%" }}>
                <Form.Item
                  name={["location", "province"]}
                  noStyle
                  rules={[{ required: true, message: "Province required" }]}
                >
                  <Select
                    placeholder="Province"
                    options={[
                      { label: "Zhejiang", value: "Zhejiang" },
                      { label: "Jiangsu", value: "Jiangsu" },
                    ]}
                  />
                </Form.Item>

                <Form.Item
                  name={["location", "street"]}
                  noStyle
                  rules={[{ required: true, message: "Street required" }]}
                >
                  <Input placeholder="Street" />
                </Form.Item>
              </Space.Compact>
            </Form.Item>
          </Col>
        </Row>

        {/* Document  Upload KYC */}
        <h3 className="font-bold  mb-4"> Document Upload (KYC) </h3>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Identity Proof (Any one)"
              name="identityProof"
              rules={[
                { required: true, message: "Please upload identity proof" },
              ]}
            >
              <Upload.Dragger
                name="file"
                multiple={false}
                accept=".jpg,.jpeg,.png,.pdf"
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to upload</p>
                <p className="ant-upload-hint">
                  Upload Voter ID, Passport, Driving License, Aadhaar, or other
                  valid ID (JPG, PNG, PDF)
                </p>
              </Upload.Dragger>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Business Proof (Any one)"
              name="businessProof "
              rules={[
                { required: true, message: "Please upload business proof " },
              ]}
            >
              <Upload.Dragger
                name="file"
                multiple={false}
                accept=".jpg,.jpeg,.png,.pdf"
                style={50}
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to upload</p>
                <p className="ant-upload-hint">
                  Trade License, Business Registration Certificate, Shope
                  License (JPG, PNG, PDF)
                </p>
              </Upload.Dragger>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default VendorCreateForm;

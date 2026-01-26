"use client";
import React from "react";
import { Row, Col, Card, Table } from "antd";
import {
  DollarOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import {
  BarChartOutlined,
  StarOutlined,
  CommentOutlined,
} from "@ant-design/icons";

// Sample Recent Orders Data
const recentOrders = [
  {
    key: 1,
    order: "#1001",
    customer: "John Doe",
    status: "Delivered",
    amount: "₹1200",
  },
  {
    key: 2,
    order: "#1002",
    customer: "Jane Smith",
    status: "Pending",
    amount: "₹850",
  },
  {
    key: 3,
    order: "#1003",
    customer: "Mike Ross",
    status: "Cancelled",
    amount: "₹450",
  },
];

const columns = [
  { title: "Order ID", dataIndex: "order", key: "order" },
  { title: "Customer", dataIndex: "customer", key: "customer" },
  { title: "Status", dataIndex: "status", key: "status" },
  { title: "Amount", dataIndex: "amount", key: "amount" },
];

function Dashboard() {
  return (
    <>
      {/* TOP STATS */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Card title="Total Sales" extra={<DollarOutlined />}>
            ₹ 45,000
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card title="Total Orders" extra={<ShoppingCartOutlined />}>
            120
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card title="Total Visitors" extra={<UserOutlined />}>
            320
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card title="Total Products" extra={<AppstoreOutlined />}>
            85
          </Card>
        </Col>
      </Row>

      {/* MIDDLE SECTION */}
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} md={16}>
          <Card
            title="Sales Analytics"
            extra={<BarChartOutlined />}
            style={{ minHeight: 200 }}
          >
            {/* Add Chart Here */}
            Chart Placeholder
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card
            title="Top Categories"
            extra={<StarOutlined />}
            style={{ minHeight: 200 }}
          >
            Electronics <br />
            Fashion <br />
            Mobiles <br />
            Home Appliances
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} md={8}>
          <Card
            title="Best Vendors"
            extra={<StarOutlined />}
            style={{ minHeight: 200 }}
          >
            Vendor A <br />
            Vendor B <br />
            Vendor C
          </Card>
        </Col>
        <Col xs={24} md={16}>
          <Card
            title="Top Products"
            extra={<AppstoreOutlined />}
            style={{ minHeight: 200 }}
          >
            Product A <br />
            Product B <br />
            Product C
          </Card>
        </Col>
      </Row>

      {/* RECENT ORDERS */}
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col span={24}>
          <Card title="Recent Orders" extra={<ShoppingCartOutlined />}>
            <Table
              dataSource={recentOrders}
              columns={columns}
              pagination={false}
            />
          </Card>
        </Col>
      </Row>

      {/* NEW COMMENTS */}
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col span={24}>
          <Card title="New Comments" extra={<CommentOutlined />}>
            User1: Great product! <br />
            User2: Delivery was fast. <br />
            User3: Loved it!
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Dashboard;

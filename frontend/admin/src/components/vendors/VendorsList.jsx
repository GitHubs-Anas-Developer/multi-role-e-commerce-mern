"use client";
import { Button, Popconfirm, Space, Table, Tag } from "antd";
import React from "react";
import VenderHeader from "./VenderHeader";

function VendorsList() {
  const handleStatus = (id, status) => {
    console.log("Vendor ID:", id, "Status:", status);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Vendor Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Phone Number",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Shop Logo",
      dataIndex: "logo",
      key: "logo",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "gold";
        if (status === "approved") color = "green";
        if (status === "rejected") color = "red";

        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Register Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Popconfirm
            title="Approve this vendor?"
            onConfirm={() => handleStatus(record.id, "approved")}
          >
            <Button type="primary" disabled={record.status === "approved"}>
              Approve
            </Button>
          </Popconfirm>

          <Popconfirm
            title="Reject this vendor?"
            onConfirm={() => handleStatus(record.id, "rejected")}
          >
            <Button danger disabled={record.status === "rejected"}>
              Reject
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const data = [
    {
      id: 123,
      name: "Anas Store",
      number: "989559625",
      email: "anascodingdeveloper@gmail.com",
      logo: "Apple",
      status: "pending",
      date: new Date().toLocaleDateString(),
    },
  ];

  return (
    <>
      <VenderHeader />
      <Table columns={columns} dataSource={data} rowKey="id" bordered />
    </>
  );
}

export default VendorsList;

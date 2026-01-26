import React, { useState } from "react";
import { Card, Input, Select, Row, Col, Button, Pagination } from "antd";

const { Search } = Input;
const { Option } = Select;

function Filter() {
  const [page, setPage] = useState(1);

  const totalRecords = 50;
  const pageSize = 10;

  return (
    <Card style={{ marginBottom: 16, width: "100%" }}>
      <Row gutter={[16, 16]} align="middle">
        {/* Search */}
        <Col xs={24} sm={24} md={10} lg={9}>
          <Search placeholder="Search..." allowClear />
        </Col>

        {/* Status */}
        <Col xs={24} sm={12} md={5} lg={5}>
          <Select placeholder="Status" allowClear style={{ width: "100%" }}>
            <Option value="active">Active</Option>
            <Option value="inactive">Inactive</Option>
          </Select>
        </Col>

        {/* Reset */}
        <Col xs={24} sm={12} md={4} lg={4}>
          <Button block>Reset</Button>
        </Col>

        {/* Pagination */}
        <Col xs={24} sm={24} md={5} lg={6} style={{ textAlign: "right" }}>
          <Pagination
            current={page}
            total={totalRecords}
            pageSize={pageSize}
            showSizeChanger={false}
            onChange={(p) => setPage(p)}
          />
        </Col>
      </Row>
    </Card>
  );
}

export default Filter;

import React from "react";
import { Card, Input, Select, Row, Col, Button, Pagination } from "antd";
import { useDispatch } from "react-redux";

import {
  fetchCategories,
  filterStatusCategory,
  searchCategory,
} from "@/redux/slices/category/categoryThunks";
import { filterStatusSubCategory, searchSubCategory } from "@/redux/slices/subcategory/subcategoryThunk";
import { filterStatusChildCategory, searchChildCategory } from "@/redux/slices/childcategory/childcategoryThunk";

const { Search } = Input;
const { Option } = Select;

function Filter({ title, currentPage, pageSize, totalCategory, onPageChange }) {
  const dispatch = useDispatch();

  // Search
  const onSearch = (value) => {
    if (title === "categories") dispatch(searchCategory(value));
    if (title === "sub-Categories") dispatch(searchSubCategory(value));
    if (title === "child-Categories") dispatch(searchChildCategory(value));
  };

  // Status filter
  const handleSelect = (value) => {
    if (!value) {
      dispatch(fetchCategories());
      return;
    }
    if (title === "categories") dispatch(filterStatusCategory(value));
    if (title === "sub-Categories") dispatch(filterStatusSubCategory(value));
    if (title === "child-Categories") dispatch(filterStatusChildCategory(value));
  };

  // Reset
  const handleReset = () => {
    dispatch(fetchCategories());
    onPageChange(1);
  };

  return (
    <Card style={{ marginBottom: 16, width: "100%" }}>
      <Row gutter={[16, 16]} align="middle">
        {/* Search */}
        <Col xs={24} sm={24} md={10} lg={9}>
          <Search placeholder="Search..." allowClear onSearch={onSearch} />
        </Col>

        {/* Status */}
        <Col xs={24} sm={12} md={5} lg={5}>
          <Select
            placeholder="Status"
            allowClear
            style={{ width: "100%" }}
            onChange={handleSelect}
          >
            <Option value="active">Active</Option>
            <Option value="inactive">Inactive</Option>
          </Select>
        </Col>

        {/* Reset */}
        <Col xs={24} sm={12} md={4} lg={4}>
          <Button block onClick={handleReset}>
            Reset
          </Button>
        </Col>

        {/* Pagination */}
        <Col xs={24} sm={24} md={5} lg={6} style={{ textAlign: "right" }}>
          <Pagination
            current={currentPage}
            pageSize={10}
            onChange={onPageChange}
            total={totalCategory}
            showSizeChanger={false}
          />
        </Col>
      </Row>
    </Card>
  );
}

export default Filter;

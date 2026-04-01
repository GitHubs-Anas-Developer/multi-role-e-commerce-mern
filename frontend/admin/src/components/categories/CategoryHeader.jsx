"use client";
import { Button, Flex, Pagination, Space } from "antd";
import React, { useEffect, useState } from "react";
import CreateCategoryForm from "./CreateCategoryForm";
import StatsCard from "../common/StatsCard";
import { IoIosAddCircleOutline } from "react-icons/io";
import Filter from "../common/Filter";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "@/redux/slices/category/categoryThunks";
function CategoryHeader({
  currentPage,
  pageSize,
  totalCategory,
  onPageChange,
  activeCategoryCount,
  inactiveCategoryCount,
  loading,
}) {
  const [categoryFormModel, setCategoryFormModel] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <h3 className="font-bold text-2xl">Categories</h3>
        {/* Button */}
        <Space>
          <Button
            onClick={() => setCategoryFormModel(!categoryFormModel)}
            type="primary"
          >
            <IoIosAddCircleOutline size={25} /> Create New Category
          </Button>
        </Space>

        <CreateCategoryForm
          categoryFormModel={categoryFormModel}
          setCategoryFormModel={setCategoryFormModel}
        />
      </div>
      <Flex>
        <StatsCard
          title="Categories"
          loading={loading}
          totalCount={totalCategory}
          activeCount={activeCategoryCount}
          inactiveCount={inactiveCategoryCount}
        />
      </Flex>
      <Flex
        justify="space-evenly"
        align="center"
        style={{ width: "100%", padding: "20px" }}
      >
        <Filter
          title="categories"
          currentPage={currentPage}
          pageSize={pageSize}
          totalCategory={totalCategory}
          onPageChange={onPageChange}
        />
      </Flex>
    </>
  );
}

export default CategoryHeader;

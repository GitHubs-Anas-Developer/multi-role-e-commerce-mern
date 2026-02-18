"use client";
import { Button, Flex, Space } from "antd";
import React, { useEffect, useState } from "react";
import CreateSubCategoryForm from "./CreateSubCategoryForm";
import Filter from "../common/Filter";
import StatsCard from "../common/StatsCard";
import { fetchSubcategories } from "@/redux/slices/subcategory/subcategoryThunk";
import { useDispatch, useSelector } from "react-redux";
import { IoIosAddCircleOutline } from "react-icons/io";

function SubCategoryHeader({
  currentPage,
  pageSize,
  totalSubCategory,
  onPageChange,
}) {
  const [subCategoryFormModel, setSubCategoryFormModel] = useState(false);

  const {
    subcategories,
    activeSubCategoryCount,
    inactiveSubCategoryCount,
    loading,
  } = useSelector((state) => state.subCategory);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSubcategories());
  }, [dispatch]);

  return (
    <div style={{ width: "100%" }}>
      {/* Header Row: Title + Button */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <h3 style={{ fontWeight: "bold", fontSize: 24 }}>SubCategories</h3>

        <Space>
          <Button
            type="primary"
            onClick={() => setSubCategoryFormModel(!subCategoryFormModel)}
          >
            <IoIosAddCircleOutline size={25} /> Create New Sub-Category
          </Button>
        </Space>
      </div>

      <Flex>
        <StatsCard
          title="Sub Categories"
          loading={loading}
          totalCount={totalSubCategory}
          activeCount={activeSubCategoryCount}
          inactiveCount={inactiveSubCategoryCount}
        />
      </Flex>
      <Flex
        justify="space-evenly"
        align="center"
        style={{ width: "100%", padding: "20px" }}
      >
        <Filter
          title="sub-Categories"
          currentPage={currentPage}
          pageSize={pageSize}
          totalCategory={totalSubCategory}
          onPageChange={onPageChange}
        />
      </Flex>

      {/* Modal Form */}
      <CreateSubCategoryForm
        subCategoryFormModel={subCategoryFormModel}
        setSubCategoryFormModel={setSubCategoryFormModel}
      />
    </div>
  );
}

export default SubCategoryHeader;

"use client";
import { Button, Flex, Space } from "antd";
import React, { useEffect, useState } from "react";
import CreateChildCategoryForm from "./CreateChildCategoryForm";
import StatsCard from "../common/StatsCard";
import Filter from "../common/Filter";
import { fetchChildCategories } from "@/redux/slices/childcategory/childcategoryThunk";
import { useDispatch, useSelector } from "react-redux";
import { IoIosAddCircleOutline } from "react-icons/io";

function ChildCategoryHeader({
  currentPage,
  pageSize,
  totalCategory,
  onPageChange,
}) {
  const [childCategoryFormModel, setChildCategoryFormModel] = useState(false);

  const {
    totalChildCategory,
    activeChildCategoryCount,
    inactiveChildCategoryCount,
    loading,
  } = useSelector((state) => state.childCategory);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchChildCategories());
  }, [dispatch]);

  return (
    <div style={{ width: "100%" }}>
      {/* Header Row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <h3 style={{ fontWeight: "bold", fontSize: 24 }}> Child Categories</h3>

        <Space>
          <Button
            type="primary"
            onClick={() => setChildCategoryFormModel(!childCategoryFormModel)}
          >
            <IoIosAddCircleOutline size={25} /> Create New Child Category
          </Button>
        </Space>
      </div>

      <Flex>
        <StatsCard
          loading={loading}
          title="Child Categories"
          totalCount={totalChildCategory}
          activeCount={activeChildCategoryCount}
          inactiveCount={inactiveChildCategoryCount}
        />
      </Flex>
      <Flex
        justify="space-evenly"
        align="center"
        style={{ width: "100%", padding: "20px" }}
      >
        <Filter
          title="child-Categories"
          currentPage={currentPage}
          pageSize={pageSize}
          totalCategory={totalCategory}
          onPageChange={onPageChange}
        />
      </Flex>

      {/* Modal */}
      <CreateChildCategoryForm
        childCategoryFormModel={childCategoryFormModel}
        setChildCategoryFormModel={setChildCategoryFormModel}
      />
    </div>
  );
}

export default ChildCategoryHeader;

"use client";
import { Button, Flex, Space } from "antd";
import React, { useState } from "react";
import CreateSubCategoryForm from "./CreateSubCategoryForm";
import Filter from "../common/Filter";
import StatsCard from "../common/StatsCard";

function SubCategoryHeader() {
  const [subCategoryFormModel, setSubCategoryFormModel] = useState(false);

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
            Create New Sub-Category
          </Button>
        </Space>
      </div>

      <Flex>
        <StatsCard />
      </Flex>
      <Flex
        justify="space-evenly"
        align="center"
        style={{ width: "100%", padding: "20px" }}
      >
        <Filter />
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

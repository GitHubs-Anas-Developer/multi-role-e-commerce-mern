"use client";
import { Button, Flex, Space } from "antd";
import React, { useState } from "react";
import CreateChildCategoryForm from "./CreateChildCategoryForm";
import StatsCard from "../common/StatsCard";
import Filter from "../common/Filter";

function ChildCategoryHeader() {
  const [childCategoryFormModel, setChildCategoryFormModel] = useState(false);

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
        <h3 style={{ fontWeight: "bold", fontSize: 24 }}>Child Categories</h3>

        <Space>
          <Button
            type="primary"
            onClick={() => setChildCategoryFormModel(!childCategoryFormModel)}
          >
            Create New Child Category
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

      {/* Modal */}
      <CreateChildCategoryForm
        childCategoryFormModel={childCategoryFormModel}
        setChildCategoryFormModel={setChildCategoryFormModel}
      />
    </div>
  );
}

export default ChildCategoryHeader;

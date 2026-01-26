"use client";
import { Button, Flex, Pagination, Space } from "antd";
import React, { useState } from "react";
import CreateCategoryForm from "./CreateCategoryForm";
import SearchBar from "../common/SearchBar";
import Status from "../common/Status";
import StatsCard from "../common/StatsCard";
import { IoIosAddCircleOutline } from "react-icons/io";
import Filter from "../common/Filter";
function CategoryHeader() {
  const [categoryFormModel, setCategoryFormModel] = useState(false);

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
        <StatsCard />
      </Flex>
      <Flex
        justify="space-evenly"
        align="center"
        style={{ width: "100%", padding: "20px" }}
      >
        <Filter />
      </Flex>
    </>
  );
}

export default CategoryHeader;

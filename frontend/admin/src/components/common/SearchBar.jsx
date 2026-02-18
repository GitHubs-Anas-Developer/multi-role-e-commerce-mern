"use client";
import React from "react";
import { Space, Input } from "antd";
function SearchBar() {
  const { Search } = Input;

  const onSearch = (value) => {
    console.log("value",value)
  };

  return (
    <>
      <Space vertical>
        <Search
          placeholder="Search name or id"
          onSearch={onSearch}
          enterButton
        />
      </Space>
    </>
  );
}

export default SearchBar;

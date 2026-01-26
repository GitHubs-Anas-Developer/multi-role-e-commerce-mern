"use client";
import React from "react";
import { Space, Input } from "antd";
function SearchBar() {
  const { Search } = Input;

  const onSearch = (value, _e, info) => console.log(info?.source, value);

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

"use client";
import { Button, Flex, Space } from "antd";
import React, { useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import StatsCard from "../common/StatsCard";
import Filter from "../common/Filter";
import Link from "next/link";
function ProductsHeader() {
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
        <h3 className="font-bold text-2xl">Products</h3>
        <Space>
          <Link href="products/create-product">
            <IoIosAddCircleOutline size={25} /> Create New Product
          </Link>
        </Space>
      </div>

      <Flex>
        <StatsCard
          title="products"
          totalCount={10}
          activeCount={20}
          inactiveCount={15}
        />
      </Flex>

      <Flex
        justify="space-evenly"
        align="center"
        style={{ width: "100%", padding: "20px" }}
      >
        <Filter
          title="products"
          currentPage={2}
          pageSize={1}
          totalCategory={6}
        />
      </Flex>
    </>
  );
}

export default ProductsHeader;

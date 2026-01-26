import React from "react";
import { Select } from "antd";

function Status() {
  return (
    <>
      <Select
        placeholder="All status"
        defaultValue={"Active"}
        options={[
          {
            value: true,
            label: "Active",
          },
          {
            value: false,
            label: "Inactive",
          },
        ]}
      ></Select>
    </>
  );
}

export default Status;

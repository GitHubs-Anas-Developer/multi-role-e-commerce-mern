"use client";
import React, { useEffect } from "react";
import { message } from "antd";

function Toast({ status }) {
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (!status) return;

    messageApi.open({
      type: status.type,
      content: status.message,
    });
  }, [status, messageApi]);

  return <>{contextHolder}</>;
}

export default Toast;

"use client";
import { Button, Form, Input } from "antd";
import Image from "next/image";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { loginAdmin } from "@/redux/slices/auth/authThunk";
import Spinner from "@/components/ui/Spinner";
import Toast from "@/components/ui/Toast";

function Page() {
  const dispatch = useDispatch();
  const { admin, loading, error } = useSelector((state) => state.auth);
  const [status, setStatus] = useState(null);
  const onFinish = async (values) => {
    try {
      await dispatch(loginAdmin(values)).unwrap();
      setStatus({ type: "success", message: "Login successful" });
    } catch (err) {
      setStatus({ type: "error", message: err || "Invalid credentials" });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Toast status={status} />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        {/* Left Side */}
        <div className="hidden md:flex text-blue-600 text-3xl font-bold">
          <Image
            src={
              "https://img.freepik.com/free-vector/male-programmer-working-computer-office-wall-with-hanging-reminder-stickers-developer-creating-new-software-interface-coding-programming-system-administrator-designer-character_575670-1159.jpg?semt=ais_hybrid&w=740&q=80"
            }
            alt=""
            width={501}
            height={100}
          />
        </div>

        {/* Right Side */}
        <div className="bg-white  p-8 w-full max-w-md">
          <h1 className="text-3xl font-semibold text-center mb-6">
            Admin Login
          </h1>

          <Form
            layout="vertical"
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="email"
              name="email"
              rules={[{ required: true, message: "email required" }]}
            >
              <Input
                size="large"
                placeholder="Enter Username"
                className="rounded-full"
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Password required" }]}
            >
              <Input.Password
                size="large"
                placeholder="Enter Password"
                className="rounded-full"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="w-full rounded-full"
                disabled={loading}
              >
                {loading ? <Spinner /> : "Login"}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Page;

import React from "react";
import { DownOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, Space, Typography } from "antd";

const { Text } = Typography;

const items = [
  {
    key: "1",
    label: "Logout",
    icon: <LogoutOutlined />,
    danger: true,
  },
];

const Profile = () => {
  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <Button type="text" style={{ padding: 0 }}>
        <Space size={10} align="center">
          <Avatar shape="square" size="medium" icon={<UserOutlined />} />

          {/* TEXT BLOCK */}
          <Space >
            <Text strong>Anas Developer</Text>
            <Text type="secondary" style={{ fontSize: 12 }}>
              Admin
            </Text>
          </Space>

          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
  );
};

export default Profile;

import React from "react";
import { Card, Col, Row, Typography } from "antd";
import { VscVmActive } from "react-icons/vsc";
import { BiCategoryAlt } from "react-icons/bi";
import { MdBlock, MdOutlineStarPurple500 } from "react-icons/md";

const { Title, Text } = Typography;

function StatsCard({ title, totalCount, activeCount, inactiveCount }) {
  const statsData = [
    {
      title: `Total ${title}`,
      value: totalCount,
      icon: <BiCategoryAlt size={26} />,
      bg: "#000",
      color: "#000",
    },
    {
      title: "Active",
      value: activeCount,
      icon: <VscVmActive size={26} />,
      bg: "#52c41a",
      color: "#52c41a",
    },
    {
      title: "Inactive",
      value: inactiveCount,
      icon: <MdBlock size={26} />,
      bg: "#1677ff",
      color: "#1677ff",
    },
    {
      title: "Featured Categories",
      value: 5,
      icon: <MdOutlineStarPurple500 size={26} />,
      bg: "#faad14",
      color: "#faad14",
    },
  ];

  return (
    <Row gutter={[16, 16]} style={{ width: "100%" }}>
      {statsData.map((item, index) => (
        <Col key={index} xs={24} sm={12} md={12} lg={6}>
          <Card hoverable>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              {/* Icon */}
              <div
                style={{
                  backgroundColor: item.bg,
                  color: "#fff",
                  borderRadius: "50%",
                  width: 44,
                  height: 44,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </div>

              {/* Content */}
              <div>
                <Title level={3} style={{ margin: 0, color: item.color }}>
                  {item.value}
                </Title>
                <Text type="secondary">{item.title}</Text>
              </div>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default StatsCard;

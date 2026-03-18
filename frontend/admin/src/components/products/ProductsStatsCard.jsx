import React, { useEffect } from "react";
import { Card, Col, Row, Skeleton, Statistic } from "antd";
import {
  ShoppingCartOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { productStats } from "@/redux/slices/product/productThunks";

function ProductsStatsCard() {
  const { allProducts, activeProducts, lowStock, outOfStock, loading, error } =
    useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productStats());
  }, [dispatch]);

  const stats = [
    {
      title: "Total Products",
      value: allProducts,
      icon: <ShoppingCartOutlined style={{ fontSize: 22, color: "#1677ff" }} />,
      bg: "#e6f4ff",
    },
    {
      title: "Active Products",
      value: activeProducts,
      icon: <CheckCircleOutlined style={{ fontSize: 22, color: "#52c41a" }} />,
      bg: "#f6ffed",
    },
    {
      title: "Low Stock",
      value: lowStock,
      icon: <WarningOutlined style={{ fontSize: 22, color: "#faad14" }} />,
      bg: "#fffbe6",
    },
    {
      title: "Out of Stock",
      value: outOfStock,
      icon: <StopOutlined style={{ fontSize: 22, color: "#ff4d4f" }} />,
      bg: "#fff1f0",
    },
  ];

  if (loading) return <Skeleton />;

  return (
    <Row gutter={[16, 16]} style={{ marginBottom: "20px" }}>
      {stats.map((item, index) => (
        <Col xs={24} sm={12} md={12} lg={6} key={index}>
          <Card
            bordered={false}
            style={{
              borderRadius: "16px",
              boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
              overflow: "hidden",
            }}
            bodyStyle={{
              padding: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "12px",
              }}
            >
              <div>
                <p
                  style={{
                    margin: 0,
                    fontSize: "14px",
                    color: "#666",
                    fontWeight: 500,
                  }}
                >
                  {item.title}
                </p>

                <h2
                  style={{
                    margin: "8px 0 0 0",
                    fontSize: "28px",
                    fontWeight: 700,
                    color: "#111",
                  }}
                >
                  {item.value}
                </h2>
              </div>

              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "14px",
                  background: item.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </div>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default ProductsStatsCard;

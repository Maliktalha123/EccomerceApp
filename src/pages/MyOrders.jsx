import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { db } from "../utils/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import {
  Card,
  List,
  Typography,
  Spin,
  Tag,
  Divider,
  Row,
  Col,
  Avatar,
  Button,
  Steps,
  Space,
  Statistic,
  Empty,
} from "antd";
import {
  ShoppingCartOutlined,
  CalendarOutlined,
  TruckOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ReloadOutlined,
  EyeOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;
const { Step } = Steps;

export default function MyOrders() {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // User orders fetch karne wala function
  const getUserOrders = async (userEmail) => {
    const q = query(
      collection(db, "orders"),
      where("userEmail", "==", userEmail)
    );
    const querySnapshot = await getDocs(q);
    const fetchedOrders = [];
    querySnapshot.forEach((doc) => {
      fetchedOrders.push({ id: doc.id, ...doc.data() });
    });
    return fetchedOrders.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  };

  useEffect(() => {
    if (user?.email) {
      getUserOrders(user.email).then((data) => {
        setOrders(data);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [user]);

  const getStatusColor = (status) => {
    const statusColors = {
      pending: "orange",
      processing: "blue",
      shipped: "cyan",
      delivered: "green",
      cancelled: "red",
    };
    return statusColors[status?.toLowerCase()] || "default";
  };

  const getStatusIcon = (status) => {
    const statusIcons = {
      pending: <ClockCircleOutlined />,
      shipped: <TruckOutlined />,
      delivered: <CheckCircleOutlined />,
      cancelled: <ClockCircleOutlined />,
    };
    return statusIcons[status?.toLowerCase()] || <ClockCircleOutlined />;
  };

  const getOrderProgress = (status) => {
    const statusSteps = {
      pending: 0,
      shipped: 1,
      delivered: 2,
      cancelled: 0,
    };
    return statusSteps[status?.toLowerCase()] || 0;
  };

  const calculateOrderStats = () => {
    const totalOrders = orders.length;
    const totalSpent = orders.reduce(
      (sum, order) => sum + order.totalAmount,
      0
    );
    const pendingOrders = orders.filter(
      (order) => order.status?.toLowerCase() === "pending"
    ).length;
    return { totalOrders, totalSpent, pendingOrders };
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <Spin size="large" />
        <Text type="secondary">Loading your orders...</Text>
      </div>
    );
  }

  if (!user?.email) {
    return (
      <div style={{ textAlign: "center", marginTop: "80px", padding: "20px" }}>
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={
            <div>
              <Title level={3}>Please log in to view your orders</Title>
              <Paragraph type="secondary">
                You need to be logged in to access your order history
              </Paragraph>
            </div>
          }
        >
          <Button type="primary" size="large">
            Log In
          </Button>
        </Empty>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: "80px", padding: "20px" }}>
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={
            <div>
              <Title level={3}>No orders found</Title>
              <Paragraph type="secondary">
                You haven't placed any orders yet. Start shopping to see your
                orders here!
              </Paragraph>
            </div>
          }
        >
          <Button type="primary" size="large" icon={<ShoppingCartOutlined />}>
            Start Shopping
          </Button>
        </Empty>
      </div>
    );
  }

  const stats = calculateOrderStats();

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "12px",
      }}
    >
      <style jsx>{`
        @media (min-width: 576px) {
          .container {
            padding: 24px !important;
          }
        }

        .mobile-stack {
          flex-direction: column;
          align-items: flex-start !important;
          gap: 8px;
        }

        @media (min-width: 576px) {
          .mobile-stack {
            flex-direction: row;
            align-items: center !important;
            justify-content: flex-end;
          }
        }

        .mobile-button {
          font-size: 12px;
          padding: 4px 8px;
          height: auto;
        }

        @media (max-width: 400px) {
          .mobile-button .button-text {
            display: none;
          }
        }

        .order-header {
          margin-bottom: 16px;
        }

        @media (min-width: 576px) {
          .order-header {
            margin-bottom: 20px;
          }
        }
      `}</style>

      {/* Header Section */}
      <div style={{ marginBottom: "24px" }}>
        <Title
          level={2}
          style={{
            marginBottom: "8px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontSize: "20px",
          }}
        >
          <ShoppingCartOutlined style={{ color: "#1890ff" }} />
          My Orders
        </Title>
        <Text type="secondary" style={{ fontSize: "14px" }}>
          Track and manage all your orders in one place
        </Text>
      </div>

      {/* Stats Cards */}
      <Row gutter={[8, 8]} style={{ marginBottom: "24px" }}>
        <Col xs={24} sm={8}>
          <Card size="small">
            <Statistic
              title="Total Orders"
              value={stats.totalOrders}
              prefix={<ShoppingCartOutlined style={{ color: "#1890ff" }} />}
              valueStyle={{ fontSize: "20px" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card size="small">
            <Statistic
              title="Total Spent"
              value={stats.totalSpent}
              prefix="₹"
              precision={0}
              valueStyle={{ color: "#52c41a", fontSize: "20px" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card size="small">
            <Statistic
              title="Pending Orders"
              value={stats.pendingOrders}
              prefix={<ClockCircleOutlined style={{ color: "#faad14" }} />}
              valueStyle={{ fontSize: "20px" }}
            />
          </Card>
        </Col>
      </Row>

      {/* Orders List */}
      <List
        itemLayout="vertical"
        dataSource={orders}
        renderItem={(order) => (
          <Card
            key={order.id}
            style={{
              marginBottom: "16px",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}
            bodyStyle={{ padding: "16px" }}
          >
            {/* Order Header - Fully Responsive */}
            <div className="order-header">
              <div style={{ marginBottom: "12px" }}>
                <Text
                  strong
                  style={{
                    fontSize: "15px",
                    display: "block",
                    marginBottom: "4px",
                  }}
                >
                  Order #{order.id.slice(-8).toUpperCase()}
                </Text>
                <Space size={6}>
                  <CalendarOutlined
                    style={{ color: "#8c8c8c", fontSize: "12px" }}
                  />
                  <Text type="secondary" style={{ fontSize: "12px" }}>
                    {new Date(order.createdAt).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </Text>
                </Space>
              </div>

              <div
                className="mobile-stack"
                style={{ display: "flex", gap: "8px" }}
              >
                <Tag
                  color={getStatusColor(order.status)}
                  icon={getStatusIcon(order.status)}
                  style={{
                    padding: "2px 8px",
                    fontSize: "11px",
                    lineHeight: "20px",
                  }}
                >
                  {order.status?.toUpperCase() || "PENDING"}
                </Tag>
                <Button
                  type="text"
                  icon={<EyeOutlined />}
                  className="mobile-button"
                >
                  <span className="button-text">Details</span>
                </Button>
              </div>
            </div>

            {/* Order Progress - Responsive */}
            <div style={{ marginBottom: "16px" }}>
              <Steps
                current={getOrderProgress(order.status)}
                size="small"
                responsive={false}
                items={[
                  { title: "Placed", icon: <CheckCircleOutlined /> },

                  { title: "Shipped", icon: <TruckOutlined /> },
                  { title: "Delivered", icon: <CheckCircleOutlined /> },
                ]}
              />
            </div>

            <Divider style={{ margin: "16px 0" }} />

            {/* Order Items - Mobile Optimized */}
            <List
              itemLayout="horizontal"
              dataSource={order.items}
              renderItem={(item) => (
                <List.Item style={{ padding: "8px 0", border: "none" }}>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        src={item.url}
                        size={48}
                        shape="square"
                        style={{ borderRadius: "6px" }}
                      />
                    }
                    title={
                      <Text
                        strong
                        style={{ fontSize: "14px", lineHeight: "1.4" }}
                      >
                        {item.name}
                      </Text>
                    }
                    description={
                      <Text type="secondary" style={{ fontSize: "12px" }}>
                        Qty: {item.quantity} × ₹{item.price.toLocaleString()}
                      </Text>
                    }
                  />
                  <div style={{ textAlign: "right", minWidth: "80px" }}>
                    <Text strong style={{ fontSize: "14px", color: "#52c41a" }}>
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </Text>
                  </div>
                </List.Item>
              )}
            />

            <Divider style={{ margin: "16px 0" }} />

            {/* Order Total - Mobile Responsive */}
            <div>
              <Row gutter={[8, 8]} justify="space-between" align="middle">
                <Col xs={24} sm={12}>
                  <Space size={4} wrap>
                    <Text type="secondary" style={{ fontSize: "12px" }}>
                      Items: {order.items?.length || 0}
                    </Text>
                    <Divider type="vertical" />
                    <Text type="secondary" style={{ fontSize: "12px" }}>
                      Qty:{" "}
                      {order.items?.reduce(
                        (sum, item) => sum + item.quantity,
                        0
                      ) || 0}
                    </Text>
                  </Space>
                </Col>
                <Col xs={24} sm={12}>
                  <div style={{ textAlign: "right" }}>
                    <Space align="center" size={8}>
                      <Text style={{ fontSize: "14px" }}>Total:</Text>
                      <Text
                        strong
                        style={{ fontSize: "18px", color: "#52c41a" }}
                      >
                        ₹{order.totalAmount?.toLocaleString() || "0"}
                      </Text>
                    </Space>
                  </div>
                </Col>
              </Row>
            </div>
          </Card>
        )}
      />
    </div>
  );
}

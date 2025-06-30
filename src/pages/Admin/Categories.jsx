import { useState, useEffect } from "react";
import {
  Card,
  Button,
  Typography,
  Space,
  Row,
  Col,
  Spin,
  Empty,
  Tag,
  Statistic,
  notification,
} from "antd";
import {
  PlusOutlined,
  CalendarOutlined,
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

// import { categoryService, type Category } from "@/services/categoryService"

const { Title, Paragraph, Text } = Typography;

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async (showRefreshLoader = false) => {
    try {
      if (showRefreshLoader) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const fetchedCategories = await categoryService.getCategories();
      setCategories(fetchedCategories);

      if (showRefreshLoader) {
        notification.success({
          message: "Refreshed!",
          description: "Categories list has been updated.",
          duration: 2,
        });
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
      notification.error({
        message: "Error!",
        description: "Failed to load categories. Please try again.",
        duration: 4,
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const formatDate = (timestamp) => {
    Link
    if (!timestamp) return "Unknown";

    try {
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "Unknown";
    }
  };

  const handleEdit = (categoryId) => {
    notification.info({
      message: "Edit Feature",
      description: "Edit functionality will be implemented in the next update.",
      duration: 3,
    });
  };

  const handleDelete = (categoryId) => {
    notification.info({
      message: "Delete Feature",
      description:
        "Delete functionality will be implemented in the next update.",
      duration: 3,
    });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "24px 16px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          {/* Header */}
          <Row justify="space-between" align="middle">
            <Col>
              <Title level={1} style={{ marginBottom: 8 }}>
                Categories
              </Title>
              <Paragraph type="secondary">
                Manage your categories stored in Firebase Firestore.
              </Paragraph>
            </Col>
            <Col>
              <Space>
                <Button
                  icon={<ReloadOutlined />}
                  onClick={() => fetchCategories(true)}
                  loading={refreshing}
                >
                  Refresh
                </Button>
                <Link href="/add-category">
                  <Button type="primary" icon={<PlusOutlined />} size="large">
                    Add Category
                  </Button>
                </Link>
              </Space>
            </Col>
          </Row>

          {/* Loading State */}
          {loading && (
            <Card>
              <div style={{ textAlign: "center", padding: "48px 0" }}>
                <Spin size="large" />
                <div style={{ marginTop: 16 }}>
                  <Text type="secondary">Loading categories...</Text>
                </div>
              </div>
            </Card>
          )}

          {/* Categories Content */}
          {!loading && (
            <>
              {categories.length === 0 ? (
                <Card>
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={
                      <Space direction="vertical">
                        <Text strong>No categories yet</Text>
                        <Text type="secondary">
                          Get started by creating your first category.
                        </Text>
                      </Space>
                    }
                  >
                    <Link href="/add-category">
                      <Button type="primary" icon={<PlusOutlined />}>
                        Add Your First Category
                      </Button>
                    </Link>
                  </Empty>
                </Card>
              ) : (
                <>
                  {/* Stats Card */}
                  <Card>
                    <Row gutter={16}>
                      <Col xs={24} sm={8}>
                        <Statistic
                          title="Total Categories"
                          value={categories.length}
                          prefix={<PlusOutlined />}
                        />
                      </Col>
                      <Col xs={24} sm={8}>
                        <Statistic
                          title="Last Updated"
                          value={categories.length > 0 ? "Recently" : "Never"}
                          prefix={<CalendarOutlined />}
                        />
                      </Col>
                      <Col xs={24} sm={8}>
                        <Statistic
                          title="Storage"
                          value="Firestore"
                          prefix={<ExclamationCircleOutlined />}
                        />
                      </Col>
                    </Row>
                  </Card>

                  {/* Categories Grid */}
                  <Row gutter={[16, 16]}>
                    {categories.map((category) => (
                      <Col xs={24} sm={12} lg={8} key={category.id}>
                        <Card
                          hoverable
                          actions={[
                            <EditOutlined
                              key="edit"
                              // onClick={() => handleEdit(category.id!)}
                            />,
                            <DeleteOutlined
                              key="delete"
                              //   onClick={() => handleDelete(category.id!)}
                              style={{ color: "#ff4d4f" }}
                            />,
                          ]}
                          style={{ height: "100%" }}
                        >
                          <Card.Meta
                            title={
                              <Space
                                direction="vertical"
                                size="small"
                                style={{ width: "100%" }}
                              >
                                <Text strong style={{ fontSize: "16px" }}>
                                  {category.name}
                                </Text>
                                <Tag
                                  icon={<CalendarOutlined />}
                                  color="blue"
                                  style={{ fontSize: "11px" }}
                                >
                                  {formatDate(category.createdAt)}
                                </Tag>
                              </Space>
                            }
                            description={
                              <div style={{ marginTop: 12 }}>
                                <Paragraph
                                  ellipsis={{
                                    rows: 3,
                                    expandable: true,
                                    symbol: "more",
                                  }}
                                  style={{ marginBottom: 0, color: "#666" }}
                                >
                                  {category.description}
                                </Paragraph>
                              </div>
                            }
                          />
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </>
              )}
            </>
          )}
        </Space>
      </div>
    </div>
  );
}

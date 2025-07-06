"use client";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../utils/firebase";
import {
  Card,
  Row,
  Col,
  Typography,
  Button,
  Spin,
  Empty,
  Tag,
  Space,
  Breadcrumb,
  Divider,
  Rate,
  Badge,
  ConfigProvider,
} from "antd";
import {
  ShoppingCartOutlined,
  HeartOutlined,
  EyeOutlined,
  HomeOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import "antd/dist/reset.css";

const { Title, Text, Paragraph } = Typography;
const { Meta } = Card;

function ProductByCategory() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [categoryTitle, setCategoryTitle] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const catDocRef = doc(db, "categories", id);
        const catDocSnap = await getDoc(catDocRef);
        if (catDocSnap.exists()) {
          setCategoryTitle(catDocSnap.data().title);
        }

        const productsRef = collection(db, "products");
        const q = query(productsRef, where("category", "==", id));
        const snapshot = await getDocs(q);
        const productsList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsList);
      } catch (error) {
        console.error("Error fetching products: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id]);

  const handleAddToCart = (product) => {
    console.log("Added to cart:", product.title);
    // Add your cart logic here
  };

  const handleWishlist = (product) => {
    console.log("Added to wishlist:", product.title);
    // Add your wishlist logic here
  };

  const handleQuickView = (product) => {
    console.log("Quick view:", product.title);
    // Add your quick view logic here
  };

  const ProductCard = ({ product }) => (
    <Badge.Ribbon
      text="New"
      color="green"
      style={{ display: Math.random() > 0.7 ? "block" : "none" }}
    >
      <Card
        hoverable
        className="product-card"
        cover={
          <div style={{ position: "relative", overflow: "hidden" }}>
            <img
              alt={product.title}
              src={product.url || "/placeholder.svg?height=250&width=300"}
              style={{
                width: "100%",
                height: "220px",
                objectFit: "cover",
                transition: "transform 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
              }}
            />
            <div
              className="action-buttons"
              style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                opacity: 0,
                transition: "opacity 0.3s ease",
              }}
            >
              <Button
                type="text"
                shape="circle"
                icon={<HeartOutlined />}
                size="small"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(4px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleWishlist(product);
                }}
              />
              <Button
                type="text"
                shape="circle"
                icon={<EyeOutlined />}
                size="small"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(4px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleQuickView(product);
                }}
              />
            </div>
          </div>
        }
        actions={[
          <Button
            key="add-to-cart"
            type="primary"
            icon={<ShoppingCartOutlined />}
            onClick={() => handleAddToCart(product)}
            style={{
              width: "calc(100% - 24px)",
              margin: "0 12px",
              height: "36px",
              borderRadius: "6px",
            }}
          >
            Add to Cart
          </Button>,
        ]}
        style={{
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          transition: "all 0.3s ease",
          overflow: "hidden",
          height: "100%",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.15)";
          e.currentTarget.style.transform = "translateY(-4px)";
          const actionButtons =
            e.currentTarget.querySelector(".action-buttons");
          if (actionButtons) {
            actionButtons.style.opacity = "1";
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
          e.currentTarget.style.transform = "translateY(0)";
          const actionButtons =
            e.currentTarget.querySelector(".action-buttons");
          if (actionButtons) {
            actionButtons.style.opacity = "0";
          }
        }}
      >
        <div style={{ padding: "4px 0" }}>
          <Title
            level={4}
            style={{
              marginBottom: "8px",
              fontSize: "16px",
              lineHeight: "1.4",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {product.title}
          </Title>

          <div style={{ marginBottom: "12px" }}>
            <Rate
              disabled
              defaultValue={4.2}
              allowHalf
              style={{ fontSize: "12px" }}
            />
            <Text
              type="secondary"
              style={{ fontSize: "11px", marginLeft: "8px" }}
            >
              (24 reviews)
            </Text>
          </div>

          <Paragraph
            type="secondary"
            style={{
              fontSize: "13px",
              marginBottom: "12px",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              lineHeight: "1.4",
            }}
          >
            {product.desc}
          </Paragraph>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <Title
                level={3}
                style={{
                  color: "#52c41a",
                  margin: 0,
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              >
                Rs. {product.price}
              </Title>
              {Math.random() > 0.6 && (
                <Text
                  delete
                  type="secondary"
                  style={{ fontSize: "12px", marginLeft: "8px" }}
                >
                  Rs. {Math.floor(product.price * 1.2)}
                </Text>
              )}
            </div>
            <Tag color="blue" style={{ fontSize: "11px" }}>
              In Stock
            </Tag>
          </div>
        </div>
      </Card>
    </Badge.Ribbon>
  );

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1890ff",
          borderRadius: 8,
        },
      }}
    >
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#f5f5f5",
          padding: "24px",
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          {/* Breadcrumb */}
          <Breadcrumb
            style={{ marginBottom: "24px" }}
            items={[
              {
                href: "/",
                title: <HomeOutlined />,
              },
              {
                href: "/categories",
                title: (
                  <>
                    <AppstoreOutlined />
                    <span>Categories</span>
                  </>
                ),
              },
              {
                title: categoryTitle,
              },
            ]}
          />

          {/* Header */}
          <div style={{ marginBottom: "32px", textAlign: "center" }}>
            <Title level={1} style={{ marginBottom: "8px", color: "#262626" }}>
              {categoryTitle}
            </Title>
            <Text type="secondary" style={{ fontSize: "16px" }}>
              Discover amazing products in this category
            </Text>
            <Divider />
          </div>

          {/* Loading State */}
          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "400px",
              }}
            >
              <Spin size="large" tip="Loading products...">
                <div style={{ padding: "50px" }} />
              </Spin>
            </div>
          ) : products.length === 0 ? (
            /* Empty State */
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "400px",
              }}
            >
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={
                  <span>No products found in "{categoryTitle}" category</span>
                }
              >
                <Button type="primary" href="/categories">
                  Browse Other Categories
                </Button>
              </Empty>
            </div>
          ) : (
            /* Products Grid */
            <>
              <div style={{ marginBottom: "24px" }}>
                <Space>
                  <Text strong>
                    {products.length} product{products.length !== 1 ? "s" : ""}{" "}
                    found
                  </Text>
                  <Divider type="vertical" />
                  <Text type="secondary">
                    Showing all results for "{categoryTitle}"
                  </Text>
                </Space>
              </div>

              <Row gutter={[24, 24]}>
                {products.map((product) => (
                  <Col
                    key={product.id}
                    xs={24}
                    sm={12}
                    md={8}
                    lg={6}
                    xl={6}
                    style={{ display: "flex" }}
                  >
                    <div style={{ width: "100%" }}>
                      <ProductCard product={product} />
                    </div>
                  </Col>
                ))}
              </Row>
            </>
          )}
        </div>
      </div>

      <style jsx global>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            sans-serif;
        }

        .product-card .ant-card-body {
          padding: 16px !important;
        }

        @media (max-width: 768px) {
          .product-card .ant-card-cover img {
            height: 180px !important;
          }

          .product-card .ant-card-body {
            padding: 12px !important;
          }
        }

        @media (max-width: 480px) {
          .product-card .ant-card-cover img {
            height: 160px !important;
          }

          .product-card .ant-typography h4 {
            font-size: 14px !important;
          }
        }
      `}</style>
    </ConfigProvider>
  );
}

export default ProductByCategory;

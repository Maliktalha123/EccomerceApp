"use client";

import { useContext, useState } from "react";
import { ProductContext } from "../context/ProductsContext";
import { Link, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import {
  Button,
  Card,
  Row,
  Col,
  Typography,
  Rate,
  Divider,
  InputNumber,
  Select,
  Tabs,
  Tag,
  Space,
  Image,
  Breadcrumb,
  Tooltip,
  message,
} from "antd";
import {
  HeartOutlined,
  HeartFilled,
  ShoppingCartOutlined,
  ShareAltOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { CartContext } from "../context/CartContext";
import { FavoriteContext } from "../context/FavoriteContext";

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

const ProductDetail = () => {
  const { id } = useParams();
  const { products } = useContext(ProductContext);
  const { addItemToCart, isItemAdded } = useContext(CartContext);
  const { addItemToFavorite, favorites } = useContext(FavoriteContext);

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("Blue");
  const [selectedSize, setSelectedSize] = useState("Medium");

  const singleProduct = products.filter((data) => data.id == id);

  if (!singleProduct.length) {
    return (
      <div className="container mx-auto p-8">
        <Card>
          <div className="text-center py-12">
            <Title level={3}>Product not found</Title>
            <Text type="secondary">
              The product you're looking for doesn't exist.
            </Text>
          </div>
        </Card>
      </div>
    );
  }

  const product = singleProduct[0];
  const isInCart = isItemAdded(product.id);
  const isFavorite = favorites?.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItemToCart(product);
    }
    message.success(`Added ${quantity} item(s) to cart!`);
  };

  const handleAddToFavorite = () => {
    addItemToFavorite(product);
    message.success(
      isFavorite ? "Removed from favorites!" : "Added to favorites!"
    );
  };

  const tabItems = [
    {
      key: "1",
      label: "Description",
      children: (
        <div>
          <Paragraph style={{ fontSize: "16px", lineHeight: "1.6" }}>
            {product.desc}
          </Paragraph>
          <Divider />
          <Title level={5}>Features:</Title>
          <ul style={{ paddingLeft: "20px" }}>
            <li>High-quality materials</li>
            <li>Durable construction</li>
            <li>Modern design</li>
            <li>Easy to use</li>
          </ul>
        </div>
      ),
    },
    {
      key: "2",
      label: "Reviews",
      children: (
        <div>
          <div style={{ marginBottom: "16px" }}>
            <Rate disabled defaultValue={4.5} />
            <Text style={{ marginLeft: "8px" }}>
              4.5 out of 5 (128 reviews)
            </Text>
          </div>
          <Card size="small" style={{ marginBottom: "12px" }}>
            <div>
              <Text strong>John D.</Text>
              <Rate
                disabled
                defaultValue={5}
                style={{ fontSize: "12px", marginLeft: "8px" }}
              />
            </div>
            <Text type="secondary">Great product! Highly recommended.</Text>
          </Card>
          <Card size="small">
            <div>
              <Text strong>Sarah M.</Text>
              <Rate
                disabled
                defaultValue={4}
                style={{ fontSize: "12px", marginLeft: "8px" }}
              />
            </div>
            <Text type="secondary">Good quality, fast delivery.</Text>
          </Card>
        </div>
      ),
    },
    {
      key: "3",
      label: "Specifications",
      children: (
        <div>
          <Row gutter={[16, 8]}>
            <Col span={8}>
              <Text strong>Brand:</Text>
            </Col>
            <Col span={16}>
              <Text>Premium Brand</Text>
            </Col>
            <Col span={8}>
              <Text strong>Material:</Text>
            </Col>
            <Col span={16}>
              <Text>High-grade materials</Text>
            </Col>
            <Col span={8}>
              <Text strong>Weight:</Text>
            </Col>
            <Col span={16}>
              <Text>1.2 kg</Text>
            </Col>
            <Col span={8}>
              <Text strong>Dimensions:</Text>
            </Col>
            <Col span={16}>
              <Text>30 x 20 x 10 cm</Text>
            </Col>
            <Col span={8}>
              <Text strong>Warranty:</Text>
            </Col>
            <Col span={16}>
              <Text>2 years</Text>
            </Col>
          </Row>
        </div>
      ),
    },
  ];

  return (
    <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <div className="container mx-auto" style={{ padding: "24px" }}>
        {/* Breadcrumb */}
        <Breadcrumb style={{ marginBottom: "24px" }}>
          <Breadcrumb.Item>
            <Link to="/">
              <HomeOutlined />
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/shop">Shop</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{product.title}</Breadcrumb.Item>
        </Breadcrumb>

        <Card style={{ borderRadius: "12px", overflow: "hidden" }}>
          <Row gutter={[32, 32]}>
            {/* Product Image */}
            <Col xs={24} md={12} lg={10}>
              <div style={{ position: "sticky", top: "24px" }}>
                <Image
                  src={product.url || "/placeholder.svg"}
                  alt={product.title}
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                    objectFit: "cover",
                  }}
                  height={400}
                />

                {/* Thumbnail images */}
                <Row gutter={[8, 8]} style={{ marginTop: "16px" }}>
                  {[1, 2, 3, 4].map((item) => (
                    <Col span={6} key={item}>
                      <Image
                        src={product.url || "/placeholder.svg"}
                        alt={`${product.title} ${item}`}
                        style={{
                          width: "100%",
                          height: "80px",
                          objectFit: "cover",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      />
                    </Col>
                  ))}
                </Row>
              </div>
            </Col>

            {/* Product Details */}
            <Col xs={24} md={12} lg={14}>
              <div style={{ padding: "0 16px" }}>
                {/* Product Title and Rating */}
                <div style={{ marginBottom: "16px" }}>
                  <Tag color="blue" style={{ marginBottom: "8px" }}>
                    Category
                  </Tag>
                  <Title
                    level={2}
                    style={{ margin: "0 0 8px 0", fontSize: "28px" }}
                  >
                    {product.title}
                  </Title>
                  <Space>
                    <Rate
                      disabled
                      defaultValue={4.5}
                      style={{ fontSize: "16px" }}
                    />
                    <Text type="secondary">(128 reviews)</Text>
                  </Space>
                </div>

                {/* Price */}
                <div style={{ marginBottom: "24px" }}>
                  <Title level={1} style={{ color: "#1890ff", margin: 0 }}>
                    ${product.price}
                  </Title>
                  <Text
                    delete
                    type="secondary"
                    style={{ fontSize: "18px", marginLeft: "12px" }}
                  >
                    ${(product.price * 1.2).toFixed(2)}
                  </Text>
                  <Tag color="red" style={{ marginLeft: "12px" }}>
                    20% OFF
                  </Tag>
                </div>

                <Divider />

                {/* Product Options */}
                <div style={{ marginBottom: "24px" }}>
                  <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12}>
                      <Text
                        strong
                        style={{ display: "block", marginBottom: "8px" }}
                      >
                        Color:
                      </Text>
                      <Select
                        value={selectedColor}
                        onChange={setSelectedColor}
                        style={{ width: "100%" }}
                        size="large"
                      >
                        <Option value="Blue">Blue</Option>
                        <Option value="Red">Red</Option>
                        <Option value="Black">Black</Option>
                        <Option value="White">White</Option>
                      </Select>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Text
                        strong
                        style={{ display: "block", marginBottom: "8px" }}
                      >
                        Size:
                      </Text>
                      <Select
                        value={selectedSize}
                        onChange={setSelectedSize}
                        style={{ width: "100%" }}
                        size="large"
                      >
                        <Option value="Small">Small</Option>
                        <Option value="Medium">Medium</Option>
                        <Option value="Large">Large</Option>
                        <Option value="X-Large">X-Large</Option>
                      </Select>
                    </Col>
                  </Row>
                </div>

                {/* Quantity */}
                <div style={{ marginBottom: "24px" }}>
                  <Text
                    strong
                    style={{ display: "block", marginBottom: "8px" }}
                  >
                    Quantity:
                  </Text>
                  <InputNumber
                    min={1}
                    max={10}
                    value={quantity}
                    onChange={setQuantity}
                    size="large"
                    style={{ width: "120px" }}
                  />
                  <Text type="secondary" style={{ marginLeft: "12px" }}>
                    (4 available)
                  </Text>
                </div>

                {/* Action Buttons */}
                <Space
                  size="middle"
                  style={{ width: "100%", marginBottom: "24px" }}
                >
                  <Button
                    type="primary"
                    size="large"
                    icon={<ShoppingCartOutlined />}
                    onClick={handleAddToCart}
                    style={{
                      height: "48px",
                      borderRadius: "6px",
                      fontWeight: "500",
                    }}
                  >
                    {isInCart
                      ? `In Cart (${isInCart.quantity})`
                      : "Add to Cart"}
                  </Button>

                  <Tooltip
                    title={
                      isFavorite ? "Remove from favorites" : "Add to favorites"
                    }
                  >
                    <Button
                      size="large"
                      icon={
                        isFavorite ? (
                          <HeartFilled style={{ color: "#ff4d4f" }} />
                        ) : (
                          <HeartOutlined />
                        )
                      }
                      onClick={handleAddToFavorite}
                      style={{ height: "48px", borderRadius: "6px" }}
                    />
                  </Tooltip>

                  <Tooltip title="Share product">
                    <Button
                      size="large"
                      icon={<ShareAltOutlined />}
                      style={{ height: "48px", borderRadius: "6px" }}
                    />
                  </Tooltip>
                </Space>

                {/* Product Features */}
                <Card
                  size="small"
                  style={{ backgroundColor: "#f9f9f9", marginBottom: "24px" }}
                >
                  <Row gutter={[16, 8]}>
                    <Col span={12}>
                      <Text type="secondary">✓ Free shipping</Text>
                    </Col>
                    <Col span={12}>
                      <Text type="secondary">✓ 30-day returns</Text>
                    </Col>
                    <Col span={12}>
                      <Text type="secondary">✓ 2-year warranty</Text>
                    </Col>
                    <Col span={12}>
                      <Text type="secondary">✓ 24/7 support</Text>
                    </Col>
                  </Row>
                </Card>
              </div>
            </Col>
          </Row>

          <Divider />

          {/* Product Tabs */}
          <div style={{ padding: "0 16px" }}>
            <Tabs
              defaultActiveKey="1"
              items={tabItems}
              size="large"
              style={{ minHeight: "200px" }}
            />
          </div>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;

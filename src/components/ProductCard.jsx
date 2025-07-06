import { Card, Button, Badge, Typography, Rate, Tag } from "antd";
import { ShoppingCartOutlined, HeartOutlined, EyeOutlined } from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

const ProductCard = ({ product, onAddToCart, onWishlist, onQuickView }) => (
  <Badge.Ribbon
    text="New"
    color="green"
    style={{ display: Math.random() > 0.7 ? "block" : "none" }}
  >
    <Card
      hoverable
      className="product-card"
      cover={
        <div style={{ position: "relative", overflow: "hidden", height: "220px" }}>
          <img
            alt={product.title}
            src={product.url || "/placeholder.svg?height=250&width=300"}
            style={{
              width: "100%",
              height: "100%",
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
                onWishlist(product);
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
                onQuickView(product);
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
          onClick={() => onAddToCart(product)}
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
        width: "250px",      // ✅ Fixed width
        height: "460px",     // ✅ Fixed height
        display: "flex",
        flexDirection: "column",
      }}
      bodyStyle={{
        flex: "1 1 auto",
        display: "flex",
        flexDirection: "column",
        padding: "12px",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.15)";
        e.currentTarget.style.transform = "translateY(-4px)";
        const actionButtons = e.currentTarget.querySelector(".action-buttons");
        if (actionButtons) {
          actionButtons.style.opacity = "1";
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
        e.currentTarget.style.transform = "translateY(0)";
        const actionButtons = e.currentTarget.querySelector(".action-buttons");
        if (actionButtons) {
          actionButtons.style.opacity = "0";
        }
      }}
    >
      <div style={{ flex: "1 1 auto", display: "flex", flexDirection: "column" }}>
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

        <div style={{ marginBottom: "8px" }}>
          <Rate disabled defaultValue={4.2} allowHalf style={{ fontSize: "12px" }} />
          <Text type="secondary" style={{ fontSize: "11px", marginLeft: "8px" }}>
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
            marginTop: "auto",
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
              <Text delete type="secondary" style={{ fontSize: "12px", marginLeft: "8px" }}>
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

export default ProductCard;

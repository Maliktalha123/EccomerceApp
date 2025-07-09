import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import {
  Button,
  Image,
  Card,
  Row,
  Col,
  Typography,
  Space,
  Divider,
  Statistic,
  Empty,
  Tag,
  Tooltip,
} from "antd";
import {
  MinusOutlined,
  PlusOutlined,
  DeleteOutlined,
  ShoppingCartOutlined,
  LoginOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

const Cart = () => {
  const { cartItems, removeItemFromCart, addItemToCart, lessQuanityFromCart } =
    useContext(CartContext);
  const { user } = useContext(AuthContext);

  const totalAmount = cartItems.reduce(
    (total, obj) => total + obj.quantity * obj.price,
    0
  );
  const totalQuantity = cartItems.reduce(
    (total, obj) => total + obj.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto my-8 px-4">
        <Card className="text-center py-8">
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={
              <span>
                <Text type="secondary" className="text-lg">
                  Your cart is empty
                </Text>
              </span>
            }
          >
            <Link to="/shop">
              <Button
                type="primary"
                size="large"
                icon={<ShoppingCartOutlined />}
              >
                Start Shopping
              </Button>
            </Link>
          </Empty>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-8 px-4">
      <div className="mb-6">
        <Title level={2} className="flex items-center gap-2">
          <ShoppingCartOutlined />
          Shopping Cart
        </Title>
        <Text type="secondary">Review your items and proceed to checkout</Text>
      </div>

      {/* Summary Cards */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={8}>
          <Card className="text-center h-full">
            <Statistic
              title="Total Items"
              value={totalQuantity}
              valueStyle={{ color: "#1890ff", fontSize: "2rem" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card className="text-center h-full">
            <Statistic
              title="Total Amount"
              value={Math.round(totalAmount)}
              prefix="$"
              valueStyle={{ color: "#52c41a", fontSize: "2rem" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card className="text-center h-full flex items-center justify-center">
            {user.isLogin ? (
              <Link to="/checkout" className="w-full">
                <Button
                  type="primary"
                  size="large"
                  icon={<CreditCardOutlined />}
                  className="w-full h-12"
                >
                  Proceed to Checkout
                </Button>
              </Link>
            ) : (
              <Link to="/signin" className="w-full">
                <Button
                  type="default"
                  size="large"
                  icon={<LoginOutlined />}
                  className="w-full h-12"
                >
                  Login to Checkout
                </Button>
              </Link>
            )}
          </Card>
        </Col>
      </Row>

      <Divider />

      {/* Cart Items */}
      <div className="space-y-4">
        <Title level={3}>Cart Items ({cartItems.length})</Title>

        {cartItems.map((data) => {
          const description = data.desc || "";
          const truncatedDesc =
            description.length > 100
              ? `${description.slice(0, 100)}...`
              : description;

          return (
            <Card
              key={data.id}
              className="shadow-sm hover:shadow-md transition-shadow"
            >
              <Row gutter={[16, 16]} align="middle">
                {/* Product Image */}
                <Col xs={24} sm={8} md={6}>
                  <div className="flex justify-center">
                    <Image
                      src={data.url || "/placeholder.svg"}
                      alt={data.title}
                      width="100%"
                      height={150}
                      style={{ objectFit: "cover", borderRadius: "8px" }}
                      preview={false}
                    />
                  </div>
                </Col>

                {/* Product Details */}
                <Col xs={24} sm={16} md={18}>
                  <div className="h-full flex flex-col justify-between">
                    <div>
                      <Title level={4} className="mb-2 line-clamp-2">
                        {data.title}
                      </Title>

                      {description && (
                        <Paragraph
                          type="secondary"
                          className="mb-3"
                          ellipsis={{
                            rows: 2,
                            expandable: true,
                            symbol: "more",
                          }}
                        >
                          {description}
                        </Paragraph>
                      )}

                      <div className="flex items-center gap-4 mb-4">
                        <Tag color="green" className="text-lg px-3 py-1">
                          ${data.price}
                        </Tag>
                        <Text strong className="text-lg">
                          Subtotal: ${(data.quantity * data.price).toFixed(2)}
                        </Text>
                      </div>
                    </div>

                    {/* Quantity Controls and Remove Button */}
                    <Row gutter={[16, 8]} align="middle">
                      <Col xs={24} sm={12}>
                        <Space size="middle" className="flex items-center">
                          <Text strong>Quantity:</Text>
                          <Button.Group>
                            <Tooltip title="Decrease quantity">
                              <Button
                                icon={<MinusOutlined />}
                                onClick={() => lessQuanityFromCart(data.id)}
                                disabled={data.quantity === 1}
                              />
                            </Tooltip>
                            <Button className="px-4">
                              <Text strong className="text-lg">
                                {data.quantity}
                              </Text>
                            </Button>
                            <Tooltip title="Increase quantity">
                              <Button
                                icon={<PlusOutlined />}
                                onClick={() => addItemToCart(data)}
                              />
                            </Tooltip>
                          </Button.Group>
                        </Space>
                      </Col>

                      <Col xs={24} sm={12} className="flex justify-end">
                        <Button
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() => removeItemFromCart(data.id)}
                          className="flex items-center"
                        >
                          Remove Item
                        </Button>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </Card>
          );
        })}
      </div>

      {/* Bottom Summary */}
      <Card className="mt-6 bg-gray-50">
        <Row justify="space-between" align="middle">
          <Col>
            <Space direction="vertical" size="small">
              <Text strong className="text-lg">
                Order Summary
              </Text>
              <Text type="secondary">
                {totalQuantity} item{totalQuantity !== 1 ? "s" : ""} in your
                cart
              </Text>
            </Space>
          </Col>
          <Col>
            <Space direction="vertical" size="small" className="text-right">
              <Text strong className="text-2xl">
                Total: ${Math.round(totalAmount)}
              </Text>
              {user.isLogin ? (
                <Link to="/checkout">
                  <Button
                    type="primary"
                    size="large"
                    icon={<CreditCardOutlined />}
                  >
                    Checkout Now
                  </Button>
                </Link>
              ) : (
                <Link to="/signin">
                  <Button size="large" icon={<LoginOutlined />}>
                    Login to Continue
                  </Button>
                </Link>
              )}
            </Space>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Cart;

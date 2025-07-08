import { useContext, useState } from "react";
import {
  Form,
  Input,
  Button,
  Card,
  Row,
  Col,
  Typography,
  Divider,
  Radio,
  Space,
  List,
  Avatar,
  Tag,
  Steps,
  message,
} from "antd";
import {
  ShoppingCartOutlined,
  UserOutlined,
  HomeOutlined,
  PhoneOutlined,
  CreditCardOutlined,
  SafetyOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../utils/firebase";
import { useNavigate } from "react-router-dom"; // ✅ ✅ import navigate

const { Title, Text } = Typography;

export default function CheckOut() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [currentStep, setCurrentStep] = useState(0);

  const { cartItems, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate(); // ✅ ✅ create navigate

  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const calculateTax = () => {
    return Math.round(calculateSubtotal() * 0.18);
  };

  const calculateShipping = () => {
    return calculateSubtotal() > 5000 ? 0 : 199;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax() + calculateShipping();
  };

  const handlePlaceOrder = async (values) => {
    if (!user?.email) {
      message.error("You must be logged in to place an order!");
      return;
    }

    setLoading(true);

    const order = {
      customerInfo: values,
      items: cartItems,
      subtotal: calculateSubtotal(),
      tax: calculateTax(),
      shipping: calculateShipping(),
      totalAmount: calculateTotal(),
      paymentMethod,
      status: "Pending",
      createdAt: new Date().toISOString(),
      userEmail: user.email,
    };

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Order placed:", order);
      message.success("Order placed successfully!");
      setCurrentStep(2);

      await addDoc(collection(db, "orders"), order);
      clearCart();
    } catch (error) {
      console.error("Error placing order:", error);
      message.error("Failed to place order!");
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    {
      title: "Cart Review",
      icon: <ShoppingCartOutlined />,
    },
    {
      title: "Checkout",
      icon: <CreditCardOutlined />,
    },
    {
      title: "Confirmation",
      icon: <CheckCircleOutlined />,
    },
  ];

  if (currentStep === 2) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <Card className="text-center">
            <CheckCircleOutlined className="text-6xl text-green-500 mb-4" />
            <Title level={2} className="text-green-600">
              Order Placed Successfully!
            </Title>
            <Text className="text-lg">
              Thank you for your purchase. You will receive a confirmation email
              shortly.
            </Text>
            <div className="mt-6">
              <Button
                type="primary"
                size="large"
                onClick={() => {
                  navigate("/");
                  setCurrentStep(0);
                }} // ✅ ✅ navigate to home
              >
                Continue Shopping
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <Card className="mb-6">
          <Steps current={currentStep} items={steps} />
        </Card>

        <Row gutter={[24, 24]}>
          <Col xs={24} lg={14}>
            <Card
              title={
                <Space>
                  <CreditCardOutlined />
                  <span>Checkout Details</span>
                </Space>
              }
              className="h-fit"
            >
              <Form
                form={form}
                layout="vertical"
                onFinish={handlePlaceOrder}
                initialValues={{
                  name: user?.name || "",
                  email: user?.email || "",
                }}
              >
                <Title level={5} className="mb-4">
                  <UserOutlined className="mr-2" />
                  Personal Information
                </Title>

                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="name"
                      label="Full Name"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your full name",
                        },
                        {
                          min: 2,
                          message: "Name must be at least 2 characters",
                        },
                      ]}
                    >
                      <Input
                        prefix={<UserOutlined />}
                        placeholder="Enter your full name"
                        size="large"
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="email"
                      label="Email Address"
                      rules={[
                        { required: true, message: "Please enter your email" },
                        {
                          type: "email",
                          message: "Please enter a valid email",
                        },
                      ]}
                    >
                      <Input
                        prefix={<UserOutlined />}
                        placeholder="Enter your email"
                        size="large"
                        disabled
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  name="phone"
                  label="Phone Number"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your phone number",
                    },
                    {
                      pattern: /^[0-9]{10}$/,
                      message: "Please enter a valid 10-digit phone number",
                    },
                  ]}
                >
                  <Input
                    prefix={<PhoneOutlined />}
                    placeholder="Enter your phone number"
                    size="large"
                    maxLength={10}
                  />
                </Form.Item>

                <Divider />
                <Title level={5} className="mb-4">
                  <HomeOutlined className="mr-2" />
                  Shipping Address
                </Title>

                <Form.Item
                  name="address"
                  label="Street Address"
                  rules={[
                    { required: true, message: "Please enter your address" },
                    { min: 10, message: "Please enter a complete address" },
                  ]}
                >
                  <Input.TextArea
                    placeholder="Enter your complete address"
                    rows={3}
                    size="large"
                  />
                </Form.Item>

                <Row gutter={16}>
                  <Col xs={24} sm={8}>
                    <Form.Item
                      name="city"
                      label="City"
                      rules={[{ required: true, message: "Please enter city" }]}
                    >
                      <Input placeholder="City" size="large" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={8}>
                    <Form.Item
                      name="state"
                      label="State"
                      rules={[
                        { required: true, message: "Please enter state" },
                      ]}
                    >
                      <Input placeholder="State" size="large" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={8}>
                    <Form.Item
                      name="pincode"
                      label="PIN Code"
                      rules={[
                        { required: true, message: "Please enter PIN code" },
                        {
                          pattern: /^[0-9]{5}$/,
                          message: "Please enter a valid 5-digit PIN code",
                        },
                      ]}
                    >
                      <Input
                        placeholder="PIN Code"
                        size="large"
                        maxLength={5}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Divider />
                <Title level={5} className="mb-4">
                  <SafetyOutlined className="mr-2" />
                  Payment Method
                </Title>

                <Radio.Group
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full"
                >
                  <Space direction="vertical" className="w-full">
                    <Radio
                      value="card"
                      className="w-full p-4 border rounded-lg"
                    >
                      <Space>
                        <CreditCardOutlined />
                        <span>Credit/Debit Card</span>
                      </Space>
                    </Radio>
                    <Radio value="upi" className="w-full p-4 border rounded-lg">
                      <Space>
                        <SafetyOutlined />
                        <span>UPI Payment</span>
                      </Space>
                    </Radio>
                    <Radio value="cod" className="w-full p-4 border rounded-lg">
                      <Space>
                        <HomeOutlined />
                        <span>Cash on Delivery</span>
                      </Space>
                    </Radio>
                  </Space>
                </Radio.Group>

                <div className="mt-6">
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    block
                    loading={loading}
                    className="h-12 text-lg font-semibold"
                  >
                    {loading
                      ? "Processing..."
                      : `Place Order - ₹${calculateTotal().toLocaleString()}`}
                  </Button>
                </div>
              </Form>
            </Card>
          </Col>

          <Col xs={24} lg={10}>
            <Card
              title={
                <Space>
                  <ShoppingCartOutlined />
                  <span>Order Summary</span>
                </Space>
              }
              className="sticky top-4"
            >
              <List
                itemLayout="horizontal"
                dataSource={cartItems}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar src={item.url} size={60} shape="square" />
                      }
                      title={
                        <div className="flex justify-between items-start">
                          <span className="font-medium">{item.name}</span>
                          <Tag color="blue">Qty: {item.quantity}</Tag>
                        </div>
                      }
                      description={
                        <div className="flex justify-between items-center mt-2">
                          <Text type="secondary">
                            ₹{item.price.toLocaleString()} each
                          </Text>
                          <Text strong className="text-lg">
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </Text>
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />

              <Divider />

              <div className="space-y-3">
                <div className="flex justify-between">
                  <Text>Subtotal:</Text>
                  <Text>₹{calculateSubtotal().toLocaleString()}</Text>
                </div>
                <div className="flex justify-between">
                  <Text>Tax (GST 18%):</Text>
                  <Text>₹{calculateTax().toLocaleString()}</Text>
                </div>
                <div className="flex justify-between">
                  <Text>Shipping:</Text>
                  <Text>
                    {calculateShipping() === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      `₹${calculateShipping()}`
                    )}
                  </Text>
                </div>
                <Divider />
                <div className="flex justify-between text-lg font-semibold">
                  <Text strong>Total:</Text>
                  <Text strong className="text-xl text-blue-600">
                    ₹{calculateTotal().toLocaleString()}
                  </Text>
                </div>
              </div>

              {calculateShipping() === 0 && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <Text className="text-green-700 text-sm">
                    🎉 Congratulations! You've qualified for free shipping!
                  </Text>
                </div>
              )}
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}

// import React, { useContext } from "react";
// import CheckOutForm, { CheckOutValues } from "../components/CheckOutForm";
// import { CartContext } from "../context/CartContext";
// import { addDoc, collection } from "firebase/firestore";
// import {
//   Button,
//   message,
//   Row,
//   Col,
//   Card,
//   Typography,
//   Space,
//   Radio,
//   Divider,
//   List,
// } from "antd";
// import { db } from "../utils/firebase";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// const { Title, Text, Paragraph } = Typography;

// const CheckOut = () => {
//   const { cartItems } = useContext(CartContext);
//   const { user } = useContext(AuthContext);
//   // console.log("CheckOut form => ", CheckOutValues);
//   const Navigate = useNavigate();
//   const uploadSale = () => {
//     if (!CheckOutValues) message.error("Please Submit Your Information first!");
//     if (CheckOutValues) {
//       const docRef = collection(db, "sales", "orders");

//       const saleData = {
//         userInfo: CheckOutValues,
//         totalPrice,
//         soldItems: cartItems,
//         timestamp: new Date(),
//       };

//       addDoc(docRef, saleData);
//       console.log("Upload Completed");
//       Navigate("/");
//     }
//   };

//   const totalPrice = cartItems.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );

//   return (
//     <div style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
//       <Row gutter={[24, 24]}>
//         {/* Checkout Form Section */}
//         <Col xs={24} lg={14}>
//           <Card title="Billing Details" bordered={false}>
//             <CheckOutForm />
//           </Card>
//         </Col>

//         {/* Order Summary Section */}
//         <Col xs={24} lg={10}>
//           <Card title="Your Order" bordered={false}>
//             <Space direction="vertical" style={{ width: "100%" }} size="large">
//               {/* Order Header */}
//               <Row justify="space-between">
//                 <Col>
//                   <Title level={5} style={{ margin: 0 }}>
//                     Product
//                   </Title>
//                 </Col>
//                 <Col>
//                   <Title level={5} style={{ margin: 0 }}>
//                     Subtotal
//                   </Title>
//                 </Col>
//               </Row>

//               <Divider style={{ margin: "12px 0" }} />

//               {/* Cart Items */}
//               <List
//                 dataSource={cartItems}
//                 renderItem={(item) => (
//                   <List.Item style={{ padding: "8px 0", border: "none" }}>
//                     <Row justify="space-between" style={{ width: "100%" }}>
//                       <Col xs={16}>
//                         <Text type="secondary">{item.title}</Text>
//                         <Text strong> × {item.quantity}</Text>
//                       </Col>
//                       <Col xs={8} style={{ textAlign: "right" }}>
//                         <Text>RS {item.price * item.quantity}</Text>
//                       </Col>
//                     </Row>
//                   </List.Item>
//                 )}
//               />

//               <Divider />

//               {/* Total */}
//               <Row justify="space-between" align="middle">
//                 <Col>
//                   <Title level={4} style={{ margin: 0 }}>
//                     Total
//                   </Title>
//                 </Col>
//                 <Col>
//                   <Title
//                     level={3}
//                     style={{
//                       margin: 0,
//                       color: "#B88E2F",
//                     }}
//                   >
//                     RS {totalPrice}
//                   </Title>
//                 </Col>
//               </Row>

//               <Divider />

//               {/* Payment Methods */}
//               <Space
//                 direction="vertical"
//                 style={{ width: "100%" }}
//                 size="middle"
//               >
//                 <Title level={5}>Payment Method</Title>

//                 <Paragraph>
//                   Make your payment directly into our bank account. Please use
//                   your Order ID as the payment reference. Your order will not be
//                   shipped until the funds have cleared in our account.
//                 </Paragraph>

//                 <Radio.Group
//                   defaultValue="bank-transfer"
//                   style={{ width: "100%" }}
//                 >
//                   <Space direction="vertical" style={{ width: "100%" }}>
//                     <Radio value="bank-transfer">Direct Bank Transfer</Radio>
//                     <Radio value="cash-on-delivery">Cash on Delivery</Radio>
//                   </Space>
//                 </Radio.Group>

//                 <Paragraph type="secondary" style={{ fontSize: "12px" }}>
//                   Your personal data will be used to support your experience
//                   throughout this website, to manage access to your account, and
//                   for other purposes described in our privacy policy.
//                 </Paragraph>

//                 <Button
//                   type="primary"
//                   size="large"
//                   block
//                   onClick={uploadSale}
//                   style={{
//                     backgroundColor: "#B88E2F",
//                     borderColor: "#B88E2F",
//                     height: "48px",
//                     fontSize: "16px",
//                     fontWeight: "500",
//                   }}
//                 >
//                   Place Order
//                 </Button>
//               </Space>
//             </Space>
//           </Card>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default CheckOut;

"use client";

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

const { Title, Text } = Typography;

export default function CheckOut() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [currentStep, setCurrentStep] = useState(0);

  const { cartItems } = useContext(CartContext);
  const { user } = useContext(AuthContext);

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
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Order placed:", order);
      message.success("Order placed successfully!");
      setCurrentStep(2);

      // Here you would typically:
      // await addDoc(collection(db, "orders"), order);
      // clearCart();
      // navigate("/thankyou");
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
                onClick={() => setCurrentStep(0)}
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
        {/* Progress Steps */}
        <Card className="mb-6">
          <Steps current={currentStep} items={steps} />
        </Card>

        <Row gutter={[24, 24]}>
          {/* Checkout Form */}
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
                {/* Personal Information */}
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

                {/* Shipping Address */}
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
                          pattern: /^[0-9]{6}$/,
                          message: "Please enter a valid 6-digit PIN code",
                        },
                      ]}
                    >
                      <Input
                        placeholder="PIN Code"
                        size="large"
                        maxLength={6}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                {/* Payment Method */}
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

          {/* Order Summary */}
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
              {/* Cart Items */}
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

              {/* Price Breakdown */}
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

import React, { useContext } from "react";
import CheckOutForm, { CheckOutValues } from "../components/CheckOutForm";
import { CartContext } from "../context/CartContext";
import { addDoc, collection } from "firebase/firestore";
import {
  Button,
  message,
  Row,
  Col,
  Card,
  Typography,
  Space,
  Radio,
  Divider,
  List,
} from "antd";
import { db } from "../utils/firebase";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


const { Title, Text, Paragraph } = Typography

const CheckOut = () => {
  const { cartItems } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  // console.log("CheckOut form => ", CheckOutValues);
  const Navigate = useNavigate();
  const uploadSale = () => {
    if (!CheckOutValues) message.error("Please Submit Your Information first!");
    if (CheckOutValues) {
      const docRef = collection(db, "sales", user.uid, "orders");

      const saleData = {
        userInfo: CheckOutValues,
        totalPrice,
        soldItems: cartItems,
        timestamp: new Date(),
      };

      addDoc(docRef, saleData);
      console.log("Upload Completed");
      Navigate("/");
    }
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
      <Row gutter={[24, 24]}>
        {/* Checkout Form Section */}
        <Col xs={24} lg={14}>
          <Card title="Billing Details" bordered={false}>
            <CheckOutForm />
          </Card>
        </Col>

        {/* Order Summary Section */}
        <Col xs={24} lg={10}>
          <Card title="Your Order" bordered={false}>
            <Space direction="vertical" style={{ width: "100%" }} size="large">
              {/* Order Header */}
              <Row justify="space-between">
                <Col>
                  <Title level={5} style={{ margin: 0 }}>
                    Product
                  </Title>
                </Col>
                <Col>
                  <Title level={5} style={{ margin: 0 }}>
                    Subtotal
                  </Title>
                </Col>
              </Row>

              <Divider style={{ margin: "12px 0" }} />

              {/* Cart Items */}
              <List
                dataSource={cartItems}
                renderItem={(item) => (
                  <List.Item style={{ padding: "8px 0", border: "none" }}>
                    <Row justify="space-between" style={{ width: "100%" }}>
                      <Col xs={16}>
                        <Text type="secondary">{item.title}</Text>
                        <Text strong> × {item.quantity}</Text>
                      </Col>
                      <Col xs={8} style={{ textAlign: "right" }}>
                        <Text>RS {item.price * item.quantity}</Text>
                      </Col>
                    </Row>
                  </List.Item>
                )}
              />

              <Divider />

              {/* Total */}
              <Row justify="space-between" align="middle">
                <Col>
                  <Title level={4} style={{ margin: 0 }}>
                    Total
                  </Title>
                </Col>
                <Col>
                  <Title
                    level={3}
                    style={{
                      margin: 0,
                      color: "#B88E2F",
                    }}
                  >
                    RS {totalPrice}
                  </Title>
                </Col>
              </Row>

              <Divider />

              {/* Payment Methods */}
              <Space
                direction="vertical"
                style={{ width: "100%" }}
                size="middle"
              >
                <Title level={5}>Payment Method</Title>

                <Paragraph>
                  Make your payment directly into our bank account. Please use
                  your Order ID as the payment reference. Your order will not be
                  shipped until the funds have cleared in our account.
                </Paragraph>

                <Radio.Group
                  defaultValue="bank-transfer"
                  style={{ width: "100%" }}
                >
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <Radio value="bank-transfer">Direct Bank Transfer</Radio>
                    <Radio value="cash-on-delivery">Cash on Delivery</Radio>
                  </Space>
                </Radio.Group>

                <Paragraph type="secondary" style={{ fontSize: "12px" }}>
                  Your personal data will be used to support your experience
                  throughout this website, to manage access to your account, and
                  for other purposes described in our privacy policy.
                </Paragraph>

                <Button
                  type="primary"
                  size="large"
                  block
                  onClick={uploadSale}
                  style={{
                    backgroundColor: "#B88E2F",
                    borderColor: "#B88E2F",
                    height: "48px",
                    fontSize: "16px",
                    fontWeight: "500",
                  }}
                >
                  Place Order
                </Button>
              </Space>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CheckOut;

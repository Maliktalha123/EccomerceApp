import { useContext, useState, useEffect } from "react";
import PageLocation from "../components/PageLocation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import { AuthContext } from "../context/AuthContext";

import React from "react";
import { Card, Row, Col, Typography, Table, Image, Descriptions } from "antd";

const { Title, Text } = Typography;

export default function OrderDetails({
  CheckOutValues,
  soldItems,
  totalPrice,
}) {
  const [sales, setSales] = useState(null); // Initialize as null to handle loading states
  const { user } = useContext(AuthContext);
  const columns = [
    {
      title: "Item",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Price",
    //   dataIndex: "price",
      key: "price",
      render: (soldItems) => `Rs. ${soldItems.price}`,
    },
    {
      title: "Total",
      key: "total",
      render: (soldItems) =>
        `Rs. ${parseInt(soldItems.price) * soldItems.quantity}`,
    },
  ];
  useEffect(() => {
    const fetchSales = async () => {
      if (!user || !user.uid) {
        console.error("User is not authenticated");
        return;
      }

      try {
        const docRef = doc(db, "sales", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setSales(docSnap.data());
        } else {
          console.log("No sales data found for this user");
          setSales({});
        }
      } catch (error) {
        console.error("Error fetching sales data:", error);
        setSales(null); // Handle errors gracefully
      }
    };

    fetchSales();
  }, [user]);

  if (!user) {
    return <p>Please log in to view your orders.</p>;
  }

  if (sales === null) {
    return <p>Loading your orders...</p>;
  }

  if (Object.keys(sales).length === 0) {
    return <p>No orders found.</p>;
  }

  CheckOutValues = sales.CheckOutValues;
  soldItems = sales.soldItems;
  totalPrice = sales.totalPrice;
  console.log(sales);
  return (
    <div style={{ padding: "24px" }}>
      <Title level={2}>Your Orders</Title>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card title="Customer Information">
            <Descriptions column={1}>
              <Descriptions.Item label="Name">{`${CheckOutValues.firstName} ${CheckOutValues.lastName}`}</Descriptions.Item>
              <Descriptions.Item label="Email">
                {CheckOutValues.email}
              </Descriptions.Item>
              <Descriptions.Item label="Phone">
                {CheckOutValues.phoneNumber}
              </Descriptions.Item>
              <Descriptions.Item label="Company">
                {CheckOutValues.companyName}
              </Descriptions.Item>
              <Descriptions.Item label="Address">
                {`${CheckOutValues.streetAddress}, ${CheckOutValues.city}, ${CheckOutValues.SelectProvince}, ${CheckOutValues.Select}`}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card title="Order Summary">
            <Table
              dataSource={soldItems}
              columns={columns}
              pagination={false}
              summary={() => (
                <Table.Summary>
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0} colSpan={3}>
                      <Text strong>Total</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={1}>
                      <Text strong>{`Rs. ${totalPrice}`}</Text>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                </Table.Summary>
              )}
            />
          </Card>
        </Col>
      </Row>

      <Title level={3} style={{ marginTop: "24px" }}>
        Purchased Items
      </Title>
      <Row gutter={[16, 16]}>
        {soldItems.map((item) => (
          <Col  xs={24} sm={12} md={8} key={item.id}>
            <Card
              cover={<Image alt={item.title} src={item.url} maxwidth={300} height={250}/>}
              actions={[
                <Text key="price">Price: Rs. {item.price}</Text>,
                <Text key="quantity">Quantity: {item.quantity}</Text>,
              ]}
            >
              <Card.Meta title={item.title} description={item.desc} />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

// fffffffffffffffffffffffffffffffff

import React, { useEffect, useState } from "react"
import { Image, message, Card, Spin, Typography, Divider } from "antd"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../../utils/firebase"

const { Title, Text } = Typography

const Soldout = () => {
  const [loading, setLoading] = useState(false)
  const [sales, setSales] = useState([])

  useEffect(() => {
    getSoldOutsFromDB()
  }, [])

  const getSoldOutsFromDB = async () => {
    try {
      setLoading(true)
      const ref = collection(db, "sales")
      const salesData = await getDocs(ref)
      if (!salesData.empty) {
        const allSales = salesData.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        setSales(allSales)
      }
    } catch (err) {
      message.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Title level={2} className="text-center mb-8">
        Sold Out Items
      </Title>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sales.map((data) => (
          <Card
            key={data.id}
            className="shadow-lg hover:shadow-xl transition-shadow duration-300"
            cover={
              <div className="bg-gray-100 p-4">
                <Title level={4} className="text-center">
                  {data.CheckOutValues.firstName} {data.CheckOutValues.lastName}
                </Title>
              </div>
            }
          >
            <div className="space-y-4">
              {data.soldItems.map((item, index) => (
                <div key={index} className="flex space-x-4">
                  <Image
                    src={item.url || "/placeholder.svg"}
                    alt={item.title}
                    width={100}
                    height={100}
                    className="object-cover rounded"
                  />
                  <div className="flex flex-col justify-between">
                    <Text strong>{item.title}</Text>
                    <Text>Price: ${item.price}</Text>
                    <Text>Quantity: {item.quantity}</Text>
                  </div>
                </div>
              ))}
              <Divider />
              <div className="flex justify-between items-center">
                <Text strong>Total Price:</Text>
                <Text className="text-lg font-semibold text-blue-600">${data.totalPrice}</Text>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Soldout


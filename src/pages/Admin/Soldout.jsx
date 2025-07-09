import { useEffect, useState } from "react"
import { collection, getDocs, doc, updateDoc } from "firebase/firestore"
import {
  Card,
  Typography,
  List,
  Tag,
  Spin,
  Divider,
  Row,
  Col,
  Avatar,
  Space,
  Empty,
  Badge,
  Button,
  Input,
  Select,
  DatePicker,
  Modal,
  message,
  Dropdown,
  Statistic,
} from "antd"
import {
  ShoppingCartOutlined,
  UserOutlined,
  PhoneOutlined,
  CreditCardOutlined,
  CalendarOutlined,
  SearchOutlined,
  FilterOutlined,
  EditOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  TruckOutlined,
  ExclamationCircleOutlined,
  ReloadOutlined,
  DownOutlined,
} from "@ant-design/icons"
import { db } from "../../utils/firebase"

const { Title, Text } = Typography
const { Search } = Input
const { Option } = Select
const { RangePicker } = DatePicker
const { confirm } = Modal

export default function AllOrders() {
  const [allOrders, setAllOrders] = useState([])
  const [filteredOrders, setFilteredOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState({})
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [paymentFilter, setPaymentFilter] = useState("all")
  const [stats, setStats] = useState({})

  const statusOptions = [
    { value: "pending", label: "Pending", icon: <ClockCircleOutlined />, color: "orange" },
    // { value: "confirmed", label: "Confirmed", icon: <CheckCircleOutlined />, color: "blue" },
    { value: "processing", label: "Processing", icon: <EditOutlined />, color: "purple" },
    { value: "shipped", label: "Shipped", icon: <TruckOutlined />, color: "cyan" },
    { value: "delivered", label: "Delivered", icon: <CheckCircleOutlined />, color: "green" },
    { value: "cancelled", label: "Cancelled", icon: <ExclamationCircleOutlined />, color: "red" },
  ]

  const fetchAllOrders = async () => {
    try {
      setLoading(true)
      const ordersSnapshot = await getDocs(collection(db, "orders"))
      const ordersData = []
      ordersSnapshot.forEach((doc) => {
        ordersData.push({ id: doc.id, ...doc.data() })
      })

      // Sort by creation date (newest first)
      const sortedOrders = ordersData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

      setAllOrders(sortedOrders)
      setFilteredOrders(sortedOrders)
      calculateStats(sortedOrders)
    } catch (err) {
      console.error("Error fetching orders:", err)
      message.error("Failed to fetch orders. Please try again.")
      
    } finally {
      setLoading(false)
    }
  }

  const calculateStats = (orders) => {
    const stats = {
      total: orders.length,
      pending: orders.filter((o) => o.status === "pending").length,
      processing: orders.filter((o) => o.status === "processing" || o.status === "confirmed").length,
      shipped: orders.filter((o) => o.status === "shipped").length,
      delivered: orders.filter((o) => o.status === "delivered").length,
      cancelled: orders.filter((o) => o.status === "cancelled").length,
      totalRevenue: orders
        .filter((o) => o.status !== "cancelled")
        .reduce((sum, order) => sum + (order.totalAmount || 0), 0),
    }
    setStats(stats)
  }

  const updateOrderStatus = async (orderId, newStatus, currentStatus) => {
    // Prevent unnecessary updates
    if (newStatus === currentStatus) return

    try {
      setUpdating((prev) => ({ ...prev, [orderId]: true }))

      // Update in Firebase
      const orderRef = doc(db, "orders", orderId)
      await updateDoc(orderRef, {
        status: newStatus,
        updatedAt: new Date().toISOString(),
      })

      // Update local state
      const updatedOrders = allOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus, updatedAt: new Date().toISOString() } : order,
      )

      setAllOrders(updatedOrders)
      calculateStats(updatedOrders)

      message.success(`Order status updated to ${newStatus}`)
    } catch (error) {
      console.error("Error updating order status:", error)
      message.error("Failed to update order status. Please try again.")
    } finally {
      setUpdating((prev) => ({ ...prev, [orderId]: false }))
    }
  }

  const handleStatusChange = (orderId, newStatus, currentStatus, orderEmail) => {
    const statusObj = statusOptions.find((s) => s.value === newStatus)
    const currentStatusObj = statusOptions.find((s) => s.value === currentStatus)

    confirm({
      title: "Update Order Status",
      icon: <ExclamationCircleOutlined />,
      content: (
        <div>
          <p>Are you sure you want to change the status of this order?</p>
          <div className="mt-3 p-3 bg-gray-50 rounded">
            <p>
              <strong>Order ID:</strong> #{orderId.slice(-8).toUpperCase()}
            </p>
            <p>
              <strong>Customer:</strong> {orderEmail}
            </p>
            <p>
              <strong>From:</strong> <Tag color={currentStatusObj?.color}>{currentStatusObj?.label}</Tag>
            </p>
            <p>
              <strong>To:</strong> <Tag color={statusObj?.color}>{statusObj?.label}</Tag>
            </p>
          </div>
        </div>
      ),
      okText: "Update Status",
      okType: "primary",
      cancelText: "Cancel",
      onOk() {
        updateOrderStatus(orderId, newStatus, currentStatus)
      },
    })
  }

  useEffect(() => {
    fetchAllOrders()
  }, [])

  // Filter orders based on search and filters
  useEffect(() => {
    let filtered = allOrders

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customerInfo?.phone?.includes(searchTerm),
      )
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.status === statusFilter)
    }

    // Payment method filter
    if (paymentFilter !== "all") {
      filtered = filtered.filter((order) => order.paymentMethod === paymentFilter)
    }

    setFilteredOrders(filtered)
  }, [searchTerm, statusFilter, paymentFilter, allOrders])

  const getStatusColor = (status) => {
    const statusObj = statusOptions.find((s) => s.value === status)
    return statusObj?.color || "default"
  }

  const getStatusIcon = (status) => {
    const statusObj = statusOptions.find((s) => s.value === status)
    return statusObj?.icon || <ClockCircleOutlined />
  }

  const getPaymentIcon = (method) => {
    return method === "cod" ? "💰" : "💳"
  }

  const getStatusMenuItems = (currentStatus, orderId, orderEmail) => {
    return statusOptions.map((status) => ({
      key: status.value,
      label: (
        <div className="flex items-center space-x-2">
          {status.icon}
          <span>{status.label}</span>
        </div>
      ),
      disabled: status.value === currentStatus,
      onClick: () => handleStatusChange(orderId, status.value, currentStatus, orderEmail),
    }))
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <Spin size="large" />
          <div className="mt-4">
            <Text type="secondary">Loading orders...</Text>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Title level={1} className="mb-2">
                <ShoppingCartOutlined className="mr-3" />
                Orders Management
              </Title>
              <Text type="secondary" className="text-base">
                Manage and track all customer orders
              </Text>
            </div>
            <div className="mt-4 sm:mt-0">
              <Button type="primary" icon={<ReloadOutlined />} onClick={fetchAllOrders} loading={loading}>
                Refresh
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <Row gutter={[16, 16]} className="mb-6">
          <Col xs={12} sm={8} md={4}>
            <Card className="text-center">
              <Statistic title="Total Orders" value={stats.total} />
            </Card>
          </Col>
          <Col xs={12} sm={8} md={4}>
            <Card className="text-center">
              <Statistic title="Pending" value={stats.pending} valueStyle={{ color: "#fa8c16" }} />
            </Card>
          </Col>
          <Col xs={12} sm={8} md={4}>
            <Card className="text-center">
              <Statistic title="Processing" value={stats.processing} valueStyle={{ color: "#1890ff" }} />
            </Card>
          </Col>
          <Col xs={12} sm={8} md={4}>
            <Card className="text-center">
              <Statistic title="Shipped" value={stats.shipped} valueStyle={{ color: "#13c2c2" }} />
            </Card>
          </Col>
          <Col xs={12} sm={8} md={4}>
            <Card className="text-center">
              <Statistic title="Delivered" value={stats.delivered} valueStyle={{ color: "#52c41a" }} />
            </Card>
          </Col>
          <Col xs={12} sm={8} md={4}>
            <Card className="text-center">
              <Statistic
                title="Revenue"
                value={stats.totalRevenue}
                prefix="₹"
                precision={0}
                valueStyle={{ color: "#52c41a" }}
              />
            </Card>
          </Col>
        </Row>

        {/* Filters */}
        <Card className="mb-6 shadow-sm">
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} sm={12} md={8}>
              <Search
                placeholder="Search by Order ID, Email, or Phone"
                allowClear
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                prefix={<SearchOutlined />}
                size="large"
              />
            </Col>
            <Col xs={12} sm={6} md={4}>
              <Select
                placeholder="Status"
                value={statusFilter}
                onChange={setStatusFilter}
                size="large"
                className="w-full"
                suffixIcon={<FilterOutlined />}
              >
                <Option value="all">All Status</Option>
                {statusOptions.map((status) => (
                  <Option key={status.value} value={status.value}>
                    <div className="flex items-center space-x-2">
                      {status.icon}
                      <span>{status.label}</span>
                    </div>
                  </Option>
                ))}
              </Select>
            </Col>
            <Col xs={12} sm={6} md={4}>
              <Select
                placeholder="Payment"
                value={paymentFilter}
                onChange={setPaymentFilter}
                size="large"
                className="w-full"
              >
                <Option value="all">All Payment</Option>
                <Option value="cod">Cash on Delivery</Option>
                <Option value="online">Online Payment</Option>
              </Select>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <div className="flex justify-end">
                <Badge count={filteredOrders.length} showZero>
                  <Button type="primary" size="large">
                    Filtered Results
                  </Button>
                </Badge>
              </div>
            </Col>
          </Row>
        </Card>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <Card className="text-center py-12">
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                <span>
                  {searchTerm || statusFilter !== "all" || paymentFilter !== "all"
                    ? "No orders match your filters"
                    : "No orders found"}
                </span>
              }
            >
              {(searchTerm || statusFilter !== "all" || paymentFilter !== "all") && (
                <Button
                  type="primary"
                  onClick={() => {
                    setSearchTerm("")
                    setStatusFilter("all")
                    setPaymentFilter("all")
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </Empty>
          </Card>
        ) : (
          <List
            dataSource={filteredOrders}
            renderItem={(order) => (
              <Card
                key={order.id}
                className="mb-6 shadow-sm hover:shadow-md transition-shadow duration-200"
                bodyStyle={{ padding: "24px" }}
              >
                {/* Order Header */}
                <Row gutter={[16, 16]} className="mb-4">
                  <Col xs={24} sm={12} md={14}>
                    <Space direction="vertical" size="small">
                      <Title level={4} className="mb-0">
                        Order #{order.id.slice(-8).toUpperCase()}
                      </Title>
                      <Space wrap>
                        <Text type="secondary">
                          <UserOutlined className="mr-1" />
                          {order.userEmail}
                        </Text>
                        <Text type="secondary">
                          <PhoneOutlined className="mr-1" />
                          {order.customerInfo?.phone || "N/A"}
                        </Text>
                      </Space>
                    </Space>
                  </Col>
                  <Col xs={24} sm={12} md={10}>
                    <div className="text-right">
                      <div className="mb-2 flex justify-end items-center space-x-2">
                        <Tag
                          color={getStatusColor(order.status)}
                          icon={getStatusIcon(order.status)}
                          className="text-sm px-3 py-1"
                        >
                          {order.status?.toUpperCase() || "PENDING"}
                        </Tag>
                        <Dropdown
                          menu={{
                            items: getStatusMenuItems(order.status, order.id, order.userEmail),
                          }}
                          trigger={["click"]}
                          placement="bottomRight"
                        >
                          <Button type="text" size="small" loading={updating[order.id]} icon={<EditOutlined />}>
                            <DownOutlined />
                          </Button>
                        </Dropdown>
                      </div>
                      <Text type="secondary" className="flex items-center justify-end">
                        <CalendarOutlined className="mr-1" />
                        {new Date(order.createdAt).toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </Text>
                    </div>
                  </Col>
                </Row>

                <Divider className="my-4" />

                {/* Order Items */}
                <div className="mb-4">
                  <Title level={5} className="mb-3">
                    Order Items ({order.items?.length || 0})
                  </Title>
                  <List
                    itemLayout="horizontal"
                    dataSource={order.items}
                    renderItem={(item) => (
                      <List.Item className="px-0">
                        <List.Item.Meta
                          avatar={<Avatar src={item.url} size={64} shape="square" className="border" />}
                          title={
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                              <Text strong className="text-base">
                                {item.name}
                              </Text>
                              <Badge count={item.quantity} style={{ backgroundColor: "#52c41a" }} className="sm:ml-4" />
                            </div>
                          }
                          description={
                            <Space direction="vertical" size="small">
                              <Text>₹{item.price?.toLocaleString() || "0"} per item</Text>
                              <Text strong className="text-blue-600">
                                Subtotal: ₹{((item.price || 0) * (item.quantity || 0)).toLocaleString()}
                              </Text>
                            </Space>
                          }
                        />
                      </List.Item>
                    )}
                  />
                </div>

                <Divider className="my-4" />

                {/* Order Summary */}
                <Row gutter={[16, 16]} align="middle">
                  <Col xs={24} sm={12} md={14}>
                    <Space wrap size="large">
                      <div>
                        <Text type="secondary" className="block">
                          Payment Method
                        </Text>
                        <Text strong className="flex items-center">
                          <CreditCardOutlined className="mr-2" />
                          {getPaymentIcon(order.paymentMethod)} {order.paymentMethod?.toUpperCase() || "N/A"}
                        </Text>
                      </div>
                      {order.customerInfo?.address && (
                        <div>
                          <Text type="secondary" className="block">
                            Delivery Address
                          </Text>
                          <Text className="max-w-xs">{order.customerInfo.address}</Text>
                        </div>
                      )}
                    </Space>
                  </Col>
                  <Col xs={24} sm={12} md={10}>
                    <div className="text-right">
                      <div className="bg-blue-50 p-4 rounded-lg inline-block">
                        <Text type="secondary" className="block mb-1">
                          Total Amount
                        </Text>
                        <Title level={3} className="mb-0 text-blue-600">
                          ₹{order.totalAmount?.toLocaleString() || "0"}
                        </Title>
                      </div>
                    </div>
                  </Col>
                </Row>

                {/* Last Updated */}
                {order.updatedAt && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <Text type="secondary" className="text-xs">
                      Last updated: {new Date(order.updatedAt).toLocaleString("en-IN")}
                    </Text>
                  </div>
                )}
              </Card>
            )}
          />
        )}
      </div>
    </div>
  )
}

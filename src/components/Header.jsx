

import { useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  HeartOutlined,
  UserOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  MenuOutlined,
  LogoutOutlined,
  LoginOutlined,
  HomeOutlined,
  ShopOutlined,
  InfoCircleOutlined,
  ContactsOutlined,
  FileTextOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ShoppingOutlined,
} from "@ant-design/icons"
import { Badge, Button, Drawer, Divider, Avatar, Dropdown } from "antd"
import { auth } from "../utils/firebase"
import { signOut } from "firebase/auth"
import { AuthContext } from "../context/AuthContext"
import { CartContext } from "../context/CartContext"

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  const { cartItems } = useContext(CartContext)

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/signin")
        setMobileMenuOpen(false)
      })
      .catch((err) => console.log("Error in signOut => ", err))
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  // Admin navigation items
  const adminNavItems = [
    { key: "products", label: "Products", icon: <ShoppingOutlined />, path: "/admin/products" },
    { key: "categories", label: "Categories", icon: <AppstoreOutlined />, path: "/admin/categories" },
    { key: "purchases", label: "Purchases", icon: <FileTextOutlined />, path: "/admin/purchases" },
    { key: "users", label: "Users", icon: <TeamOutlined />, path: "/admin/users" },
    { key: "contact", label: "Contact Requests", icon: <ContactsOutlined />, path: "/admin/contactrequests" },
  ]

  // Customer navigation items
  const customerNavItems = [
    { key: "home", label: "Home", icon: <HomeOutlined />, path: "/" },
    { key: "shop", label: "Shop", icon: <ShopOutlined />, path: "/shop" },
    { key: "about", label: "About", icon: <InfoCircleOutlined />, path: "/about" },
    { key: "contact", label: "Contact", icon: <ContactsOutlined />, path: "/contact" },
    { key: "orders", label: "My Orders", icon: <FileTextOutlined />, path: "/myorders" },
  ]

  // User dropdown menu
  const userMenuItems = [
    {
      key: "profile",
      label: "Profile",
      icon: <UserOutlined />,
      onClick: () => navigate("/profile"),
    },
    {
      key: "orders",
      label: "My Orders",
      icon: <FileTextOutlined />,
      onClick: () => navigate("/myorders"),
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      label: "Logout",
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    },
  ]

  // Don't render header if user is not logged in (except for admin)
  if (user?.isLogin === false && user?.email !== "talha@gmail.com") {
    return null
  }

  const isAdmin = user?.email === "talha@gmail.com"
  const navItems = isAdmin ? adminNavItems : customerNavItems

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">L</span>
                </div>
                <span className="hidden sm:block text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {isAdmin ? "Admin Panel" : "Your Store"}
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  to={item.path}
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              {!isAdmin && (
                <>
                  <Button
                    type="text"
                    icon={<SearchOutlined />}
                    size="large"
                    className="text-gray-600 hover:text-blue-600"
                    onClick={() => navigate("/search")}
                  />
                  <Button
                    type="text"
                    icon={<HeartOutlined />}
                    size="large"
                    className="text-gray-600 hover:text-blue-600"
                    onClick={() => navigate("/favorite")}
                  />
                  <Badge count={cartItems?.length || 0} size="small">
                    <Button
                      type="text"
                      icon={<ShoppingCartOutlined />}
                      size="large"
                      className="text-gray-600 hover:text-blue-600"
                      onClick={() => navigate("/cart")}
                    />
                  </Badge>
                </>
              )}

              {user?.isLogin === false ? (
                <Button
                  type="primary"
                  icon={<LoginOutlined />}
                  onClick={() => navigate("/signin")}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 border-none"
                >
                  Login
                </Button>
              ) : (
                <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" trigger={["click"]}>
                  <Button type="text" className="flex items-center space-x-2 p-2">
                    <Avatar
                      size="small"
                      icon={<UserOutlined />}
                      className="bg-gradient-to-r from-blue-600 to-purple-600"
                    />
                    <span className="text-gray-700 font-medium">{isAdmin ? "Admin" : "Account"}</span>
                  </Button>
                </Dropdown>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button
              type="text"
              icon={<MenuOutlined />}
              size="large"
              className="lg:hidden text-gray-600"
              onClick={toggleMobileMenu}
            />
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <Drawer
        title={
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">L</span>
            </div>
            <span className="text-lg font-bold">{isAdmin ? "Admin Panel" : "Your Store"}</span>
          </div>
        }
        placement="right"
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
        width={300}
        className="lg:hidden"
      >
        <div className="flex flex-col space-y-4">
          {/* Navigation Links */}
          <div className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.key}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </div>

          {!isAdmin && (
            <>
              <Divider />
              {/* Action Buttons */}
              <div className="space-y-2">
                <Button
                  type="text"
                  icon={<SearchOutlined />}
                  size="large"
                  block
                  className="flex items-center justify-start space-x-2 text-gray-700"
                  onClick={() => {
                    navigate("/search")
                    setMobileMenuOpen(false)
                  }}
                >
                  <span>Search</span>
                </Button>
                <Button
                  type="text"
                  icon={<HeartOutlined />}
                  size="large"
                  block
                  className="flex items-center justify-start space-x-2 text-gray-700"
                  onClick={() => {
                    navigate("/favorite")
                    setMobileMenuOpen(false)
                  }}
                >
                  <span>Favorites</span>
                </Button>
                <Button
                  type="text"
                  size="large"
                  block
                  className="flex items-center justify-start space-x-2 text-gray-700"
                  onClick={() => {
                    navigate("/cart")
                    setMobileMenuOpen(false)
                  }}
                >
                  <Badge count={cartItems?.length || 0} size="small">
                    <ShoppingCartOutlined />
                  </Badge>
                  <span className="ml-2">Cart</span>
                </Button>
              </div>
            </>
          )}

          <Divider />

          {/* User Actions */}
          <div className="space-y-2">
            {user?.isLogin === false ? (
              <Button
                type="primary"
                icon={<LoginOutlined />}
                size="large"
                block
                onClick={() => {
                  navigate("/signin")
                  setMobileMenuOpen(false)
                }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 border-none"
              >
                Login
              </Button>
            ) : (
              <>
                <Button
                  type="text"
                  icon={<UserOutlined />}
                  size="large"
                  block
                  className="flex items-center justify-start space-x-2 text-gray-700"
                  onClick={() => {
                    navigate("/profile")
                    setMobileMenuOpen(false)
                  }}
                >
                  <span>Profile</span>
                </Button>
                <Button
                  type="text"
                  icon={<LogoutOutlined />}
                  size="large"
                  block
                  className="flex items-center justify-start space-x-2 text-red-600"
                  onClick={handleLogout}
                >
                  <span>Logout</span>
                </Button>
              </>
            )}
          </div>
        </div>
      </Drawer>
    </>
  )
}

export default Header

"use client"

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
    { key: "contact", label: "Contact", icon: <ContactsOutlined />, path: "/admin/contactrequests" },
  ]

  // Customer navigation items
  const customerNavItems = [
    { key: "home", label: "Home", icon: <HomeOutlined />, path: "/" },
    { key: "shop", label: "Shop", icon: <ShopOutlined />, path: "/shop" },
    { key: "about", label: "About", icon: <InfoCircleOutlined />, path: "/about" },
    { key: "contact", label: "Contact", icon: <ContactsOutlined />, path: "/contact" },
    { key: "orders", label: "Orders", icon: <FileTextOutlined />, path: "/myorders" },
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

  // Get responsive drawer width
  const getDrawerWidth = () => {
    if (typeof window !== "undefined") {
      const screenWidth = window.innerWidth
      if (screenWidth <= 320) return Math.min(screenWidth - 20, 280) // Very small screens
      if (screenWidth <= 480) return Math.min(screenWidth - 40, 300) // Small screens
      return 320 // Default width
    }
    return 300
  }

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            {/* Logo - Optimized for small screens */}
            <div className="flex items-center min-w-0 flex-shrink-0">
              <Link to="/" className="flex items-center space-x-1 sm:space-x-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm sm:text-lg">L</span>
                </div>
                <span className="hidden xs:block sm:block text-sm sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent truncate max-w-[120px] sm:max-w-none">
                  {isAdmin ? "Admin" : "Store"}
                </span>
              </Link>
            </div>

            {/* Desktop Navigation - Hidden on small screens */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  to={item.path}
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium whitespace-nowrap"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>

            {/* Desktop Actions - Optimized spacing */}
            <div className="hidden md:flex items-center space-x-1 sm:space-x-2 lg:space-x-4">
              {!isAdmin && (
                <>
                  <Button
                    type="text"
                    icon={<SearchOutlined />}
                    size="middle"
                    className="text-gray-600 hover:text-blue-600 p-1 sm:p-2"
                    onClick={() => navigate("/search")}
                  />
                  <Button
                    type="text"
                    icon={<HeartOutlined />}
                    size="middle"
                    className="text-gray-600 hover:text-blue-600 p-1 sm:p-2"
                    onClick={() => navigate("/favorite")}
                  />
                  <Badge count={cartItems?.length || 0} size="small">
                    <Button
                      type="text"
                      icon={<ShoppingCartOutlined />}
                      size="middle"
                      className="text-gray-600 hover:text-blue-600 p-1 sm:p-2"
                      onClick={() => navigate("/cart")}
                    />
                  </Badge>
                </>
              )}

              {user?.isLogin === false ? (
                <Button
                  type="primary"
                  icon={<LoginOutlined />}
                  size="small"
                  onClick={() => navigate("/signin")}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 border-none text-xs sm:text-sm px-2 sm:px-4"
                >
                  <span className="hidden sm:inline">Login</span>
                </Button>
              ) : (
                <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" trigger={["click"]}>
                  <Button type="text" className="flex items-center space-x-1 sm:space-x-2 p-1 sm:p-2">
                    <Avatar
                      size="small"
                      icon={<UserOutlined />}
                      className="bg-gradient-to-r from-blue-600 to-purple-600"
                    />
                    <span className="hidden lg:inline text-gray-700 font-medium text-sm">
                      {isAdmin ? "Admin" : "Account"}
                    </span>
                  </Button>
                </Dropdown>
              )}
            </div>

            {/* Mobile Actions - Compact for very small screens */}
            <div className="flex md:hidden items-center space-x-1">
              {!isAdmin && (
                <Badge count={cartItems?.length || 0} size="small" offset={[-2, 2]}>
                  <Button
                    type="text"
                    icon={<ShoppingCartOutlined />}
                    size="small"
                    className="text-gray-600 hover:text-blue-600 p-1"
                    onClick={() => navigate("/cart")}
                  />
                </Badge>
              )}

              {user?.isLogin === false && (
                <Button
                  type="primary"
                  size="small"
                  onClick={() => navigate("/signin")}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 border-none text-xs px-2 py-1 h-7"
                >
                  Login
                </Button>
              )}

              {/* Mobile Menu Button */}
              <Button
                type="text"
                icon={<MenuOutlined />}
                size="small"
                className="text-gray-600 p-1 ml-1"
                onClick={toggleMobileMenu}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer - Responsive width */}
      <Drawer
        title={
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">L</span>
            </div>
            <span className="text-base font-bold truncate">{isAdmin ? "Admin Panel" : "Your Store"}</span>
          </div>
        }
        placement="right"
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
        width={getDrawerWidth()}
        className="md:hidden"
        styles={{
          body: { padding: "16px 12px" },
          header: { padding: "16px 12px" },
        }}
      >
        <div className="flex flex-col space-y-3">
          {/* Navigation Links - Compact spacing */}
          <div className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.key}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-3 p-2.5 rounded-lg hover:bg-gray-50 text-gray-700 hover:text-blue-600 transition-colors duration-200 text-sm"
              >
                <span className="flex-shrink-0">{item.icon}</span>
                <span className="font-medium truncate">{item.label}</span>
              </Link>
            ))}
          </div>

          {!isAdmin && (
            <>
              <Divider style={{ margin: "12px 0" }} />
              {/* Action Buttons - Compact */}
              <div className="space-y-1">
                <Button
                  type="text"
                  icon={<SearchOutlined />}
                  size="middle"
                  block
                  className="flex items-center justify-start space-x-2 text-gray-700 h-10 text-sm"
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
                  size="middle"
                  block
                  className="flex items-center justify-start space-x-2 text-gray-700 h-10 text-sm"
                  onClick={() => {
                    navigate("/favorite")
                    setMobileMenuOpen(false)
                  }}
                >
                  <span>Favorites</span>
                </Button>
                <Button
                  type="text"
                  size="middle"
                  block
                  className="flex items-center justify-start space-x-2 text-gray-700 h-10 text-sm"
                  onClick={() => {
                    navigate("/cart")
                    setMobileMenuOpen(false)
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <Badge count={cartItems?.length || 0} size="small">
                      <ShoppingCartOutlined />
                    </Badge>
                    <span>Cart</span>
                  </div>
                </Button>
              </div>
            </>
          )}

          <Divider style={{ margin: "12px 0" }} />

          {/* User Actions - Compact */}
          <div className="space-y-1">
            {user?.isLogin === false ? (
              <Button
                type="primary"
                icon={<LoginOutlined />}
                size="middle"
                block
                onClick={() => {
                  navigate("/signin")
                  setMobileMenuOpen(false)
                }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 border-none h-10"
              >
                Login
              </Button>
            ) : (
              <>
                <Button
                  type="text"
                  icon={<UserOutlined />}
                  size="middle"
                  block
                  className="flex items-center justify-start space-x-2 text-gray-700 h-10 text-sm"
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
                  size="middle"
                  block
                  className="flex items-center justify-start space-x-2 text-red-600 h-10 text-sm"
                  onClick={handleLogout}
                >
                  <span>Logout</span>
                </Button>
              </>
            )}
          </div>
        </div>
      </Drawer>

      {/* Custom CSS for extra small screens */}
      <style>{`
        @media (max-width: 320px) {
          .truncate {
            max-width: 80px;
          }
        }
        
        @media (min-width: 320px) and (max-width: 480px) {
          .xs\\:block {
            display: block;
          }
        }
      `}</style>
    </>
  )
}

export default Header

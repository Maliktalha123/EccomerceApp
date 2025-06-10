import React, { useState, useContext } from "react";
import CompanyLogo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import "./Components.css";
import {
  HeartOutlined,
  ProfileOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  MenuOutlined,
} from "@ant-design/icons";

import { Badge, Button } from "antd";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

const ResponsiveHeader = ({ user, cartItems, handleLogout, CompanyLogo }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
console.log("User => ",user)
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Conditional rendering based on email
  if (user?.email === "talha@gmail.com") {
    return (
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center">
              <img
                src={CompanyLogo}
                alt="Company Logo"
                className={`${isMenuOpen ? "hidden" : "block"} h-10 md:block`}
              />
            </Link>

            <button
              onClick={toggleMenu}
              className="lg:hidden text-gray-600 focus:outline-none"
            >
              <MenuOutlined className="text-2xl" />
            </button>

            <nav
              className={`${
                isMenuOpen ? "block" : "hidden"
              } lg:flex lg:items-center lg:w-auto w-full lg:mt-0 mt-4`}
            >
              <div className="lg:flex-grow float-right">
                {["Products", "Purchases", "Users", "Contact Requests"].map(
                  (item) => (
                    <Link
                      key={item}
                      to={
                       `admin/${item.toLowerCase().replace(" ", "")}`
                      }
                      className="block mt-4 lg:inline-block lg:mt-0 text-gray-600 hover:text-gray-900 mr-4"
                    >
                      {item}
                    </Link>
                  )
                )}
              </div>
            </nav>

            <div className="hidden lg:flex text-left space-x-4 ">
              {user?.isLogin === false ? (
                <Link to="/signin">
                  <Button type="primary">Login</Button>
                </Link>
              ) : (
                <Button onClick={handleLogout} type="primary">
                  Logout
                </Button>
              )}
            </div>
          </div>

          {isMenuOpen && (
            <div className="lg:hidden mt-4 flex flex-col items-end space-y-4">
              {user?.isLogin === false ? (
                <Link to="/signin">
                  <Button type="primary">Login</Button>
                </Link>
              ) : (
                <Button onClick={handleLogout} type="primary">
                  Logout
                </Button>
              )}
            </div>
          )}
        </div>
      </header>
    );
  } 
  else if(user?.isLogin === false)
  {
   return null
  }
  
  
  else {
    return (
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
          
          <div className={`${isMenuOpen ? "hidden" : "flex"} gap-6 mt-2`}>
            <Link to="/" className="flex items-center ">
              <img src={CompanyLogo} alt="Company Logo" className="h-10" />
            </Link>

            <button
              onClick={toggleMenu}
              className="lg:hidden text-gray-600 focus:outline-none"
            >
              <MenuOutlined className="text-2xl" />
            </button>
            </div>
            <nav
              className={`${
                isMenuOpen ? "block" : "hidden"
              } lg:flex lg:items-center lg:w-auto w-full lg:mt-0 mt-4`}
            >
              <div className="lg:flex-grow">
                {["Home", "Shop", "About", "Contact", "My Orders"].map(
                  (item) => (
                    <Link
                      key={item}
                      to={
                        item === "Home"
                          ? "/"
                          : `/${item.toLowerCase().replace(" ", "")}`
                      }
                      className="block mt-4 lg:inline-block lg:mt-0 text-gray-600 hover:text-gray-900 mr-4"
                    >
                      {item}
                    </Link>
                  )
                )}
              </div>
            </nav>

            <div className="hidden lg:flex items-center space-x-4">
              <Link to="/profile">
                <ProfileOutlined className="text-2xl text-gray-600 hover:text-gray-900" />
              </Link>
              <Link to="/search">
                <SearchOutlined className="text-2xl text-gray-600 hover:text-gray-900" />
              </Link>
              <Link to="/favorite">
                <HeartOutlined className="text-2xl text-gray-600 hover:text-gray-900" />
              </Link>
              <Link to="/cart">
                <Badge count={cartItems.length}>
                  <ShoppingCartOutlined className="text-2xl text-gray-600 hover:text-gray-900" />
                </Badge>
              </Link>
              {user?.isLogin === false ? (
                <Link to="/signin">
                  <Button type="primary">Login</Button>
                </Link>
              ) : (
                <Button onClick={handleLogout} type="primary">
                  Logout
                </Button>
              )}
            </div>
          </div>

          {isMenuOpen && (
            <div className="lg:hidden mt-2 flex flex-col  space-y-4">

            <button
            onClick={toggleMenu}
            className="lg:hidden text-left text-gray-600 focus:outline-none"
          >
            <MenuOutlined className="text-2xl" />
          </button>
              <Link to="/profile">
                <ProfileOutlined className="text-2xl text-gray-600 hover:text-gray-900" />
              </Link>
              <Link to="/search">
                <SearchOutlined className="text-2xl text-gray-600 hover:text-gray-900" />
              </Link>
              <Link to="/favorite">
                <HeartOutlined className="text-2xl text-gray-600 hover:text-gray-900" />
              </Link>
              <Link to="/cart">
                <Badge count={cartItems.length}>
                  <ShoppingCartOutlined className="text-2xl text-gray-600 hover:text-gray-900" />
                </Badge>
              </Link>
              {user?.isLogin === false ? (
                <Link to="/signin">
                  <Button type="primary">Login</Button>
                </Link>
              ) : (
                <Button onClick={handleLogout} type="primary">
                  Logout
                </Button>
              )}
            </div>
          )}
        </div>
      </header>
    );
  }
};

const Header = () => {
  const Navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);

  const handleLogout = () => {
    signOut(auth)
      .then(() => Navigate("/signin"))
      .catch((err) => console.log("Error in signOut => ", err));
  };

  return (
    <ResponsiveHeader
      user={user}
      cartItems={cartItems}
      handleLogout={handleLogout}
      CompanyLogo={CompanyLogo}
    />
  );
};

export default Header;

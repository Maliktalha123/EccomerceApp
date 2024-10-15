import React, { useContext } from "react";
import CompanyLogo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import "./Components.css";
import {
  HeartOutlined,
  ProfileOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

import { Button } from "antd";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const Navigate = useNavigate();

  const { user } = useContext(AuthContext);
  const handleLogout = () => {
    signOut(auth)
      .then(() => Navigate("/signin"))
      .catch((err) => console.log("Error in signOut => ", err));
  };

  return (
    <header className="flex  h-[100px] font-bold">
      <div className="flex m-auto  w-[1286px] h-[41px]">
        <Link
          to={"/"}
          className="flex  title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          <img src={CompanyLogo} alt="Inkfjjf" />
        </Link>
        <nav className="md:ml-auto  md:mr-auto flex flex-wrap w-[430px] h-[24px] items-center m-auto text-base justify-center ">
          <Link to={"/"} className="mr-5 hover:text-gray-900">
            Home
          </Link>
          <Link to={"/shop"} className="mr-5 hover:text-gray-900">
            Shop
          </Link>
          <Link to={"/about"} className="mr-5 hover:text-gray-900">
            About
          </Link>
          <Link to={"/contact"} className="mr-5 hover:text-gray-900">
            Contact
          </Link>
        </nav>
        <div className="flex items-center text-base justify-around  w-56 mr-8">
          <Link to={"/profile"}>
            <ProfileOutlined className="text-2xl cursor-pointer" />
          </Link>
          <Link to={"/search"}>
            {" "}
            <SearchOutlined className="text-2xl cursor-pointer" />
          </Link>
          <Link to={"/favorite"}>
            {" "}
            <HeartOutlined className="text-2xl cursor-pointer" />
          </Link>
          <Link to={"/cart"}>
            {" "}
            <ShoppingCartOutlined className="text-2xl cursor-pointer" />
          </Link>

          {user.isLogin == false ? (
            <Link to={"/signin"}>
              <Button type="primary"> Login</Button>
            </Link>
          ) : (
            <Button onClick={handleLogout} type="primary">
              {" "}
              Logout
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

import { UserOutlined } from "@ant-design/icons";
import { Input } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className=" body-font ">
      <div className="max-w-[1440px]  m-auto min-h-[425px] ">
        <div className="container  px-5 py-12 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
          <div className="w-64 flex-shrink-0 md:mx-0  text-start md:text-left">
            <Link className="flex title-font font-medium   md:justify-start justify-start mb-12  text-gray-900">
              <span className="ml-3 text-xl">Funiro.</span>
            </Link>
            <p className="mt-2 text-start text-sm text-gray-500">
              400 University Drive Suite 200 Coral <br /> Gabies <br />
              FL 33134 USA
            </p>
          </div>
          <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
            <div className="lg:w-1/4 md:w-1/2  w-full px-4">
              <h2 className="title-font font-normal text-gray-900 tracking-widest text-sm mb-3">
                CATEGORIES
              </h2>
              <nav className="list-none flex flex-col gap-8 mt-8 font-bold">
                <li>
                  <Link className="text-gray-600 hover:text-gray-800">
                    Home
                  </Link>
                </li>
                <li>
                  <Link className="text-gray-600 hover:text-gray-800">
                    Shop
                  </Link>
                </li>
                <li>
                  <Link className="text-gray-600 hover:text-gray-800">
                    About
                  </Link>
                </li>
                <li>
                  <Link className="text-gray-600 hover:text-gray-800">
                    Contact
                  </Link>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full  px-4">
              <h2 className="title-font font-normal text-gray-900 tracking-widest text-sm mb-3">
                Help
              </h2>
              <nav className="list-none font-bold flex flex-col gap-8 mt-8">
                <li>
                  <Link className="text-gray-600 hover:text-gray-800">
                    Payment Options
                  </Link>
                </li>
                <li>
                  <Link className="text-gray-600 hover:text-gray-800">
                    Returns
                  </Link>
                </li>
                <li>
                  <Link className="text-gray-600 hover:text-gray-800">
                    Privacy Policy
                  </Link>
                </li>
              </nav>
            </div>
            <div className="lg:w-2/4 md:w-1/2 w-full  px-4 ">
              <h2 className="title-font font-normal text-gray-900 tracking-widest text-sm mb-3">
                Newsletter..
              </h2>
              <div className="flex gap-4">
                {" "}
                <Input
                  placeholder="Enter Your Email"
                  prefix={<UserOutlined />}
                />{" "}
                <span className="font-bold underline my-1 cursor-pointer">
                  SUBSCRIBE
                </span>
              </div>
            </div>
          </div>
        </div>
        <hr />

        <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
          <p className=" text-sm text-center sm:text-left">
            <Link to={"/"} className=" ml-1 font-extrabold">
              2023 Furniro. All rights reserved
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

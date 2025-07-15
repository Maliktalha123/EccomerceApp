import React, { useContext } from "react";
import Footer from "../components/Footer";
import { AuthContext } from "../context/AuthContext";
import { ProductContext } from "../context/ProductsContext";

import { Link } from "react-router-dom";

import Header from "../components/Header";
import CategoriesForProduct from "../components/CategoriesForProducts";
import Shop from "./Shop";

const Home = () => {
  const { user } = useContext(AuthContext);
  const { products } = useContext(ProductContext);
  console.log("User => ", user);
  console.log("Products => ", products);

  return (
    <div className="items-center ">
      <CategoriesForProduct/>
      <div className="text-center mi-auto">
        <h1 className="text-3xl">Our Products</h1>
        <br />
        <Shop />
        <button
          style={{ border: "1px solid #B88E2F", text: "#B88E2F" }}
          className="w-36 h-10 mt-2 text-xl"
        >
          <Link to={"/shop"}>Show More &#8594;</Link>
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Home;

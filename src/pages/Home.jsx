import React, { useContext } from "react";
import Footer from "../components/Footer";
import { AuthContext } from "../context/AuthContext";
import { ProductContext } from "../context/ProductsContext";
import ProductsComponent from "../components/ProductsComponent";

const Home = () => {
  const { user } = useContext(AuthContext);
  const {products} = useContext(ProductContext)
  console.log("User => ",user)
  console.log("Products => ", products)
  return (
    <div>

      <div className="text-center">
<h1 className="text-3xl">Our Products</h1>
      <ProductsComponent />
      </div>
      <Footer />


    </div>
  );
};

export default Home;

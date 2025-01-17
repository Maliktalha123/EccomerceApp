import React, { useContext, useState } from "react";
import { ProductContext } from "../context/ProductsContext";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import { Button } from "antd";
import { CartContext } from "../context/CartContext";
import { FavoriteContext } from "../context/FavoriteContext";
import { HeartOutlined } from "@ant-design/icons";

const ProductDetail = () => {
  const { id } = useParams();

  console.log("PArams Like ID =>  ", id);
  const { products } = useContext(ProductContext);
  const { addItemToCart, isItemAdded } = useContext(CartContext);
  const { addItemToFavorite } = useContext(FavoriteContext);

  const singleProduct = products.filter((data) => {
    return data.id == id;
  });
  console.log("This product =>", singleProduct[0]);
  return (
    <div className="container mx-auto">
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap gap-12">
            <img
              alt="ecommerce"
              className="lg:w-1/3 w-full lg:h-auto h-32 object-cover object-center rounded "
              src={singleProduct[0].url}
            />
            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                Category
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
                {singleProduct[0].title}
              </h1>
              <div className="flex mb-4">
                <a className="flex-grow text-indigo-500 border-b-2 border-indigo-500 py-2 text-lg px-1">
                  Description
                </a>
                <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">
                  Reviews
                </a>
                <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">
                  Details
                </a>
              </div>
              <p className="leading-relaxed mb-4">{singleProduct[0].desc}</p>
              <div className="flex border-t border-gray-200 py-2">
                <span className="text-gray-500">Color</span>
                <span className="ml-auto text-gray-900">Blue</span>
              </div>
              <div className="flex border-t border-gray-200 py-2">
                <span className="text-gray-500">Size</span>
                <span className="ml-auto text-gray-900">Medium</span>
              </div>
              <div className="flex border-t border-b mb-6 border-gray-200 py-2">
                <span className="text-gray-500">Quantity</span>
                <span className="ml-auto text-gray-900">4</span>
              </div>
              <div className="flex gap-32">
                <span className="title-font font-medium text-2xl text-gray-900">
                  ${singleProduct[0].price}
                </span>
                <div className="flex gap-4">
                  <Button
                    type="text"
                    icon={<HeartOutlined />}
                    className="mt-2"
                    onClick={() => addItemToFavorite(singleProduct[0])}
                  />

                  <Button
                    className="my-2"
                    onClick={() => addItemToCart(singleProduct[0])}
                  >
                    {isItemAdded(singleProduct[0].id)
                      ? `Added (${isItemAdded(singleProduct[0].id).quantity})`
                      : `Add to Cart`}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <hr />
      <Footer />
    </div>
  );
};

export default ProductDetail;

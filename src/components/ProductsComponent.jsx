import React, { useContext } from "react";
import { ProductContext } from "../context/ProductsContext";
import { Button, Card } from "antd";
import Meta from "antd/es/card/Meta";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const ProductsComponent = () => {
  const { products } = useContext(ProductContext);
  console.log(products);
  return (
    <div
      className="flex gap-4"
      style={{ flexWrap: "wrap", justifyContent: "center",textAlign:"start" }}
    >
     
      {products.map((data) => {
console.log(data)
return(       


        <Link to={`/product/${data.id}`}>
        <Card
          id={data.id}
          hoverable
          style={{
            width: 240,
            height: 340,
          }}
          cover={
            <img
              style={{
                height: 200,
              }}
              alt="example"
              src={data.url}
            />
          }
        >
          <Meta title={data.title} description={data.desc} />

          <div className="flex mt-4 gap-14 ">
            <p className="text-2xl">{`$${data.price}`}</p>
            <div className="flex gap-3">
              <HeartOutlined
                style={{
                  fontSize: "28px",
                }}
                onClick={() => console.log("Id =>", data.id)}
              />
              <ShoppingCartOutlined
                style={{
                  fontSize: "28px",
                }}
                onClick={() => console.log("Id =>", data.id)}
              />
            </div>
          </div>
        </Card>
        </Link>
     ) })}
    </div>
  );
};

export default ProductsComponent;

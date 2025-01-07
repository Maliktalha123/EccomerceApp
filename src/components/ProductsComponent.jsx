import React, { useContext } from "react";
import { ProductContext } from "../context/ProductsContext";
import { Button, Card } from "antd";
import Meta from "antd/es/card/Meta";
import {
  HeartFilled,
  HeartOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { FavoriteContext } from "../context/FavoriteContext";

const ProductsComponent = () => {
  const { products } = useContext(ProductContext);
  const { addItemToCart, isItemAdded, cartItems } = useContext(CartContext);
  const { favoriteItems, addItemToFavorite, isItemAddedInFavorites } =
    useContext(FavoriteContext);

  return (
    <div
      className="flex gap-4"
      style={{ flexWrap: "wrap", justifyContent: "center", textAlign: "start" }}
    >
      {products.map((data) => {
        let discription = data.desc;

        return (
          <Link to={`/product/${data.id}`} key={data.id}>
            {" "}
            <Card
              hoverable
              style={{
                maxWidth: 270,
                height: 400,
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
              <Meta
                title={data.title}
                description={`${discription.slice(0, 50)}...see more`}
                style={{
                  width: 245,
                }}
              />

              <div className="flex mt-4 gap-4 ">
                <p className="text-2xl">{`$${data.price}`}</p>
                <div className="flex gap-2">
                  <Button
                    type="text"
                    icon={<HeartOutlined />}
                    className="mt-2"
                    onClick={() => addItemToFavorite(data)}
                  />

                  <Button className="my-2" onClick={() => addItemToCart(data)}>
                    {isItemAdded(data.id)
                      ? `Added (${isItemAdded(data.id).quantity})`
                      : `Add to Cart`}
                  </Button>
                </div>
              </div>
            </Card>
          </Link>
        );
      })}
    </div>
  );
};

export default ProductsComponent;

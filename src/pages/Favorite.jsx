import React, { useContext } from "react";
import { FavoriteContext } from "../context/FavoriteContext";
import { Button, Card } from "antd";
import Meta from "antd/es/card/Meta";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";

const Favorite = () => {
  const { favoriteItems, removeItemFromFavorite } = useContext(FavoriteContext);
  console.log(favoriteItems);
  return (
    <div
      className="flex gap-4"
      style={{ flexWrap: "wrap", justifyContent: "center", textAlign: "start" }}
    >
      {favoriteItems.map((data) => (
        <Card
          key={data.id}
          hoverable
          style={{
            width: 270,
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

          <div className="flex mt-4 gap-4 ">
            <p className="text-2xl">{`$${data.price}`}</p>
            <div className="flex gap-2">
              <Button
                type="text"
                icon={<HeartFilled />}
                onClick={() => removeItemFromFavorite(data.id)}
              />

              <Button className="my-2" onClick={() => addItemToCart(data)}>
                Add to Cart
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Favorite;

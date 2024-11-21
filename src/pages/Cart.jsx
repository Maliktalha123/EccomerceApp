import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Button, Image } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeItemFromCart, addItemToCart, lessQuanityFromCart } =
    useContext(CartContext);
  console.log(cartItems);
  const totalAmount = cartItems.reduce(
    (total, obj) => total + obj.quantity * obj.price,
    0
  );
  const totalQuantity = cartItems.reduce(
    (total, obj) => total + obj.quantity,
    0
  );

  return (
    <div className="container mx-auto my-5">
      <h1 className="font-medium text-3xl underline">Cart Items</h1>

      <div className="flex gap-5 my-5">
        <div className="flex-grow flex flex-col border p-4 justify-center items-center">
          <h1>Total Quantity</h1>
          <h1 className="font-semibold font-mono mt-3 text-3xl">
            {totalQuantity}
          </h1>
        </div>
        <div className="flex-grow flex flex-col border p-4 justify-center items-center">
          <h1>Total Amount</h1>
          <h1 className="font-semibold font-mono mt-3 text-3xl">
            ${Math.round(totalAmount)}
          </h1>
        </div>
        <Link to={'/checkout'}><div className="flex-grow flex flex-col border p-4 justify-center items-center">
          <h1>Checkout</h1>
        </div></Link>
      </div>

      {cartItems.map((data) => {
        let discription = data.desc;

        return (
          <div key={data.id} className="flex items-center border my-2 p-3">
            <Image
              src={data.url}
              alt="Pitchure of Product"
              height={200}
              width={250}
            />

            <div className="flex flex-col pl-5">
              <h1 className="font-medium text-xl mb-2">{data.title}</h1>
              <h1 className="font-normal text-gray-500 mb-2">{`${discription.slice(
                0,
                60
              )}...see more`}</h1>
              <h1 className="font-normal text-lg mb-2">Price : {data.price}</h1>
              <div className="flex gap-3 items-center">
                <Button
                  onClick={() => addItemToCart(data)}
                  icon={<PlusOutlined />}
                ></Button>

                <h1 className="text-xl">{data.quantity}</h1>
                <Button
                  danger
                  icon={<MinusOutlined />}
                  onClick={() => lessQuanityFromCart(data.id)}
                  disabled={data.quantity === 1}
                ></Button>
              </div>
              <Button
                onClick={() => removeItemFromCart(data.id)}
                danger
                className="w-40 my-4"
              >
                Remove item{" "}
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Cart;

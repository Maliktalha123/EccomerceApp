import React, { useContext } from "react";
import CheckOutForm from "../components/CheckOutForm";
import { CartContext } from "../context/CartContext";
import { Button } from "antd";

const CheckOut = () => {
  const { cartItems } = useContext(CartContext);
  console.log("Cart Items = > ", cartItems);
  return (
    <div className="flex w-2/3 mx-auto justify-between" >
      <div>
        <CheckOutForm />
      </div>
      <div className="w-1/3">
        <div className="flex justify-between text-2xl ">
          <h2>Product</h2>
          <h2>Subtotal</h2>
        </div>
        {cartItems.map((data) => (
          <div className="flex justify-between mt-2" key={data.id}>
            <p>
              <span className="text-gray-500">{data.title}</span> X
              <span className="text-xl"> {data.quantity}</span>
            </p>
            <p>{data.price * data.quantity}</p>
          </div>
        ))}
        <div className="flex justify-between mt-3">
          <p className="pt-2">Total</p>
          <p
            className="text-2xl "
            style={{
              color: "#B88E2F",
            }}
          >
            Rs,24444
          </p>
        </div>
        <hr className="mt-4" />
        <div  className="flex gap-4 flex-col">
          <p className="text-xl">Direct Bank Transfer</p>
          <p>
            Make your payment directly into our bank account. Please use your
            Order ID as the payment reference. Your order will not be shipped
            until the funds have cleared in our account.
          </p>
          <div className="flex flex-col gap-3">
         <div> <input type="radio" value="bank-transfer" /> Direct Bank Transfer</div>
          <div><input type="radio" value="cash-on-delievery" /> Cash on Delievery</div>
          </div>
          <p>Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our privacy policy.  </p>
          <Button className="w-2/3 m-auto">Place Order</Button>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;

import React, { useContext } from "react";
import CheckOutForm, { CheckOutValues } from "../components/CheckOutForm";
import { CartContext } from "../context/CartContext";
import { Button, message, Upload } from "antd";
import { addDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const CheckOut = () => {
  const { cartItems } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  // console.log("CheckOut form => ", CheckOutValues);
  const Navigate = useNavigate();
  const uploadSale = () => {
    if (!CheckOutValues) message.error("Please Submit Your Information first!");
    if (CheckOutValues) {
      console.log("Upload Started.....");
console.log("User UID => ", user)
      const docRef = doc(db, "sales", user.uid);
      console.log("Checkout => ",CheckOutValues)
      console.log("Cart Items => ",cartItems)
      const saleData = {
        userInfo: CheckOutValues, // Rename as needed
        totalPrice,
        soldItems: cartItems,
        timestamp: new Date(), // Optional: Add a timestamp for sorting
      };


 
      addDoc(docRef, saleData);
      console.log("Upload Completed");
      Navigate("/");
    }
  };
  // console.log("User =>", user.uid);

  let totalPrice = 45000;

  return (
    <div className="flex w-2/3 mx-auto justify-between">
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
        <div className="flex gap-4 flex-col">
          <p className="text-xl">Direct Bank Transfer</p>
          <p>
            Make your payment directly into our bank account. Please use your
            Order ID as the payment reference. Your order will not be shipped
            until the funds have cleared in our account.
          </p>
          <div className="flex flex-col gap-3">
            <div>
              {" "}
              <input type="radio" value="bank-transfer" /> Direct Bank Transfer
            </div>
            <div>
              <input type="radio" value="cash-on-delievery" /> Cash on Delievery
            </div>
          </div>
          <p>
            Your personal data will be used to support your experience
            throughout this website, to manage access to your account, and for
            other purposes described in our privacy policy.{" "}
          </p>
          <Button className="w-2/3 m-auto" onClick={uploadSale}>
            Place Order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;

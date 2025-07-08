import { message } from "antd";

import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

function CartContextProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const itemsFromStorage = localStorage.getItem("cartItems");
    if (itemsFromStorage) {
      setCartItems(JSON.parse(itemsFromStorage));
    }
    setIsLoaded(true);
  }, []);
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  function addItemToCart(item) {
    const arr = cartItems;
    const itemIndex = cartItems.findIndex((data) => data.id == item.id);

    if (itemIndex === -1) {
      arr.push({ ...item, quantity: 1 });
      message.success("Item added to cart.");
    } else {
      arr[itemIndex].quantity++;
    }

    setCartItems([...arr]);
  }
  function lessQuanityFromCart(id) {
    const arr = cartItems;
    const itemIndex = cartItems.findIndex((data) => data.id == id);
    arr[itemIndex].quantity--;
    setCartItems([...arr]);
  }

  function removeItemFromCart(id) {
    const arr = cartItems;
    const itemIndex = cartItems.findIndex((data) => data.id == id);
    arr.splice(itemIndex, 1);
    setCartItems([...arr]);
    message.success("Item removed from cart.");
  }

  function isItemAdded(id) {
    const arr = cartItems;
    const itemIndex = cartItems.findIndex((data) => data.id == id);
    if (itemIndex == -1) {
      return null;
    } else {
      return arr[itemIndex];
    }
  }

  function clearCart() {
    setCartItems([]);
    localStorage.removeItem("cartItems");
    message.success("Cart cleared successfully!");
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        clearCart,
        addItemToCart,
        lessQuanityFromCart,
        removeItemFromCart,
        isItemAdded,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContextProvider;

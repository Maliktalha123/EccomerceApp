import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import AuthContextProvider from "./context/AuthContext.jsx";
import ProductContextProvider from "./context/ProductsContext.jsx";
import CartContextProvider from "./context/CartContext.jsx";
import FavoriteContextProvider from "./context/FavoriteContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
      <CartContextProvider>
        <FavoriteContextProvider>

    <ProductContextProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
    </ProductContextProvider>
        </FavoriteContextProvider>
      </CartContextProvider>
  </StrictMode>
);

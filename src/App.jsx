import "./App.css";

import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Shop from "./pages/Shop";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Favorite from "./pages/Favorite";
import Signin from "./pages/Auth/Signin";
import Signup from "./pages/Auth/Signup";
import Header from "./components/Header";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Users from "./pages/Admin/Users";
import Products from "./pages/Admin/Product";
import Soldout from "./pages/Admin/Soldout";
import ProductDetail from "./pages/ProductDetail";

function App() {
  const { user } = useContext(AuthContext);

  const getInitialRoute = () => {
    if (user?.isLogin && user?.email === "talha@gmail.com") {
      return <Navigate to="/admin/products" />;
    } else if (user?.isLogin) {
      return <Navigate to="/" />;
    } else {
      return <Signin />;
    }
  };

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
        <Route path="/" element={<Home />} /> 
          <Route path="/" element={getInitialRoute()} />
          /* Only for admin */
          <Route
            path="/admin"
            element={
              user?.isLogin && user?.email === "talha@gmail.com" ? (
                <Products />
              ) : (
                <Navigate to="/" />
              )
            }
          >
            <Route path="users" element={<Users />} />
            <Route path="products" element={<Products />} />
            <Route path="purchases" element={<Soldout />} />
            {/* <Route path="reports" element={<Rep />} /> */}
          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/shop" element={<Shop />} />
          <Route path = "/product/:id" element = {<ProductDetail />}/>
          
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/favorite" element={<Favorite />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

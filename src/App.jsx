import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Header from "./components/Header";
import Signin from "./pages/Auth/Signin";
import Signup from "./pages/Auth/Signup";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Favorite from "./pages/Favorite";
import CheckOut from "./pages/CheckOut";
import MyOrders from "./pages/MyOrders";

// Admin Pages
import Users from "./pages/Admin/Users";
import Products from "./pages/Admin/Product";
import Soldout from "./pages/Admin/Soldout";
import ContactRequest from "./pages/Admin/ContactRequest";
import AddCategoryPage from "./pages/Admin/Categories";

function App() {
  const { user } = useContext(AuthContext);

  // Admin email
  const adminEmail = "talha@gmail.com";

  const getInitialRoute = () => {
    if (user?.isLogin && user?.email === adminEmail) {
      return <Navigate to="/admin/products" />;
    } else if (user?.isLogin) {
      return <Navigate to="/home" />;
    } else {
      return <Signin />;
    }
  };

  const ProtectedRoute = ({ children, condition }) => {
    return condition ? children : <Navigate to="/" />;
  };

  const AdminLayout = () => {
    return (
      <div>
        
        <Outlet />
      </div>
    );
  };

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={getInitialRoute()} />
        <Route path="/home" element={<Home />} />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute condition={user?.isLogin && user?.email === adminEmail}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="categories" element={<AddCategoryPage/>}/>
          <Route path="users" element={<Users />} />
          <Route path="products" element={<Products />} />
          <Route path="purchases" element={<Soldout />} />
          <Route path="contactrequests" element={<ContactRequest />} />
        </Route>

        {/* User Routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/myorders" element={<MyOrders />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

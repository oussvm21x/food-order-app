import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserOrdersPage from "./Pages/UserOrdersPage";
import Home from "./Pages/Home/Home";
import { useSelector } from "react-redux";
import NavBar from "./Components/NavBar/NavBar";
import Footer from "./Components/Footer/Footer";
import Cart from "./Pages/Cart/Cart";
import Order from "./Pages/Order/Order";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./Pages/Profile/Profile";

function App() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  console.log("Cart Items:", cartItems);
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<Order />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<UserOrdersPage />} />
      </Routes>
      <Footer />
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </BrowserRouter>
  );
}

export default App;

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import { useSelector } from "react-redux";
import NavBar from "./Components/NavBar/NavBar";
import Footer from "./Components/Footer/Footer";
import Cart from "./Pages/Cart/Cart";
import Order from "./Pages/Order/Order";

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
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

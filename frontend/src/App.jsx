import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import { food_list } from "./frontend_assets/assets";
import { useSelector } from "react-redux";
import NavBar from "./Components/NavBar/NavBar";
import Footer from "./Components/Footer/Footer";
import Cart from "./Pages/Cart/Cart";

function App() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  console.log("Cart Items:", cartItems);
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

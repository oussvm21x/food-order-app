import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import { food_list } from "./frontend_assets/assets";
import { useSelector } from "react-redux";

function App() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  console.log("Cart Items:", cartItems);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

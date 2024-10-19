import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../reducers/slicers/cartSlice"; // Assuming you have an action to remove items
import CartTotale from "../../Components/CartTotal/CartTotale";
import CartItems from "../../Components/CartItems/CartItems";
import PromoCode from "../../Components/PromoCode/Promo";

const Cart = () => {
  // Accessing the cart items from Redux store

  return (
    <div className="mar">
      <CartTotale />
      <div className="px-2 flex justify-between gap-10">
        <CartItems />
        <div className="w-2/5">
          <PromoCode />
        </div>
      </div>
    </div>
  );
};

export default Cart;

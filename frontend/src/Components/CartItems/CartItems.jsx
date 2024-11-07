import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../reducers/slicers/cartSlice"; // Assuming you have an action to remove items
import { Link } from "react-router-dom";

const CartItems = () => {
  const cart = useSelector((state) => state.cart);
  const subtotal = useSelector((state) => state.cart.subtotal);
  const delivery = useSelector((state) => state.cart.delivery);
  console.log("Delivery:", delivery);
  const total = useSelector((state) => state.cart.total);
  // console.log("total :" + total);
  console.log("cart : ", cart);
  return (
    <div className="w-3/5">
      <h2 className="font-semibold text-2xl">Cart Total</h2>

      <div className="flex justify-between py-3">
        <p>Subtotal</p>
        <p>{subtotal}</p>
      </div>
      <hr></hr>
      <div className="flex justify-between py-3">
        <p>Delivery fees</p>
        <p>{delivery}</p>
      </div>
      <hr></hr>
      <div className="flex justify-between py-3">
        <p>Total</p>
        <p>{total}</p>
      </div>

      <Link to="/order">
        <button className="rounded-md bg-orange-500 py-2 px-3 text-white font-semibold my-2">
          Proceed Checkout
        </button>
      </Link>
    </div>
  );
};

export default CartItems;

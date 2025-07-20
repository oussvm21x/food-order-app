import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CartItems = () => {
  const cart = useSelector((state) => state.cart);
  const subtotal = cart.subtotal;
  const delivery = cart.delivery;
  const total = cart.total;

  return (
    <div className="w-3/5">
      <h2 className="font-semibold text-2xl">Cart Total</h2>

      <div className="flex justify-between py-3">
        <p>Subtotal</p>
        <p>${subtotal.toFixed(2)}</p>
      </div>
      <hr />
      <div className="flex justify-between py-3">
        <p>Delivery fees</p>
        <p>${delivery.toFixed(2)}</p>
      </div>
      <hr />
      <div className="flex justify-between py-3">
        <p>Total</p>
        <p>${total.toFixed(2)}</p>
      </div>

      <Link to="/order">
        <button
          className="rounded-md bg-orange-500 py-2 px-3 text-white font-semibold my-2 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={cart.cartItems.length === 0}
        >
          Proceed Checkout
        </button>
      </Link>
    </div>
  );
};

export default CartItems;

import React from "react";
import { useSelector } from "react-redux";

const CartItems = ({ onPlaceOrder, isPlacingOrder = false }) => {
  const cart = useSelector((state) => state.cart);
  const subtotal = cart.subtotal;
  const delivery = cart.delivery;
  const total = cart.total;

  const handlePlaceOrder = () => {
    console.log("🎯 CartItems: Place Order clicked!");
    console.log("🎯 onPlaceOrder function exists:", !!onPlaceOrder);
    if (onPlaceOrder) {
      onPlaceOrder();
    } else {
      console.log("❌ onPlaceOrder function not provided!");
    }
  };

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
      <div className="flex justify-between py-3 font-semibold text-lg">
        <p>Total</p>
        <p>${total.toFixed(2)}</p>
      </div>

      <button
        onClick={handlePlaceOrder}
        className="w-full rounded-md bg-orange-500 py-3 px-4 text-white font-semibold my-4 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        disabled={cart.cartItems.length === 0 || isPlacingOrder}
      >
        {isPlacingOrder ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Processing...
          </div>
        ) : (
          `Place Order  $${total.toFixed(2)}`
        )}
      </button>
    </div>
  );
};

export default CartItems;

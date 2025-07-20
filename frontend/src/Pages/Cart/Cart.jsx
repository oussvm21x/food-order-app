import React from "react";
import CartTotale from "../../Components/CartTotal/CartTotale";
import CartItems from "../../Components/CartItems/CartItems";
import PromoCode from "../../Components/PromoCode/Promo";
import useCart from "../../hooks/useCart";

const Cart = () => {
  const { cartError, isAuthenticated, isOnline, syncInProgress } = useCart();

  if (cartError) {
    return (
      <div className="mar">
        <div className="text-center py-10">
          <h2 className="text-xl font-semibold text-red-600 mb-4">
            Cart Error
          </h2>
          <p className="text-gray-600">{cartError}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mar">
      {/* Status indicators */}
      {isAuthenticated && !isOnline && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong>Offline:</strong> Cart functionality is disabled. Please check
          your internet connection.
        </div>
      )}

      {syncInProgress && (
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-4">
          <strong>Syncing:</strong> Your cart is being synchronized with the
          server...
        </div>
      )}

      {!isAuthenticated && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
          <strong>Guest Mode:</strong> Your cart is stored locally. Log in to
          sync across devices.
        </div>
      )}

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

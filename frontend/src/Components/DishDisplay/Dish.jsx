import React from "react";
import { assets } from "../../frontend_assets/assets";
import useCart from "../../hooks/useCart";

const Dish = ({ name, image, price, description, category, id }) => {
  const {
    addToCart,
    removeFromCart,
    getItemQuantity,
    canUseCart,
    isOnline,
    isAuthenticated,
    syncInProgress,
  } = useCart();

  const itemQuantity = getItemQuantity(id);

  const handleAddToCart = () => {
    if (!canUseCart) {
      if (isAuthenticated && !isOnline) {
        alert(
          "Cannot add to cart while offline. Please check your internet connection."
        );
      }
      return;
    }

    const foodData = {
      name,
      price,
      image,
      description,
      category,
    };

    addToCart(id, foodData, 1);
  };

  const handleDeleteFromCart = () => {
    if (!canUseCart) {
      if (isAuthenticated && !isOnline) {
        alert(
          "Cannot remove from cart while offline. Please check your internet connection."
        );
      }
      return;
    }

    removeFromCart(id);
  };

  const AddButtons = ({ handleAddToCart }) => {
    return (
      <div
        className={`rounded-full bg-slate-100 flex justify-between gap-3 p-1 text-center items-center w-28 ${
          !canUseCart ? "opacity-50" : ""
        }`}
      >
        <button
          onClick={handleAddToCart}
          className="w-8 h-8 rounded-full"
          disabled={!canUseCart}
        >
          <img src={assets.add_icon_green} alt="Add" />
        </button>
        <p className="text-lg font-semibold">{itemQuantity}</p>
        <button
          onClick={handleDeleteFromCart}
          className="w-8 h-8 rounded-full"
          disabled={!canUseCart}
        >
          <img src={assets.remove_icon_red} alt="Remove" />
        </button>
      </div>
    );
  };

  return (
    <div className="border rounded-lg shadow-lg overflow-hidden md:w-56 lg:w-64 bg-white flex flex-col w-full relative">
      {/* Status indicators */}
      {isAuthenticated && !isOnline && (
        <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs z-10">
          Offline
        </div>
      )}

      {syncInProgress && (
        <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded text-xs z-10">
          Syncing...
        </div>
      )}

      <img
        src={`http://localhost:5000/${image.replace("\\", "/")}`} // Replace backslashes with forward slashes
        alt={name}
        className="w-full h-40 object-cover"
      />
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
        <div className="my-2 w-24 h-6">
          <img
            src={assets.rating_starts}
            className="w-full h-full object-contain"
            alt="rating stars"
          />
        </div>
        <p className="text-sm text-gray-500">{category}</p>
        <p className="mt-2 text-gray-700 flex-grow h-20 overflow-hidden hidden md:block">
          {description}
        </p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-xl font-semibold text-red-600">${price}</span>
          <AddButtons handleAddToCart={handleAddToCart} />
        </div>

        {/* Cart status indicator */}
        {!canUseCart && isAuthenticated && !isOnline && (
          <div className="mt-2 text-xs text-red-500 text-center">
            Cart disabled - offline
          </div>
        )}
      </div>
    </div>
  );
};

export default Dish;

import React from "react";
import { addToCart, removeFromCart } from "../../reducers/slicers/cartSlice"; // Import addToCart action
import { assets } from "../../frontend_assets/assets";
import { useDispatch } from "react-redux"; // Import useDispatch hook
import { useSelector } from "react-redux"; // Import useSelector hook

const Dish = ({ name, image, price, description, category, id }) => {
  const dispatch = useDispatch(); // Get dispatch function from useDispatch hook
  const cartItems = useSelector((state) => state.cart.cartItems);

  // Find the current quantity of this dish in the cart
  const itemInCart = cartItems.find((item) => item.id === id);
  const itemQuantity = itemInCart ? itemInCart.quantity : 0;
  const handleAddToCart = () => {
    const dish = {
      id,
      name,
      image,
      price,
      category,
    };

    dispatch(addToCart(dish)); // Dispatch addToCart action with the dish
  };
  const handleDeleteFromCart = () => {
    const dish = {
      id,
      image,
      image,
      price,
      category,
    };

    dispatch(removeFromCart(dish)); // Dispatch addToCart action with the dish
  };
  const AddButtons = ({ handleAddToCart }) => {
    return (
      <div className="rounded-full bg-slate-100 flex justify-between gap-3 p-1 text-center items-center w-28">
        <button onClick={handleAddToCart} className="w-8 h-8 rounded-full">
          <img src={assets.add_icon_green}></img>
        </button>
        <p className="text-lg font-semibold">{itemQuantity}</p>
        <button onClick={handleDeleteFromCart} className="w-8 h-8 rounded-full">
          <img src={assets.remove_icon_red}></img>
        </button>
      </div>
    );
  };

  return (
    <div className="border rounded-lg shadow-lg overflow-hidden md:w-56 lg:w-64 bg-white flex flex-col w-full ">
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
      </div>
    </div>
  );
};

export default Dish;

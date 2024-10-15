import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../reducers/slicers/cartSlice"; // Import addToCart action
import { assets } from "../../frontend_assets/assets";

const dispatch = useDispatch(); // Initialize Redux dispatch

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
const AddButtons = ({ handleAddToCart }) => {
  return (
    <div className="rounded-full bg-slate-100 flex justify-between gap-3 p-1">
      <button
        onClick={handleAddToCart}
        className="bg-green-500 text-white w-8 h-8 rounded-full"
      >
        +
      </button>
      <p>1</p>
      <button
        onClick={handleAddToCart}
        className="bg-red-500 text-white w-8 h-8 rounded-full"
      >
        -
      </button>
    </div>
  );
};
const Dish = ({ name, image, price, description, category, id }) => {
  return (
    <div className="border rounded-lg shadow-lg overflow-hidden w-64 bg-white flex flex-col">
      <img src={image} alt={name} className="w-full h-40 object-cover" />
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
        <p className="mt-2 text-gray-700 flex-grow h-20 overflow-hidden">
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

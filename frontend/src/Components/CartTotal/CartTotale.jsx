import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../reducers/slicers/cartSlice"; // Assuming you have an action to remove items
const CartTotale = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  return (
    <div className="overflow-x-auto px-2 my-10">
      <table className="min-w-full bg-white border">
        <thead>
          <tr className="text-left border-b">
            <th className="px-4 py-2">Items</th>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Quantity</th>
            <th className="px-4 py-2">Total</th>
            <th className="px-4 py-2">Remove</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <tr key={item.foodId} className="border-b">
                <td className="px-4 py-2">
                  <img
                    src={`http://localhost:5000/${item.foodId?.imageUrl?.replace(
                      "\\",
                      "/"
                    )}`}
                    alt={item.foodId?.name || "Food item"}
                    className="w-12 h-12 object-cover"
                  />
                </td>
                <td className="px-4 py-2">{item.foodId?.name || "Unknown"}</td>
                <td className="px-4 py-2">${item.foodId?.price || 0}</td>
                <td className="px-4 py-2">{item.quantity}</td>
                <td className="px-4 py-2">
                  ${(item.foodId?.price || 0) * item.quantity}
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => dispatch(removeFromCart(item.foodId))}
                    className="text-red-600 font-bold"
                  >
                    x
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="px-4 py-4 text-center">
                No items in the cart.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CartTotale;

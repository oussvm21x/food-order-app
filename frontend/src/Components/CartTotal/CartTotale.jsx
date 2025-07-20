import React from "react";
import useCart from "../../hooks/useCart";

const CartTotale = () => {
  const { cartItems, removeFromCart, canUseCart } = useCart();

  const handleRemoveItem = (foodId) => {
    if (canUseCart) {
      removeFromCart(foodId);
    }
  };

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
            cartItems.map((item) => {
              // Handle both guest cart structure and backend cart structure
              const foodData = item.foodId || item;
              const itemId = foodData._id || foodData.foodId || item.foodId;
              const itemName = foodData.name || item.name;
              const itemPrice = foodData.price || item.price;
              const itemImage =
                foodData.imageUrl || foodData.image || item.image;
              const itemQuantity = item.quantity;

              return (
                <tr key={itemId} className="border-b">
                  <td className="px-4 py-2">
                    <img
                      src={`http://localhost:5000/${itemImage?.replace(
                        "\\",
                        "/"
                      )}`}
                      alt={itemName}
                      className="w-12 h-12 object-cover"
                    />
                  </td>
                  <td className="px-4 py-2">{itemName}</td>
                  <td className="px-4 py-2">${itemPrice}</td>
                  <td className="px-4 py-2">{itemQuantity}</td>
                  <td className="px-4 py-2">
                    ${(itemPrice * itemQuantity).toFixed(2)}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleRemoveItem(itemId)}
                      className={`font-bold ${
                        canUseCart
                          ? "text-red-600 hover:text-red-800"
                          : "text-gray-400 cursor-not-allowed"
                      }`}
                      disabled={!canUseCart}
                    >
                      x
                    </button>
                  </td>
                </tr>
              );
            })
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

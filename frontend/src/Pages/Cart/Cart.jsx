import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../reducers/slicers/cartSlice"; // Assuming you have an action to remove items

const Cart = () => {
  // Accessing the cart items from Redux store
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const delivery = 10; // Assuming a fixed delivery fee
  const total = subtotal + delivery;

  return (
    <div className="mar">
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
                <tr key={item.id} className="border-b">
                  <td className="px-4 py-2">
                    <img
                      src={item.image} // Assuming you have image URLs in your items
                      alt={item.title}
                      className="w-12 h-12 object-cover"
                    />
                  </td>
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">${item.price}</td>
                  <td className="px-4 py-2">{item.quantity}</td>
                  <td className="px-4 py-2">${item.price * item.quantity}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => dispatch(removeFromCart(item))}
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
      <div className="px-2 flex justify-between gap-10">
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

          <button className="rounded-md bg-orange-500 py-2 px-3 text-white font-semibold my-2">
            Proceed Checkout
          </button>
        </div>
        <div className="w-2/5">
          <form className="my-4">
            <label
              htmlFor="discountCode"
              className="block text-sm font-normal text-gray-700 mb-2"
            >
              If you have any discoun code please enter it here
            </label>
            <div className="mt-1 flex rounded-lg shadow-sm ">
              <input
                type="text"
                name="discountCode"
                id="discountCode"
                className="flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300 p-2"
                placeholder="Enter discount code"
              />
              <button
                type="submit"
                className="ml-2 px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-orange-500 hover:bg-orange-600"
              >
                Apply
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Cart;

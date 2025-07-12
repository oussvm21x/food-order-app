import React from "react";
import { useSelector, useDispatch } from "react-redux";
import CartTotale from "../../Components/CartTotal/CartTotale";
import CartItems from "../../Components/CartItems/CartItems";
import PromoCode from "../../Components/PromoCode/Promo";
import { fetchCart } from "../../reducers/slicers/cartSlice";
import { useEffect } from "react";

const Cart = () => {
  // Accessing the cart items from Redux store
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const { loading, error } = useSelector((state) => state.cart);

  if (loading) return <div>Loading cart...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div className="mar">
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

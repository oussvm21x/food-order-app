import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { applyPromoCode } from "../../reducers/slicers/cartSlice"; // Assuming you have this action
import { useSelector } from "react-redux";

const PromoCode = () => {
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.total);
  const handleApplyPromo = (e) => {
    e.preventDefault();
    // Assuming the valid promo code is 'SAVE10' which gives a 10% discount
    if (promoCode === "SAVE10") {
      dispatch(applyPromoCode(0.1)); // 10% discount
      console.log("Promo code applied ? NEW Price : ", cartItems);
      setPromoApplied(true);
    } else {
      alert("Invalid promo code");
    }
  };

  return (
    <form className="my-4" onSubmit={handleApplyPromo}>
      <label
        htmlFor="discountCode"
        className="block text-sm font-normal text-gray-700 mb-2"
      >
        If you have any discount code, please enter it here
      </label>
      <div className="mt-1 flex rounded-lg shadow-sm ">
        <input
          type="text"
          name="discountCode"
          id="discountCode"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          className="flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300 p-2"
          placeholder="Enter discount code"
        />
        <button
          type="submit"
          className="ml-2 px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-orange-500 hover:bg-orange-600"
          disabled={promoApplied}
        >
          {promoApplied ? "Promo Applied" : "Apply"}
        </button>
      </div>
    </form>
  );
};

export default PromoCode;

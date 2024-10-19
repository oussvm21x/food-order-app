import React from "react";
import DeiliveryInfos from "../../Components/DeilevryInfos/DeiliveryInfos";
import CartItems from "../../Components/CartItems/CartItems";

const Order = () => {
  return (
    <div className="mar flex justify-between gap-28 py-6">
      <DeiliveryInfos />
      <CartItems />
    </div>
  );
};

export default Order;

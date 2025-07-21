import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const OrderCancel = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");

  return (
    <div className="mar flex justify-center items-center py-20">
      <div className="text-center">
        <div className="mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 text-yellow-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.502 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Order Cancelled
        </h2>
        <p className="text-gray-600 mb-6">
          Your payment was cancelled. Don't worry, no charges were made to your
          account.
        </p>

        {orderId && (
          <p className="text-sm text-gray-500 mb-6">
            Order ID: {orderId} (Payment not completed)
          </p>
        )}

        <div className="space-x-4">
          <button
            onClick={() => navigate("/cart")}
            className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600"
          >
            Return to Cart
          </button>
          <button
            onClick={() => navigate("/")}
            className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderCancel;

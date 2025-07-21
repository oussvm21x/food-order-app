import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { orderService } from "../../services/orderService";
import { clearCartLocal } from "../../reducers/slicers/cartSlice";

const OrderSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isVerifying, setIsVerifying] = useState(true);
  const [verificationError, setVerificationError] = useState("");
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const sessionId = searchParams.get("session_id");
        const orderId =
          searchParams.get("orderId") || localStorage.getItem("pendingOrderId");

        if (!sessionId || !orderId) {
          setVerificationError("Missing payment information");
          setIsVerifying(false);
          return;
        }

        // Verify payment with backend
        const response = await orderService.verifyPayment(sessionId, orderId);

        if (response.success) {
          setOrderDetails(response.order);
          // Clear cart after successful payment
          dispatch(clearCartLocal());
          // Clear pending order ID
          localStorage.removeItem("pendingOrderId");
        } else {
          setVerificationError(
            response.message || "Payment verification failed"
          );
        }
      } catch (error) {
        console.error("Payment verification error:", error);
        setVerificationError(error.message || "Failed to verify payment");
      } finally {
        setIsVerifying(false);
      }
    };

    verifyPayment();
  }, [searchParams, dispatch]);

  if (isVerifying) {
    return (
      <div className="mar flex justify-center items-center py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700">
            Verifying your payment...
          </h2>
          <p className="text-gray-500 mt-2">
            Please wait while we confirm your order.
          </p>
        </div>
      </div>
    );
  }

  if (verificationError) {
    return (
      <div className="mar flex justify-center items-center py-20">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Payment Verification Failed
          </h2>
          <p className="text-gray-600 mb-6">{verificationError}</p>
          <div className="space-x-4">
            <button
              onClick={() => navigate("/cart")}
              className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600"
            >
              Back to Cart
            </button>
            <button
              onClick={() => navigate("/contact")}
              className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600"
            >
              Contact Support
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mar flex justify-center items-center py-20">
      <div className="text-center max-w-lg">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Order Placed Successfully!
        </h2>
        <p className="text-gray-600 mb-6">
          Thank you for your order. You will receive a confirmation email
          shortly.
        </p>

        {orderDetails && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold text-lg mb-2">Order Details</h3>
            <p>
              <span className="font-medium">Order ID:</span> {orderDetails._id}
            </p>
            <p>
              <span className="font-medium">Total Amount:</span> $
              {orderDetails.amount.toFixed(2)}
            </p>
            <p>
              <span className="font-medium">Status:</span> {orderDetails.status}
            </p>
            <p>
              <span className="font-medium">Delivery Address:</span>{" "}
              {orderDetails.address.street}, {orderDetails.address.city},{" "}
              {orderDetails.address.state} {orderDetails.address.zipCode}
            </p>
          </div>
        )}

        <div className="space-x-4">
          <button
            onClick={() => navigate("/")}
            className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600"
          >
            Continue Shopping
          </button>
          <button
            onClick={() => navigate("/orders")}
            className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600"
          >
            View Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;

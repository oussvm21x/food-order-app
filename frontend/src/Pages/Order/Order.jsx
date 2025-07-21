import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import DeiliveryInfos from "../../Components/DeilevryInfos/DeiliveryInfos";
import CartItems from "../../Components/CartItems/CartItems";
import { orderService } from "../../services/orderService";
import { clearCartLocal } from "../../reducers/slicers/cartSlice";

const Order = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderError, setOrderError] = useState("");

  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleFormChange = (newFormData) => {
    setFormData(newFormData);
    // Clear any previous errors
    if (orderError) setOrderError("");
  };

  const validateForm = () => {
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "street",
      "city",
      "state",
      "zipCode",
      "country",
      "phone",
    ];

    for (let field of requiredFields) {
      if (!formData[field]?.trim()) {
        setOrderError(`Please fill in all required fields`);
        return false;
      }
    }

    // Email validation
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(formData.email)) {
      setOrderError("Please enter a valid email address");
      return false;
    }

    return true;
  };

  const handlePlaceOrder = async () => {
    console.log("🔥 Place Order button clicked!");
    console.log("📋 Form data:", formData);
    console.log("🛒 Cart:", cart);
    console.log("👤 User:", user);

    try {
      // Validate form
      if (!validateForm()) {
        console.log("❌ Form validation failed");
        return;
      }

      // Check if cart is not empty
      if (!cart.cartItems || cart.cartItems.length === 0) {
        console.log("❌ Cart is empty");
        setOrderError("Your cart is empty");
        return;
      }

      // Check if user is authenticated
      console.log("🔍 User authentication check:");
      console.log("- user object:", user);
      console.log("- user.isAuthenticated:", user.isAuthenticated);
      console.log("- user.user:", user.user);
      console.log("- user.user?._id:", user.user?._id);
      console.log("- user.token:", user.token);

      // More comprehensive authentication check
      const isUserAuthenticated =
        user.isAuthenticated &&
        user.user &&
        (user.user._id || user.user.id) &&
        user.token;

      console.log("- isUserAuthenticated:", isUserAuthenticated);

      if (!isUserAuthenticated) {
        console.log("❌ User not authenticated - Details:");
        console.log("  - isAuthenticated:", user.isAuthenticated);
        console.log("  - user exists:", !!user.user);
        console.log("  - user ID exists:", !!(user.user?._id || user.user?.id));
        console.log("  - token exists:", !!user.token);
        setOrderError("Please login to place an order");
        return;
      }
      console.log("✅ All validations passed, proceeding with order...");
      setIsPlacingOrder(true);
      setOrderError("");

      // Prepare order data
      const userId = user.user._id || user.user.id;
      const orderData = {
        userId: userId,
        items: cart.cartItems.map((item) => ({
          foodId: item.foodId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        amount: cart.total,
        address: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country,
          phone: formData.phone,
        },
      };

      // Call order service to place order with Stripe payment
      const response = await orderService.placeOrder(orderData);

      if (response.success && response.sessionUrl) {
        // Store order ID for verification after payment
        localStorage.setItem("pendingOrderId", response.orderId);

        // Redirect to Stripe checkout
        window.location.href = response.sessionUrl;
      } else {
        throw new Error(response.message || "Failed to create payment session");
      }
    } catch (error) {
      console.error("Order placement error:", error);
      setOrderError(
        error.message || "Failed to place order. Please try again."
      );
      setIsPlacingOrder(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="mar flex justify-center items-center py-20">
        <div className="text-center">
          <div className="mb-4">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
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
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Order Placed Successfully!
          </h2>
          <p className="text-gray-600 mb-6">
            Thank you for your order. You will receive a confirmation email
            shortly.
          </p>
          <button
            onClick={() => (window.location.href = "/")}
            className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mar py-6">
      {orderError && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
          {orderError}
        </div>
      )}

      <div className="flex justify-between gap-28">
        <DeiliveryInfos formData={formData} onFormChange={handleFormChange} />
        <CartItems
          onPlaceOrder={handlePlaceOrder}
          isPlacingOrder={isPlacingOrder}
        />
        {console.log(
          "🔍 Order component: handlePlaceOrder function:",
          typeof handlePlaceOrder
        )}
        {console.log("🔍 Order component: isPlacingOrder:", isPlacingOrder)}
      </div>
    </div>
  );
};

export default Order;

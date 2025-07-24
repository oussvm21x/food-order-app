import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrders, setExpandedOrders] = useState({});
  const [userCache, setUserCache] = useState({});

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/order/all", {
        method: "GET",
        credentials: "include", // Important for sending cookies
      });

      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }

      const data = await response.json();
      const orders = data.orders;

      // Process orders to add user info if missing
      const ordersWithUserInfo = await Promise.all(
        orders.map(async (order) => {
          // If userId exists but is just a string (not populated)
          if (
            order.userId &&
            typeof order.userId === "string" &&
            !order.userId.name
          ) {
            try {
              const userData = await fetchUserById(order.userId);
              if (userData) {
                return {
                  ...order,
                  userDetails: userData, // Add user details in a separate property
                };
              }
            } catch (e) {
              console.error("Error fetching user for order:", e);
            }
          }
          return order;
        })
      );

      setOrders(ordersWithUserInfo);
      setError(null);
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Helper function to determine if we have user details
  const hasUserDetails = (order) => {
    return (
      (order.userId?.name && order.userId?.email) ||
      (order.userDetails?.name && order.userDetails?.email)
    );
  };

  const toggleOrderExpand = (orderId) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/order/update-status/${orderId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Important for sending cookies
          body: JSON.stringify({ status }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update order status");
      }

      // Update local state to reflect the change
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status } : order
        )
      );

      toast.success(`Order status updated to ${status}`);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const fetchUserById = async (userId) => {
    // Check if we've already fetched this user
    if (userCache[userId]) {
      // Update any orders with this user ID
      updateOrdersWithUserData(userId, userCache[userId]);
      return userCache[userId];
    }

    try {
      const response = await fetch(`http://localhost:5000/api/auth/${userId}`, {
        method: "GET",
        credentials: "include", // Important for sending cookies
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();

      // Cache the user data
      setUserCache((prev) => ({
        ...prev,
        [userId]: data.user,
      }));

      // Update any orders with this user ID
      updateOrdersWithUserData(userId, data.user);

      return data.user;
    } catch (err) {
      console.error("Error fetching user:", err);
      return null;
    }
  };

  const updateOrdersWithUserData = (userId, userData) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => {
        if (
          order.userId === userId ||
          (typeof order.userId === "object" && order.userId?._id === userId)
        ) {
          return {
            ...order,
            userDetails: userData,
          };
        }
        return order;
      })
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Food Processing":
        return "bg-yellow-100 text-yellow-800";
      case "Out for Delivery":
        return "bg-blue-100 text-blue-800";
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded">Error: {error}</div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Customer Orders</h1>
        <button
          onClick={fetchOrders}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Refresh Orders
        </button>
      </div>

      {orders.length === 0 ? (
        <div className="bg-gray-50 p-6 rounded text-center">
          <p className="text-gray-500">No orders found</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-lg shadow overflow-hidden border border-gray-200"
            >
              <div
                className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50"
                onClick={() => toggleOrderExpand(order._id)}
              >
                <div className="flex-1">
                  <p className="font-medium">
                    Order #{order._id.substring(order._id.length - 8)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatDate(order.date)}
                  </p>
                </div>
                <div className="flex-1">
                  <p>
                    Customer:{" "}
                    <span className="font-medium">
                      {order.userId?.name ||
                        order.userDetails?.name ||
                        "Unknown"}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500">
                    {order.userId?.email ||
                      order.userDetails?.email ||
                      "Unknown email"}
                  </p>
                  {!hasUserDetails(order) &&
                    typeof order.userId === "string" && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent expanding the order
                          fetchUserById(order.userId);
                        }}
                        className="text-xs text-blue-500 hover:underline"
                      >
                        Load user details
                      </button>
                    )}
                </div>
                <div className="flex-1 text-right">
                  <p className="font-bold">${order.amount.toFixed(2)}</p>
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>
                <div className="ml-4">
                  <svg
                    className={`w-5 h-5 transition-transform ${
                      expandedOrders[order._id] ? "transform rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>

              {expandedOrders[order._id] && (
                <div className="p-4 border-t border-gray-200 bg-gray-50">
                  <div className="mb-4">
                    <h3 className="font-medium mb-2">Delivery Address:</h3>
                    <p>{order.address.street}</p>
                    <p>
                      {order.address.city}, {order.address.state}{" "}
                      {order.address.zipCode}
                    </p>
                    <p>{order.address.country}</p>
                  </div>

                  <div className="mb-4">
                    <h3 className="font-medium mb-2">Order Items:</h3>
                    <div className="bg-white rounded shadow overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Item
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Quantity
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Price
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Subtotal
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {order.items.map((item, index) => (
                            <tr key={index}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  {item.foodId?.imageUrl && (
                                    <img
                                      src={`http://localhost:5000${item.foodId.imageUrl}`}
                                      alt={item.name || "Food item"}
                                      className="h-10 w-10 rounded-full object-cover mr-3"
                                    />
                                  )}
                                  <span>
                                    {item.name ||
                                      item.foodId?.name ||
                                      "Unknown item"}
                                  </span>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {item.quantity}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right">
                                ${item.price?.toFixed(2)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right">
                                ${(item.price * item.quantity).toFixed(2)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="font-medium mb-2">Update Order Status:</h3>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Food Processing",
                        "Out for Delivery",
                        "Delivered",
                        "Cancelled",
                      ].map((status) => (
                        <button
                          key={status}
                          onClick={() => updateOrderStatus(order._id, status)}
                          className={`px-3 py-1 rounded text-sm ${
                            order.status === status
                              ? "bg-green-500 text-white"
                              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                          }`}
                          disabled={order.status === status}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { orderService } from "../services/orderService";
import { FaBox } from "react-icons/fa";

const UserOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user, isAuthenticated } = useSelector((state) => state.user);
  useEffect(() => {
    // Wait for auth state to be determined
    if (!isAuthenticated || !user?.id) {
      setError("User not logged in");
      setLoading(false);
      return;
    }
    // Fetch orders when authenticated
    setLoading(true);
    setError(null);
    orderService
      .getUserOrders(user.id)
      .then((orders) => {
        setOrders(orders);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to fetch orders");
        setLoading(false);
      });
  }, [isAuthenticated, user]);

  if (loading) return <div>Loading orders...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div className="pad">
      <h2 className="text-xl font-bold mb-4">My Orders</h2>
      {orders.length === 0 ? (
        <div>No orders found.</div>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => {
            const itemTotalCount = order.items.reduce(
              (sum, i) => sum + i.quantity,
              0
            );
            const itemDesc = order.items
              .map((i) => `${i.name} x ${i.quantity}`)
              .join(", ");
            const statusColor =
              order.status === "Food Processing"
                ? "bg-orange-500"
                : "bg-gray-500";
            return (
              <li key={order._id} className="border rounded-md">
                <div className="grid grid-cols-5 items-center p-4 gap-4">
                  <div className="flex items-center space-x-4 col-span-2">
                    <FaBox className="text-orange-500" size={24} />
                    <span className="text-gray-700 truncate">{itemDesc}</span>
                  </div>
                  <span className="text-gray-900 font-semibold">
                    ${order.amount.toFixed(2)}
                  </span>
                  <span className="text-gray-700">Items: {itemTotalCount}</span>
                  <div className="flex items-center space-x-1">
                    <span className={`${statusColor} h-2 w-2 rounded-full`} />
                    <span className="text-gray-700">{order.status}</span>
                  </div>
                  <button className="bg-pink-200 text-pink-700 px-4 py-2 rounded-md hover:bg-pink-300 transition">
                    Track Order
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default UserOrdersPage;

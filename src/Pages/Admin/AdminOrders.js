import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/AdminOrders.css";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/orders/all`, {
        withCredentials: true,
      })
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("Error fetching orders:", err));
  };

  const updateStatus = (orderId) => {
    axios
      .put(
        `${process.env.REACT_APP_BACKEND_URL}/api/orders/status`,
        { orderId, status: "delivered" },
        { withCredentials: true }
      )
      .then(() => fetchOrders())
      .catch((err) => console.error("Failed to update status:", err));
  };

  return (
    <div className="admin-orders-container">
      <h1>📦 All Orders</h1>

      {orders?.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders?.map((order) => (
          <div className="order-card" key={order._id}>
            <div className="order-header">
              <h2>Order ID: {order._id.slice(-6)}</h2>
              <span className={`status ${order.status.toLowerCase()}`}>
                {order.status}
              </span>
            </div>

            <p>
              <strong>User Email:</strong> {order.userId?.email}
            </p>
            <p>
              <strong>Address:</strong> {order.address}
            </p>
            <p>
              <strong>Total:</strong> ₹{order.totalAmount}
            </p>

            <ul className="item-list">
              {order.items.map((item, i) => (
                <li key={i} className="order-item">
                  <span>{item.productId?.name}</span>
                  <span>₹{item.price}</span>
                  <span>Qty: {item.quantity}</span>
                </li>
              ))}
            </ul>

            {(order.status === "paid" || order.status === "pending") && (
              <button
                className="update-button"
                onClick={() => updateStatus(order._id)}
              >
                Mark as Delivered
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default AdminOrders;

import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/MyOrders.css";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/orders/my-orders", {
        withCredentials: true,
      })
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch orders:", err);
      });
  }, []);

  return (
    <div className="orders-container">
      <h1>🧾 My Orders</h1>

      {orders.length === 0 ? (
        <p className="no-orders">You have no orders yet.</p>
      ) : (
        orders.map((order, index) => (
          <div className="order-card" key={order._id}>
            <div className="order-header">
              <h2>Order #{index + 1}</h2>
              <span className={`status ${order.status.toLowerCase()}`}>
                {order.status}
              </span>
            </div>

            <p>
              <strong>Address:</strong> {order.address}
            </p>
            <p>
              <strong>Total Amount:</strong> ₹{order.totalAmount}
            </p>
            <p>
              <strong>Status:</strong> {order.status}
            </p>
            <ul className="item-list">
              {order.items.map((item, i) => (
                <li key={i} className="order-item">
                  <span>{item.productId?.name}</span>
                  <span>₹{item.productId?.price}</span>
                  <span>Qty: {item.quantity}</span>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;

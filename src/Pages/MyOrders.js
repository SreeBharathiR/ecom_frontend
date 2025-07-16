import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/MyOrders.css";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [ratings, setRatings] = useState({});
  const [ratedProducts, setRatedProducts] = useState(new Set());

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/orders/my-orders", {
        withCredentials: true,
      })
      .then((res) => {
        setOrders(res.data);
        // Find all products that have been rated in any order
        const rated = new Set();
        res.data.forEach((order) => {
          order.items.forEach((item) => {
            if (item.rated) {
              rated.add(item.productId._id);
            }
          });
        });
        setRatedProducts(rated);
      })
      .catch((err) => console.error("Failed to fetch orders:", err));
  }, []);

  const handleStarClick = (productId, star) => {
    setRatings((prev) => ({ ...prev, [productId]: star }));
  };

  const handleSubmit = (productId) => {
    const rating = ratings[productId];
    if (!rating) return;

    axios
      .post(
        "http://localhost:5000/api/ratings",
        { productId, rating },
        { withCredentials: true }
      )
      .then(() => {
        setRatedProducts((prev) => new Set(prev).add(productId)); // Add to rated products
        alert("Thanks for rating!");
      })
      .catch((err) => console.error("Rating failed:", err));
  };

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

            <div className="item-grid">
              {order.items.map((item, i) => {
                const pid = item.productId._id;
                const isProductRated = ratedProducts.has(pid);
                const selectedRating = ratings[pid] || 0;

                return (
                  <div className="item-card" key={i}>
                    <div className="item-details">
                      <h4>{item.productId?.name}</h4>
                      <p>Price: ₹{item.productId?.price}</p>
                      <p>Quantity: {item.quantity}</p>

                      {order.status.toLowerCase() === "delivered" && (
                        <div className="rating-section">
                          {isProductRated ? (
                            <div className="star-rating static">
                              <p>You've already rated this product</p>
                            </div>
                          ) : (
                            <>
                              <div className="star-rating">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <span
                                    key={star}
                                    className={
                                      selectedRating >= star
                                        ? "star filled"
                                        : "star"
                                    }
                                    onClick={() => handleStarClick(pid, star)}
                                  >
                                    ★
                                  </span>
                                ))}
                              </div>
                              {selectedRating > 0 && (
                                <button
                                  className="submit-rating"
                                  onClick={() => handleSubmit(pid)}
                                >
                                  Submit Rating
                                </button>
                              )}
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;

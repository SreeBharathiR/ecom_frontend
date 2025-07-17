import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/cart.css"; // Assuming your CSS is here
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout");
  };
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/carts`, {
        withCredentials: true,
      })
      .then((res) => setCartItems(res.data.items))
      .catch((err) => console.error(err));
  }, []);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.productId.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cartItems.map((item) => (
              <li key={item._id} className="cart-item">
                <img src={item.productId.imageUrl} alt={item.productId.name} />
                <div className="item-details">
                  <h4>{item.productId.name}</h4>
                  <p>${item.productId.price.toFixed(2)}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <h3>Total: ${totalPrice?.toFixed(2)}</h3>
            <button className="checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;

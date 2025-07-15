import React from "react";
import "../styles/orderSuccessPage.css";
import { useNavigate } from "react-router-dom";

const OrderSuccessPage = () => {
  const naviagte = useNavigate();
  const handleNaviagte = () => {
    naviagte("/");
  };
  return (
    <div className="order-success-container">
      <div className="success-card">
        <h1>🎉 Thank You for Your Order!</h1>
        <p>Your order has been placed successfully.</p>
        <p>You will receive a confirmation email shortly.</p>
        <button onClick={handleNaviagte}>Continue Shopping</button>
      </div>
    </div>
  );
};

export default OrderSuccessPage;

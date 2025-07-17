import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/checkout.css";
import axios from "axios";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    address: "",
    payment: "cod",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/orders/create`,
        {
          address: form.address,
          paymentMethod: form.payment,
        },
        { withCredentials: true }
      );

      alert("Order placed successfully!");
      navigate("/order-success"); // or show a success page
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Failed to place order");
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Full Name:
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Address:
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            required
          ></textarea>
        </label>
        <label>
          Payment Method:
          <select name="payment" value={form.payment} onChange={handleChange}>
            <option value="cod">Cash on Delivery</option>
            <option value="online">Online Payment</option>
          </select>
        </label>
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default CheckoutPage;

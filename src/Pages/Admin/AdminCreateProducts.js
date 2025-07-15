import React, { useState } from "react";
import axios from "axios";
import "../../styles/admin.css";

const AdminCreateProducts = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/products", formData, {
        withCredentials: true,
      });
      alert("Product created!");
      setFormData({ name: "", price: "", description: "" });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="admin-section">
      <h2>Create Product</h2>
      <form onSubmit={handleSubmit} className="admin-form">
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          name="price"
          placeholder="Price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default AdminCreateProducts;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/admin.css";

const AdminProductForm = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    quantity: "",
    imageUrl: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();
  console.log(id);
  useEffect(() => {
    if (id) {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/api/products/${id}`, {
          withCredentials: true,
        })
        .then((res) => setForm(res.data))
        .catch((err) => console.log(err));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("image", form.imageUrl); // Must match backend field name

      formData.append("name", form.name.trim());
      formData.append("price", Number(form.price));
      formData.append("description", form.description.trim());
      formData.append("quantity", Number(form.quantity));
      formData.append("category", form.category.trim());
      // Append other fields as needed
      if (!form.name.trim() || !form.price) {
        alert("Name and Price are required.");
        return;
      }
      if (id) {
        // PUT request for updating
        await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/api/products/${id}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
          }
        );
      } else {
        // POST request for creating
        await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/products`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
          }
        );
      }

      navigate("/admin/products");
    } catch (err) {
      console.error("Error saving product", err);
    }
  };
  console.log(form);

  return (
    <div className="admin-container">
      <h2 className="admin-header">{id ? "Edit" : "Add"} Product</h2>
      <form className="admin-form" onSubmit={handleSubmit}>
        <label>Product Name</label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <label>Description</label>
        <textarea
          rows="4"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />

        <label>Category</label>
        <input
          type="text"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          required
        />

        <label>Price</label>
        <input
          type="number"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />

        <label>Quantity</label>
        <input
          type="number"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          required
        />

        <label>Select Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              setForm({ ...form, imageUrl: file });
            }
          }}
          required
        />
        <br></br>
        <button className="admin-button success" type="submit">
          {id ? "Update" : "Create"} Product
        </button>
      </form>
    </div>
  );
};

export default AdminProductForm;

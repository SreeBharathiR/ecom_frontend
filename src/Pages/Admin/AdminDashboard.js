import React from "react";
import { Link } from "react-router-dom";
import "../../styles/admin.css";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="admin-links">
        <Link to="/admin/users">Manage Users</Link>
        <Link to="/admin/products">Manage Products</Link>
        <Link to="/admin/create-product">Create Product</Link>
      </div>
    </div>
  );
};

export default AdminDashboard;

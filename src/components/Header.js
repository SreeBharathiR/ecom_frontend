import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Header.css";

function Header() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  console.log(user);
  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };
  return (
    <header className="header">
      <h1>
        <Link to="/">ShopNow</Link>
      </h1>
      <nav>
        <Link to="/">Products</Link>
        {user?.role === "customer" && (
          <>
            <Link to="/cart">Cart</Link>
            <Link to="/my-orders">My Orders</Link>
          </>
        )}

        {user?.role === "admin" && (
          <>
            <Link to="/admin/products">Managae Products</Link>
            <Link to="/admin/users">Manage Users</Link>
            <Link to="/admin/orders">Manage Orders</Link>
          </>
        )}
        {user ? (
          <button onClick={handleLogout} className="logoutBtn">
            Logout
          </button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </header>
  );
}

export default Header;

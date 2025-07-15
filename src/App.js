import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./Pages/HomePage";
import ProductPage from "./Pages/ProductPage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import CartPage from "./Pages/CartPage";
import CheckoutPage from "./Pages/CheckoutPage";
import OrderSuccessPage from "./Pages/OrderSuccessPage";
import OAuthSuccess from "./Pages/OAuthSuccess";
import ProtectedRoute from "./components//Auth/ProtectedRoute";
import "./styles/main.css";
import { AuthProvider } from "./context/AuthContext";
import AdminUsers from "./Pages/Admin/AdminUsers";
import AdminProducts from "./Pages/Admin/AdminProducts";
import AdminProductForm from "./Pages/Admin/AdminProductForm";
import Unauthorized from "./components/Auth/Unauthorized";
import MyOrders from "./Pages/MyOrders";
import AdminOrders from "./Pages/Admin/AdminOrders";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/cart"
              element={
                <ProtectedRoute allowedRoles={["customer"]}>
                  {" "}
                  <CartPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute allowedRoles={["customer"]}>
                  <CheckoutPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/order-success"
              element={
                <ProtectedRoute allowedRoles={["customer"]}>
                  <OrderSuccessPage />
                </ProtectedRoute>
              }
            />
            <Route path="/admin/orders" element={<AdminOrders />} />
            <Route
              path="/my-orders"
              element={
                <ProtectedRoute allowedRoles={["customer"]}>
                  <MyOrders />
                </ProtectedRoute>
              }
            />
            <Route path="/oauth-success" element={<OAuthSuccess />} />

            <Route
              path="/admin/users"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminUsers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/products"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminProducts />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/products/edit/:id"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminProductForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/products/new"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminProductForm />
                </ProtectedRoute>
              }
            />
            <Route path="/unauthorized" element={<Unauthorized />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;

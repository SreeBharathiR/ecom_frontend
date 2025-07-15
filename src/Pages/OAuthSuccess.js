// src/pages/OAuthSuccess.jsx
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const OAuthSuccess = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/me", {
          withCredentials: true,
        });
        localStorage.setItem("customer", JSON.stringify(res.data));
        setUser(res.data);
        if (res.data.role === "admin") {
          navigate("/admin/products");
        } else {
          navigate("/");
        }
      } catch (err) {
        alert("Login failed");
        navigate("/login");
      }
    };

    fetchUser();
  }, []);

  return <p>Processing Google Login...</p>;
};

export default OAuthSuccess;

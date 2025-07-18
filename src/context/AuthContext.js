// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(process.env.REACT_APP_BACKEND_URL);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/auth/me`, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const logout = async () => {
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/auth/logout`, {
      withCredentials: true,
    });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// src/contexts/AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import axios from '../api/axiosInstance';    // ← use the instance!

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    const res = await axios.post('/login/', { email, password });
    console.log('✅ Login response:', res.data);

    setUser({ email });
  };

  const register = async (email, password) => {
    await axios.post('/register/', { email, password });
    setUser({ email });
  };

  const logout = async () => {
    await axios.post('/logout/');
    setUser(null);
    window.location.href = '/';
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

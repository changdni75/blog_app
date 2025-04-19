import React, { useState } from 'react';
import axios from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async () => {
    await register(email, password);
    navigate('/login');
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Register</h2>
      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 border border-gray-300 rounded mb-3"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full p-2 border border-gray-300 rounded mb-4"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button
        onClick={handleRegister}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Register
      </button>
    </div>
  );
};

export default Register;

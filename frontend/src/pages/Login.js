import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';  // ← get login from context

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();        // ← this uses the axiosInstance
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Login failed: ' + (err.response?.data || err.message));
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
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
        onClick={handleLogin}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Login
      </button>
    </div>
  );
};

export default Login;

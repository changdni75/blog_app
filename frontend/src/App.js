// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import NavBar from './components/NavBar';
import BlogList from './pages/BlogList';
import BlogDetail from './pages/BlogDetail';
import CreateBlog from './pages/CreateBlog';
import Login from './pages/Login';
import Register from './pages/Register';
import UpdateBlog from './pages/UpdateBlog';


const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<BlogList />} />
      <Route path="/blogs/:id" element={<BlogDetail />} />
      <Route path="/login/" element={<Login />} />
      <Route path="/register/" element={<Register />} />
      <Route
  path="/blogs/update/:id"
  element={user ? <UpdateBlog /> : <Navigate to="/login" />}
/>
      <Route
        path="/create"
        element={user ? <CreateBlog /> : <Navigate to="/login" />}
      />
    </Routes>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

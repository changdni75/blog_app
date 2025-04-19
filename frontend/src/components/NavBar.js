import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const NavBar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow px-6 py-4 w-full" style={{ marginBottom: '40px', display: 'flex', alignItems: 'center' }}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Logo */}
        <Link to="/" className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition">
          Blog App
        </Link>

        {/* Right: Navigation Links */}
        <div className="flex items-center text-gray-700" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <Link to="/" className="hover:text-blue-600 transition">
            All Blogs
          </Link>
          {user ? (
            <>
              <Link to="/create" className="hover:text-blue-600 transition">
                Create Blog
              </Link>
              <button
                onClick={logout}
                className="hover:text-red-500 transition focus:outline-none"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-600 transition">
                Login
              </Link>
              <Link to="/register" className="hover:text-blue-600 transition">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
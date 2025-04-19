
import React, { useEffect, useState } from 'react';
import axios from '../api/axiosInstance';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const { user } = useAuth();

  useEffect(() => {
    axios.get(`blogs/?page=${page}`)
      .then(res => {
        setBlogs(res.data);
        console.log('✅ Blogs fetched:', res.data);
      })
      .catch(err => {
        console.error('❌ Failed to fetch blogs:', err);
      });
  }, [page]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/blogs/delete/${id}/`);
      setBlogs(prev => prev.filter(blog => blog.id !== id));
    } catch (err) {
      console.error('❌ Failed to delete blog:', err);
      alert('Failed to delete blog');
    }
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">
        {user ? 'My Blogs' : 'All Blogs'}
      </h1>

      {blogs.length === 0 && (
        <p className="text-center text-gray-600">No blogs available.</p>
      )}

      {/* Blog List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {blogs.map(blog => (
          <div key={blog.id} style={{ backgroundColor: 'white', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)', borderRadius: '0.5rem', padding: '1rem', display: 'grid', gridTemplateColumns: '1fr 2fr 1fr 1fr', alignItems: 'center', gap: '0.5rem' }}>
            <Link
              to={`/blogs/${blog.id}`}
              style={{ fontSize: '1.25rem', fontWeight: '600', color: '#2563eb', textDecoration: 'underline' }}
            >
              {blog.title}
            </Link>

            <p style={{ color: '#6b7280', marginTop: '0.5rem', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical' }}>{blog.content}</p>

            {/* Show Edit/Delete if user is the author */}
            {user?.user_id === blog.author_id && (
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Link
                  to={`/blogs/update/${blog.id}`}
                  style={{ fontSize: '0.875rem', color: '#16a34a', textDecoration: 'underline' }}
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(blog.id)}
                  style={{ fontSize: '0.875rem', color: '#dc2626', textDecoration: 'underline' }}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between mt-8">
        <button
          onClick={() => setPage(p => Math.max(1, p - 1))}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Previous
        </button>
        <button
          onClick={() => setPage(p => p + 1)}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BlogList;
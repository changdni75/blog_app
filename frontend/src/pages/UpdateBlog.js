// src/pages/UpdateBlog.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../api/axiosInstance';

const UpdateBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    // Fetch blog details to prefill form
    axios.get(`/blogs/${id}/`)
      .then(res => {
        setTitle(res.data.title);
        setContent(res.data.content);
      })
      .catch(err => {
        console.error('❌ Failed to fetch blog:', err);
        alert('Failed to load blog');
        navigate('/');
      });
  }, [id, navigate]);

  const handleUpdate = async () => {
    try {
      await axios.put(`/blogs/update/${id}/`, { title, content });
      navigate('/');
    } catch (err) {
      console.error('❌ Failed to update blog:', err);
      alert('Update failed');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Update Blog</h2>
      <input
        type="text"
        placeholder="Title"
        className="w-full p-2 border border-gray-300 rounded mb-3"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <textarea
        rows={10}
        placeholder="Content"
        className="w-full p-2 border border-gray-300 rounded mb-4"
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <button
        onClick={handleUpdate}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Save Changes
      </button>
    </div>
  );
};

export default UpdateBlog;

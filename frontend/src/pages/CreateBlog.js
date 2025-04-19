import React, { useState } from 'react';
import axios from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleCreate = async () => {
    try {
      await axios.post('blogs/create/', { title, content });
      navigate('/');
    } catch (err) {
      console.error('Failed to create blog:', err);
    }
  };
  

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Create Blog</h2>
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
        onClick={handleCreate}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Publish
      </button>
    </div>
  );
};

export default CreateBlog;

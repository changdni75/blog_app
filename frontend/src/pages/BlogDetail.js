import React, { useEffect, useState } from 'react';
import axios from '../api/axiosInstance';
import { useParams } from 'react-router-dom';

const API_BASE = 'http://localhost:8000/api';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios.get(`${API_BASE}/blogs/${id}/`).then(res => setBlog(res.data));
  }, [id]);

  if (!blog) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
      <p className="text-gray-700 whitespace-pre-line">{blog.content}</p>
    </div>
  );
};

export default BlogDetail;

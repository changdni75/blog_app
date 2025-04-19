// src/api/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api/',
  withCredentials: true, // important for session authentication with cookies
});

// Log full URL for debugging
axiosInstance.interceptors.request.use(config => {
    console.log(`▶️ Request: ${config.baseURL}${config.url}`);
    return config;
  });
  
  // Log errors with URL
  axiosInstance.interceptors.response.use(
    response => response,
    error => {
      const { config, response } = error;
      console.error(
        `❌ Request Failed: ${config.baseURL}${config.url}`,
        response ? `Status: ${response.status}` : error.message
      );
      return Promise.reject(error);
    }
  );
  
  export default axiosInstance;
  
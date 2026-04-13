import axios from "axios";

// runs on EVERY request
axios.interceptors.request.use((config) => {
  const stored = localStorage.getItem("token");

  const token = stored ? JSON.parse(stored)?.token : null;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axios;
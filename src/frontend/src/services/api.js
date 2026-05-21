import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "",
  timeout: 12000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const stored = localStorage.getItem("measurepro_user");
    if (stored) {
      try {
        const user = JSON.parse(stored);
        if (user && user.token) {
          config.headers.Authorization = `Bearer ${user.token}`;
        }
      } catch (e) {
        console.error("Failed to parse user session for request interceptor", e);
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("measurepro_user");
      window.dispatchEvent(new Event("storage"));
      window.location.href = "/logout";
    }
    const message = error.response?.data?.message || error.response?.data?.errorMessage || error.response?.data?.error || error.message;
    return Promise.reject(new Error(message || "Request failed"));
  },
);

export default api;

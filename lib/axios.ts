import axiosLib from "axios";

const axios = axiosLib.create({
  baseURL: process.env.API_URL || "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
axios.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("auth_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Only redirect to login if:
      // 1. Not already on login/signup pages
      // 2. Not a login/signup API call failure
      if (typeof window !== "undefined") {
        const currentPath = window.location.pathname;
        const requestUrl = error.config?.url || "";
        const isAuthEndpoint =
          requestUrl.includes("/auth/login") ||
          requestUrl.includes("/auth/signup") ||
          requestUrl.includes("/auth/client/");
        const isAuthPage =
          currentPath === "/login" || currentPath === "/signup";

        // Only redirect if user is authenticated but token expired
        // Don't redirect if it's a login/signup failure
        if (!isAuthEndpoint && !isAuthPage) {
          localStorage.removeItem("auth_token");
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

export default axios;

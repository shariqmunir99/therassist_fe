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
      // Try to get token from localStorage (priority to access_token)
      const token =
        localStorage.getItem("access_token") ||
        localStorage.getItem("auth_token");
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
    // Handle 401 (Unauthorized) or 403 (Forbidden) - token invalid/expired
    if (error.response?.status === 401 || error.response?.status === 403) {
      if (typeof window !== "undefined") {
        const currentPath = window.location.pathname;
        const requestUrl = error.config?.url || "";

        // Don't redirect if it's an auth endpoint (login/signup failures)
        const isAuthEndpoint =
          requestUrl.includes("/auth/login") ||
          requestUrl.includes("/auth/signup") ||
          requestUrl.includes("/auth/client/");

        // Don't redirect if already on auth pages
        const isAuthPage =
          currentPath === "/login" || currentPath === "/signup";

        // Redirect to login if token is invalid/expired
        if (!isAuthEndpoint && !isAuthPage) {
          // Clear all auth tokens and cookies
          localStorage.removeItem("auth_token");
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          localStorage.removeItem("user_id");

          document.cookie = "access_token=; path=/; max-age=0";
          document.cookie = "refresh_token=; path=/; max-age=0";
          document.cookie = "user_id=; path=/; max-age=0";

          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

export default axios;

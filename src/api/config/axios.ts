// src/lib/axios.ts
import axios from "axios";
import { auth } from "./firebase";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://api.crowdflix.io",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    const currentUser = auth.currentUser;
    
    if (currentUser) {
      try {
        // Get fresh token (Firebase handles caching automatically)
        const token = await currentUser.getIdToken();
        localStorage.setItem("token", token);
        config.headers.Authorization = `Bearer ${token}`;
      } catch (error) {
        console.error("Error getting token:", error);
        // Fall back to stored token
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    } else {
      // No Firebase user, use stored token if available
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If 401/403 and we haven't retried yet
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      
      const currentUser = auth.currentUser;
      
      if (currentUser) {
        try {
          // Force refresh the token
          const token = await currentUser.getIdToken(true);
          localStorage.setItem("token", token);
          
          // Retry the original request with new token
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axios(originalRequest);
        } catch (refreshError) {
          console.error("Token refresh failed:", refreshError);
          // Refresh failed, clear token and reject
          localStorage.removeItem("token");
          return Promise.reject(error);
        }
      } else {
        // No user logged in, clear token
        localStorage.removeItem("token");
      }
    }

    return Promise.reject(error);
  },
);

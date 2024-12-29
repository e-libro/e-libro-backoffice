import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const ACCESS_TOKEN_KEY = "my-jwt-access-token";

const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshResponse = await apiClient.post(
          "/auth/refresh",
          {},
          { withCredentials: true }
        );
        const { accessToken } = refreshResponse.data;

        localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);

        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
        return apiClient(originalRequest);
      } catch (e) {
        console.error("Error refreshing token:", e);
        return Promise.reject(e);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;

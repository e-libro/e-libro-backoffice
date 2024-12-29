import apiClient from "./ApiClient";

export const signin = async (email, password) => {
  try {
    const response = await apiClient.post("/auth/signin", { email, password });
    return response.data;
  } catch (e) {
    throw e.response?.data || e.message;
  }
};

export const signout = async () => {
  try {
    await apiClient.post("/auth/signout", {}, { withCredentials: true });
  } catch (e) {
    throw e.response?.data || e.message;
  } finally {
    localStorage.removeItem("my-jwt-access-token");
  }
};

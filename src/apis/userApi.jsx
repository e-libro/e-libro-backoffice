import apiClient from "./ApiClient";

export const getAllUsers = async () => {
  try {
    const response = await apiClient.get("/users");
    return response.data;
  } catch (e) {
    throw e.response?.data || e.message;
  }
};

export const getUserById = async (id) => {
  try {
    const response = await apiClient.get(`/users/${id}`);
    return response.data;
  } catch (e) {
    throw e.response?.data || e.message;
  }
};

export const updateUser = async (id, updates) => {
  try {
    const response = await apiClient.put(`/users/${id}`, updates);
    return response.data;
  } catch (e) {
    throw e.response?.data || e.message;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await apiClient.delete(`/users/${id}`);
    return response.data;
  } catch (e) {
    throw e.response?.data || e.message;
  }
};

export const createUser = async (data) => {
  try {
    const response = await apiClient.post("/users", data);
    return response.data;
  } catch (e) {
    throw e.response?.data || e.message;
  }
};
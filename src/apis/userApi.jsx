import apiClient from "./apiClient";

class UserApi {
  async getAllUsers() {
  try {
    const response = await apiClient.get("/users");
    return response.data;
  } catch (e) {
    throw e.response?.data || e.message;
  }
};

async getUserById(id) {
  try {
    const response = await apiClient.get(`/users/${id}`);
    return response.data;
  } catch (e) {
    throw e.response?.data || e.message;
  }
};

async updateUser(id, updates) {
  try {
    const response = await apiClient.put(`/users/${id}`, updates);
    return response.data;
  } catch (e) {
    throw e.response?.data || e.message;
  }
};

async deleteUser(id) {
  try {
    const response = await apiClient.delete(`/users/${id}`);
    return response.data;
  } catch (e) {
    throw e.response?.data || e.message;
  }
};

async createUser(data) {
  try {
    const response = await apiClient.post("/users", data);
    return response.data;
  } catch (e) {
    throw e.response?.data || e.message;
  }
};
}

export default new UserApi();
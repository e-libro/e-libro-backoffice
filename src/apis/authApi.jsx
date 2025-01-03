import apiClient from "./apiClient.jsx";


class AuthApi {
   async signin(email, password) {
    try {
      const response = await apiClient.post("/auth/signin", { email, password });
      return response.data;
    } catch (e) {
      throw e.response?.data || e.message;
    }
  }

   async signout() {
    try {
      await apiClient.get("/auth/signout", {}, { withCredentials: true });
    } catch (e) {
      throw e.response?.data || e.message;
    } finally {
      localStorage.removeItem("my-jwt-access-token");
    }
  }

   async me() {
    try {
      const response = await apiClient.post("/auth/me", {}, { withCredentials: true });
      return response.data;
    } catch (e) {
      throw e.response?.data || e.message;
    }
  }

  async changePassword(currentPassword, newPassword) {
    console.log({currentPassword, newPassword})
    try {
      const response = await apiClient.patch("/auth/change-password", {currentPassword, newPassword}, { withCredentials: true });
      return response.data;
    } catch (e) {
      throw e.response?.data || e.message;
    }
  }

}


export default new AuthApi();
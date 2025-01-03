import apiClient from "./apiClient";

class ReportApi {
  async getTop10Books() {
    try {
      const response = await apiClient.get("/reports/books/top-books", {});
      return response.data;
    } catch (e) {
      throw e.response?.data || e.message;
    }
  }
 
  async getLanguagesDistribution() {
    try {
      const response = await apiClient.get("/reports/books/languages-distribution", {});
      return response.data;
    } catch (e) {
      throw e.response?.data || e.message;
    }
  }


async getMonthlyUserSignups() {
  try {
    const response = await apiClient.get("/reports/users/monthly-signups", {});
    return response.data;
  } catch (e) {
    throw e.response?.data || e.message;
  }
}
}

export default new ReportApi();
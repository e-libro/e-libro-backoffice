import apiClient from "./apiClient";

class BookApi {
  async getAllBooks(filters) {
    try {
      const response = await apiClient.get("/books", { params: filters });
      return response.data;
    } catch (e) {
      throw e.response?.data || e.message;
    }
  }

  async getBookById(id) {
    try {
      const response = await apiClient.get(`/books/${id}`);
      return response.data;
    } catch (e) {
      throw e.response?.data || e.message;
    }
  }

  async incrementDownloads(id) {
    try {
      const response = await apiClient.patch(`/books/${id}/downloads`);
      return response.data;
    } catch (e) {
      throw e.response?.data || e.message;
    }
  }
}

export default new BookApi();
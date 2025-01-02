import apiClient from "./ApiClient";

export const getAllBooks = async (filters) => {
  try {
    const response = await apiClient.get("/books", { params: filters });
    return response.data;
  } catch (e) {
    throw e.response?.data || e.message;
  }
};

export const getBookById = async (id) => {
  try {
    const response = await apiClient.get(`/books/${id}`);
    return response.data;
  } catch (e) {
    throw e.response?.data || e.message;
  }
};

export const incrementDownloads = async (id) => {
  try {
    const response = await apiClient.patch(`/books/${id}/downloads`);
    return response.data;
  } catch (e) {
    throw e.response?.data || e.message;
  }
}
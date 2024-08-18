import { axiosInstance } from "./axiosConfig";

export const fetchBooks = async (currentPage, booksPerPage) => {
  try {
    const response = await axiosInstance.get("/books", {
      params: {
        page: currentPage,
        limit: booksPerPage,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch books: ${error.message}`);
  }
};

export const searchAllBooks = async (query) => {
  try {
    const response = await axiosInstance.get(`/books/search`, {
      params: {
        query: query,
      },
    });
    console.log(response.data);

    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch all books: ${error.message}`);
  }
};

export const fetchBookById = async (bookId) => {
  try {
    const response = await axiosInstance.get(`/books/${bookId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch book with ID ${bookId}: ${error.message}`);
  }
};
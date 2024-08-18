import React, { useState, useEffect } from "react";
import BookList from "./Booklist";
import { fetchBooks } from "../api/bookApi";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface Book {
  _id: string;
  id: number;
  cover: string;
  title: string;
  author: string;
  price: string;
  description: string;
}

interface DashboardProps {
  searchQuery: string;
}

const Dashboard: React.FC<DashboardProps> = ({ searchQuery }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 5;
  const [totalBooks, setTotalBooks] = useState(0);

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await fetchBooks(currentPage, booksPerPage);
        console.log("Fetched books:", response);
        if (response && Array.isArray(response.books)) {
          setBooks(
            response.books.map((book) => ({
              _id: book._id,
              id: book.id,
              cover: book.cover,
              title: book.title,
              author: book.author,
              price: book.price.lifetime,
              description: book.description,
            }))
          );
          setTotalBooks(response.totalBooks);
        } else {
          console.error("Invalid data format received from API", response);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookData();
  }, [currentPage, booksPerPage]);

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(totalBooks / booksPerPage);

  const paginate = (pageNumber: number) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentPage(pageNumber);
  };

  const getPageNumbers = () => {
    const maxVisiblePages = 5;
    const halfMaxVisiblePages = Math.floor(maxVisiblePages / 2);
    let start = currentPage - halfMaxVisiblePages;
    let end = currentPage + halfMaxVisiblePages;

    if (start < 1) {
      start = 1;
      end = maxVisiblePages;
    }

    if (end > totalPages) {
      start = totalPages - maxVisiblePages + 1;
      end = totalPages;
    }

    return Array.from({ length: maxVisiblePages }, (_, i) => start + i).filter(
      (page) => page >= 1 && page <= totalPages
    );
  };

  return (
    <div className=" bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 py-8">
      <div className="container mx-auto px-4">
        {loading ? (
          <>
            {" "}
            <h1 className="text-4xl font-bold text-center text-white mb-8">
              Our Book Collection
            </h1>
            <div className="flex flex-col justify-center items-center mx-auto">
              <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-pink-500"></div>
              <p className="text-white mt-4">Loading books, please wait...</p>
            </div>
          </>
        ) : filteredBooks.length > 0 ? (
          <>
            <BookList books={filteredBooks} />
            <div className="flex justify-center mt-6">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`mx-1 px-3 rounded ${
                  currentPage === 1
                    ? "bg-white  text-pink-500 disabled cursor-not-allowed"
                    : "bg-white text-pink-500 hover:bg-pink-500 hover:text-white"
                }`}
              >
                <FaArrowLeft />
              </button>
              {getPageNumbers().map((pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => paginate(pageNumber)}
                  className={`mx-1 px-3 py-1 rounded ${
                    currentPage === pageNumber
                      ? "bg-pink-500 text-white"
                      : "bg-white text-pink-500 hover:bg-pink-500 hover:text-white"
                  }`}
                >
                  {pageNumber}
                </button>
              ))}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`mx-1 px-3 py-1 rounded ${
                  currentPage === totalPages
                    ? "bg-white  text-pink-500 disabled cursor-not-allowed"
                    : "bg-white text-pink-500 hover:bg-pink-500 hover:text-white"
                }`}
              >
                <FaArrowRight />
              </button>
            </div>
          </>
        ) : (
          <div className="text-center text-white text-xl mt-8 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-8 rounded-xl shadow-lg">
            <p>No books found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

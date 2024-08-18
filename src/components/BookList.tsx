import React from "react";
import { useNavigate } from "react-router-dom";

interface Book {
  _id: string;
  cover: string;
  title: string;
  author: string;
  price: string;
}

const BookList: React.FC<{ books: Book[] }> = ({ books }) => {
  const navigate = useNavigate();

  const handleGetBook = (id: string) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(`/book/${id}`);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {books.map((book) => (
            <div
              key={book._id}
              className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col h-full"
            >
              <div className="flex-grow text-center">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-52 object-contain mb-4 rounded-lg"
                />
                <h2 className="text-xl font-bold text-white mb-2 line-clamp-2">
                  {book.title}
                </h2>
                <h3 className="text-md text-gray-300 mb-3">{book.author}</h3>
                <p className="text-lg text-yellow-300 font-semibold mb-4">
                  {book.price}
                </p>
              </div>
              <button
                onClick={() => handleGetBook(book._id)}
                className="w-full py-2 px-4 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition-colors duration-300 transform hover:scale-105"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookList;

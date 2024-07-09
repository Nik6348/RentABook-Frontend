import React from "react";
import { Link } from "react-router-dom";

interface Book {
  id: number;
  cover: string;
  title: string;
  author: string;
  price: string;
}

const BookList: React.FC<{ books: Book[] }> = ({ books }) => {
  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
      {books.map((book) => (
        <div
          key={book.id}
          className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
        >
          <img
            src={book.cover}
            alt={book.title}
            className="w-full h-64 object-contain mb-4 rounded-lg"
          />
          <h2 className="text-lg font-bold text-gray-800">{book.title}</h2>
          <h3 className="text-md text-gray-600">{book.author}</h3>
          <p className="text-sm text-green-600 font-semibold mt-2">
            {book.price}
          </p>
          <Link to={`/book/${book.id}`}>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-300">
              View Details
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BookList;

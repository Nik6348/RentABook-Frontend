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
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 py-8">
      <div className="container mx-auto px-4">
       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
  {books.map((book) => (
    <div
      key={book.id}
      className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center flex flex-col h-full"
    >
      <div className="flex-grow">
        <img
          src={book.cover}
          alt={book.title}
          className="w-full h-64 object-cover mb-4 rounded-lg"
        />
        <h2 className="text-xl font-bold text-white mb-2 line-clamp-2">{book.title}</h2>
        <h3 className="text-md text-gray-300 mb-3">{book.author}</h3>
        <p className="text-lg text-yellow-300 font-semibold mb-4">
          {book.price}
        </p>
      </div>
      <Link to={`/book/${book.id}`} className="block mt-auto">
        <button className="w-full py-2 px-4 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition-colors duration-300 transform hover:scale-105">
          View Details
        </button>
      </Link>
    </div>
  ))}
</div>
      </div>
    </div>
  );
};

export default BookList;
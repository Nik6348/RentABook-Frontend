import React, { useState, useEffect } from "react";
import BookList from "./BookList";
import bookData from "../data/bookdata.json";

interface Book {
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

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setBooks(bookData.map((book) => ({ ...book, price: book.price.lifetime })));
      setLoading(false);
    }, 1000);
  }, []);

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 py-8">
      <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-center text-white mb-8">Our Book Collection</h1>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-pink-500"></div>
          </div>
        ) : filteredBooks.length > 0 ? (
          <BookList books={filteredBooks} />
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
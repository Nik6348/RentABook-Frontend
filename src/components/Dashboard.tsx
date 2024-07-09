import React, { useState } from "react";
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
  const [books] = useState<Book[]>(
    bookData.map((book) => ({
      ...book,
      price: book.price.lifetime,
    }))
  );

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        {filteredBooks.length > 0 ? (
          <BookList books={filteredBooks} />
        ) : (
          <div className="text-center text-gray-600 text-xl mt-8">
            <p>No books found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

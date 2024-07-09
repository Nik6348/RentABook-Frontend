import React from 'react';

interface Book {
  id: number;
  cover: string;
  title: string;
  author: string;
  price: string;
}

interface BookListProps {
  books: Book[];
  onBookClick: (book: Book) => void;
}

const BookList: React.FC<BookListProps> = ({ books, onBookClick }) => {
  return (
    <div className="flex flex-wrap justify-center p-4 bg-gray-100">
      {books.map(book => (
        <div
          key={book.id}
          className="flex-none w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 m-2 bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
          onClick={() => onBookClick(book)}
        >
          <img src={book.cover} alt={book.title} className="w-full h-64 object-cover mb-4 rounded-lg" />
          <h3 className="text-lg font-bold text-gray-800">{book.title}</h3>
          <p className="text-sm text-gray-600">{book.author}</p>
          <p className="text-sm text-green-600 font-semibold mt-2">${book.price}</p>
        </div>
      ))}
    </div>
  );
};

export default BookList;
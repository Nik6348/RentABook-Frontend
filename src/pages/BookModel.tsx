import React, { useState } from 'react';

interface Book {
  cover: string;
  title: string;
  author: string;
  price: string;
}

interface BookModalProps {
  book: Book;
  onClose: () => void;
  onBorrow: (duration: string) => void;
}

const BookModal: React.FC<BookModalProps> = ({ book, onClose, onBorrow }) => {
  const [selectedDuration, setSelectedDuration] = useState<string>("");

  const handleBorrow = () => {
    if (selectedDuration) {
      onBorrow(selectedDuration);
    }
  };

  const handleOuterClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={handleOuterClick}>
      <div className="bg-zinc-100 p-4 rounded shadow-lg max-w-md w-full">
        <img src={book.cover} alt={book.title} className="w-full h-64 object-contain mb-2 rounded" />
        <h2 className="text-2xl font-bold">{book.title}</h2>
        <h3 className="text-lg">{book.author}</h3>
        <p>{book.price}</p>
        <div className="flex justify-between my-4">
          <button
            className={`bg-blue-500 text-zinc-100 px-4 py-2 rounded ${selectedDuration === "1 Week" && "bg-blue-600 text-zinc-100"}`}
            onClick={() => setSelectedDuration("1 Week")}
          >
            1 Week
          </button>
          <button
            className={`bg-blue-500 text-zinc-100 px-4 py-2 rounded ${selectedDuration === "1 Month" && "bg-blue-600 text-zinc-100"}`}
            onClick={() => setSelectedDuration("1 Month")}
          >
            1 Month
          </button>
          <button
            className={`bg-blue-500 text-zinc-100 px-4 py-2 rounded ${selectedDuration === "Lifetime" && "bg-blue-600 text-zinc-100"}`}
            onClick={() => setSelectedDuration("Lifetime")}
          >
            Lifetime
          </button>
        </div>
        <button className="w-full bg-green-500 text-zinc-100 px-4 py-2 rounded" onClick={handleBorrow}>
          Borrow
        </button>
      </div>
    </div>
  );
};

export default BookModal;
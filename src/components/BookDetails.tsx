import React, { useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bookData from "../data/bookdata.json";
import { addToCart, getCartItems } from "../utils/localStorage.tsx";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface Book {
  id: number;
  cover: string;
  title: string;
  author: string;
  price: {
    week: string;
    month: string;
    lifetime: string;
  };
  description: string;
}

const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const book = bookData.find((b) => b.id === Number(id));
  const [selectedDuration, setSelectedDuration] = useState<
    "week" | "month" | "lifetime" | ""
  >("");

  const handleBorrow = () => {
    if (book && selectedDuration) {
      const cartItems = getCartItems();
      const isBookInCart = cartItems.some((item) => item.id === book.id);

      if (isBookInCart) {
        toast.warning("This book is already in your cart!");
      } else {
        addToCart({
          ...book,
          duration: selectedDuration,
          price: book.price[selectedDuration],
        });
        toast.success("Book added to cart successfully!");
        setTimeout(() => {
          navigate("/cart");
        }, 1000);
      }
    } else {
      toast.warn("Please select a duration before borrowing.");
    }
  };
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (scrollOffset: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: scrollOffset, behavior: 'smooth' });
    }
  };

  if (!book) {
    toast.error("Book not found!");
    return <div>Book not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 py-8">
      <div className="container mx-auto p-4">
        <div className="max-w-4xl mx-auto bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg shadow-2xl rounded-lg overflow-hidden">
          <h1 className="text-4xl font-bold text-center py-6 text-white">
            Book Details
          </h1>
          <div className="md:flex">
            <div className="md:flex-shrink-0 md:w-1/2 p-4">
              <div className="backdrop-filter backdrop-blur-lg p-2">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-96 object-contain rounded-lg"
                />
              </div>
            </div>
            <div className="p-8 md:w-1/2 flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  {book.title}
                </h2>
                <h3 className="text-xl text-gray-300 mb-4">{book.author}</h3>
                <p className="text-gray-200">{book.description}</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-yellow-300 mb-6">
                  {selectedDuration
                    ? `Price: ${book.price[selectedDuration]}`
                    : "Select a duration"}
                </p>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[
                    { key: "week", label: "1 Week" },
                    { key: "month", label: "1 Month" },
                    { key: "lifetime", label: "Lifetime" },
                  ].map(({ key, label }) => (
                    <button
                      key={key}
                      className={`py-2 px-4 rounded-full text-white font-semibold ${
                        selectedDuration === key
                          ? "bg-pink-600 hover:bg-pink-700"
                          : "bg-purple-600 hover:bg-purple-700"
                      } transition duration-300`}
                      onClick={() =>
                        setSelectedDuration(
                          key as "week" | "month" | "lifetime"
                        )
                      }
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => toast.info("View Sample coming soon!")}
                    className="flex-grow bg-yellow-400 text-white font-bold py-3 px-6 rounded-full hover:bg-yellow-500 transition duration-300"
                  >
                    View Sample
                  </button>
                  <button
                    onClick={handleBorrow}
                    className="flex-grow bg-green-500 text-white font-bold py-3 px-6 rounded-full hover:bg-green-600 transition duration-300"
                  >
                    Borrow Now
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4">
            <h2 className="text-2xl font-bold text-white mb-4">
              Related Books
            </h2>
            <div className="relative">
              <button
                onClick={() => scroll(-200)}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full z-10"
              >
                <FaChevronLeft className="text-gray-800" />
              </button>
              <div
                ref={scrollContainerRef}
                className="flex overflow-x-auto overflow-x-hidden space-x-4 pb-4  text-center"
              >
                {bookData.slice(0, 10).map((relatedBook) => (
                  <div
                    key={relatedBook.id}
                    className="flex-shrink-0 w-48 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-4 transition duration-300 hover:bg-opacity-30"
                  >
                    <img
                      src={relatedBook.cover}
                      alt={relatedBook.title}
                      className="w-full h-48 object-contain mb-2 rounded-lg"
                    />
                    <h3 className="text-md font-bold text-white">
                      {relatedBook.title}
                    </h3>
                    <p className="text-sm text-gray-300">{relatedBook.author}</p>
                  </div>
                ))}
              </div>
              <button
                onClick={() => scroll(200)}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full z-10"
              >
                <FaChevronRight className="text-gray-800" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={2000} newestOnTop />
    </div>
  );
};

export default BookDetails;
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bookData from "../data/bookdata.json";
import { addToCart, getCartItems } from "../utils/localStorage.tsx";

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
          navigate("/Cart");
        }, 1000);
      }
    } else {
      toast.warn("Please select a duration before borrowing.");
    }
  };

  if (!book) {
    toast.error("Book not found!");
    return <div>Book not found</div>;
  }

  return (
    <>
      <div className="container mx-auto p-3">
        <div className="max-w-4xl mx-auto bg-zinc-100 shadow-lg rounded-lg overflow-hidden">
          <h1 className="text-3xl font-bold text-center py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
            Book Details
          </h1>
          <div className="md:flex">
            <div className="md:flex-shrink-0 md:w-1/2 p-4">
              <div className="bg-gray-100 rounded-lg p-2">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-[32rem] object-contain rounded-lg"
                />
              </div>
            </div>
            <div className="p-8 md:w-1/2 flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  {book.title}
                </h2>
                <h3 className="text-xl text-gray-600 mb-4">{book.author}</h3>
                <p>{book.description}</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-green-600 mb-6">
                  {selectedDuration
                    ? `Price:- ${book.price[selectedDuration]}`
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
                          ? "bg-blue-600 hover:bg-blue-700"
                          : "bg-blue-500 hover:bg-blue-600"
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
                <button
                  onClick={handleBorrow}
                  className="w-full bg-green-500 text-white font-bold py-3 px-6 rounded-full hover:bg-green-600 transition duration-300"
                >
                  Borrow Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={2000} newestOnTop />{" "}
    </>
  );
};

export default BookDetails;

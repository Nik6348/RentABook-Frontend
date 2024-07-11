import React, { useState, useEffect, useMemo } from "react";
import { getCartItems, removeFromCart } from "../utils/localStorage";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash, FaShoppingCart, FaBook } from "react-icons/fa";

interface CartItem {
  id: number;
  cover: string;
  title: string;
  author: string;
  duration: string;
  price: string;
}

const durationLabels: { [key: string]: string } = {
  week: "1 Week",
  month: "1 Month",
  lifetime: "Lifetime",
};

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setCartItems(getCartItems());
  }, []);

  const handleRemoveItem = (id: number) => {
    removeFromCart(id);
    setCartItems(getCartItems());
    toast.success("Item removed from cart");
  };

  const totalPrice = useMemo(() => {
    return cartItems
      .reduce((total, item) => {
        const numericPrice = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
        return total + numericPrice;
      }, 0)
      .toFixed(2);
  }, [cartItems]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900  py-12 text-white  text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8">Your Cart</h2>
        {cartItems.length === 0 ? (
          <div className="text-center bg-gradient-to-r from-purple-200 to-indigo-200 rounded-lg shadow-lg p-12 max-w-md mx-auto">
            <FaShoppingCart className="text-indigo-600 text-7xl mx-auto mb-6" />
            <p className="text-2xl text-indigo-800 mb-6">Your cart is empty</p>
            <button
              onClick={() => navigate("/")}
              className="bg-indigo-600 text-white py-3 px-6 rounded-full hover:bg-indigo-700 transition duration-300 text-lg font-semibold"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
          <div className="col-span-full grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center content-center">        
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 w-full max-w-sm"
              >
                <div className="relative">
                  <img
                    src={item.cover}
                    alt={item.title}
                    className="w-full h-64 object-contain mb-4 rounded-lg"
                  />
                  <div className="absolute top-0 left-0 bg-indigo-600 text-white px-3 py-1 rounded-br-lg">
                    {durationLabels[item.duration]}
                  </div>
                  <h2 className="text-xl font-bold text-white mb-2">
                    {item.title}
                  </h2>
                  <h3 className="text-md text-gray-300 mb-3">{item.author}</h3>
                  <p className="text-lg text-yellow-300 font-semibold mb-4">
                    {item.price}
                  </p>
                  <div className="flex flex-col gap-3">
                    <Link to={`/book/${item.id}`} className="w-full">
                      <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-full hover:bg-indigo-700 transition duration-300 flex items-center justify-center">
                        <FaBook className="mr-2" /> View Details
                      </button>
                    </Link>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="w-full bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600 transition duration-300 flex items-center justify-center"
                    >
                      <FaTrash className="mr-2" /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          </div>
        )}
        {cartItems.length > 0 && (
          <div className="mt-12 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
            <p className="text-3xl font-bold text-yellow-400 mb-6">
              Total: ₹{totalPrice}
            </p>
            <button className="w-full bg-green-500 text-white py-4 px-8 rounded-full hover:bg-green-600 transition duration-300 text-xl font-semibold">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default Cart;

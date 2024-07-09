import React, { useState, useEffect, useMemo } from "react";
import { getCartItems, removeFromCart } from "../utils/localStorage";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

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
        // Remove non-numeric characters from the price string before parsing
        const numericPrice = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
        return total + numericPrice;
      }, 0)
      .toFixed(2);
  }, [cartItems]);

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Your Cart
      </h2>
      {cartItems.length === 0 ? (
        <div className="text-center text-gray-600 text-xl">
          <p>Your cart is empty</p>
          <p className="mt-4">
            Start browsing our collection and add some books!
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 text-center">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
            >
              <img
                src={item.cover}
                alt={item.title}
                className="w-full h-48 object-contain"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-2">{item.author}</p>
                <p className="text-indigo-600 font-medium mb-2">
                  {`Duration: ${durationLabels[item.duration]}`}
                </p>
                <p className="text-green-600 font-bold mb-4">{`Price: ${item.price}`}</p>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-300"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {cartItems.length > 0 && (
        <div className="mt-8 text-right">
          <p className="text-2xl font-bold text-gray-800">
            Total: ${totalPrice}
          </p>
          <button className="mt-4 bg-green-500 text-white py-3 px-6 rounded-md hover:bg-green-600 transition duration-300">
            Proceed to Checkout
          </button>
        </div>
      )}
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default Cart;

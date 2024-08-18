import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";
import { getCartItems } from "../utils/localStorage";
import { axiosInstance } from "../api/axiosConfig";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
const Checkout: React.FC = () => {
  const location = useLocation();
  const cartItems = getCartItems();

  useEffect(() => {
    const handleCheckout = async () => {
      const stripe = await stripePromise;
      const response = await axiosInstance.post("/checkout", {
        items: cartItems,
      });
      const session = response.data;
      
      const result = await stripe?.redirectToCheckout({
        sessionId: session.id,
      });
      if (result?.error) {
        console.log(result.error.message);
      }
    };

    if (location.pathname === "/checkout") {
      handleCheckout();
    }
  }, [location, cartItems]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 py-12 text-white text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8">Redirecting to Checkout...</h2>
        <p className="text-lg">Please wait while we prepare your order.</p>
      </div>
    </div>
  );
};

export default Checkout;

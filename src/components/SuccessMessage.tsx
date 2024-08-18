import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const Success = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center min-h-96 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
        <p className="text-gray-600 mb-4">Thank you for your purchase. Your order has been confirmed.</p>
        <button onClick={()=>navigate("/mybooks")} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300">
          View Order Details
        </button>
      </div>
    </div>
  );
};

export default Success;
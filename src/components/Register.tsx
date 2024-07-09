import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  validateName,
  validateEmail,
  validatePassword,
} from "../utils/validation.ts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { registerWithEmail, loginWithGoogle, loading, error } = useAuth()!;
  const [errors, setErrors] = useState<string | null>(null);

  useEffect(() => {
    if (error) {
      setErrors(error);
      console.log(error,errors);

    }
    
  }, [error]);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (nameError || emailError || passwordError) {
      toast.error(nameError || emailError || passwordError, {
        position: "top-center",
      });
      return;
    }
    await registerWithEmail(email, password);
    if (errors) {
      toast.error(errors, { position: "top-center" });
    } else {
      toast.success("Registration successful!", { position: "top-center" });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-md relative z-10"
      >
        <h2 className="text-3xl mb-4 text-center font-bold text-gray-800">
          Sign Up
        </h2>
        <p className="text-center mb-6 text-gray-600">
          Sign Up to unlock exciting experience with our services.
        </p>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full p-3 bg-blue-500 text-white rounded-lg mb-2 hover:bg-blue-600 transition duration-300"
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>
        <h1 className="w-full text-center mb-2 text-gray-600">OR</h1>
        <button
          type="button"
          onClick={async () => {
            await loginWithGoogle();
            if (error) {
              toast.error(error, { position: "top-center" });
            } else {
              toast.success("Login with Google successful!", {
                position: "top-center",
              });
              setTimeout(() => {
                navigate("/dashboard");
              }, 2000);
            }
          }}
          className="w-full p-3 bg-red-500 text-white rounded-lg mb-4 hover:bg-red-600 transition duration-300"
          disabled={loading}
        >
          {loading ? "Loading..." : "Signup with Google"}
        </button>
        <div>
          <p className="text-center text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Login now
            </a>
          </p>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Register;
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { validateCredentiall } from "../utils/validation.ts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const { loginWithEmail, loginWithGoogle, error } = useAuth()!;
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const validateLogin = await validateCredentiall(email, password);
    if (validateLogin != null) {
      toast.error(validateLogin, { position: "top-center" });
    } else {
      await loginWithEmail(email, password);
      if (error) {
        toast.error(error, { position: "top-center" });
      } else {
        toast.success("Login successful!", { position: "top-center" });
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-500 to-blue-600 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-md relative z-10"
      >
        <h2 className="text-3xl mb-4 text-center font-bold text-gray-800">
          Login
        </h2>
        <p className="text-center mb-6 text-gray-600">
          Login to access your account.
        </p>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          type="submit"
          className="w-full p-3 bg-green-500 text-white rounded-lg mb-4 hover:bg-green-600 transition duration-300"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <h1 className="w-full text-center mb-4 text-gray-600">OR</h1>
        <button
          type="button"
          onClick={async () => {
            setLoading(true);
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
          {loading ? "Loading..." : "Login with Google"}
        </button>
        <p className="text-center text-sm mb-4 text-gray-600">
          By continuing you agree to our{" "}
          <a href="" className="text-green-500 hover:underline">
            Terms & Conditions
          </a>{" "}
          and{" "}
          <a href="" className="text-green-500 hover:underline">
            Privacy Policy
          </a>
          .
        </p>
        <div>
          <p className="text-center text-gray-600">
            Don't have an account?{" "}
            <a href="/register" className="text-green-500 hover:underline">
              Sign Up now
            </a>
          </p>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;

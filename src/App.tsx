import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout.tsx";
import BookPage from "./components/BookPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MyBooks from "./components/MyBooks";
import Profile from "./components/Profile";
import Success from "./components/SuccessMessage";
import ScrollToTop from "./components/ScrollToTop";

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Navbar onSearch={handleSearch} />
          <div className="flex-grow">
            <Routes>
              <Route
                path="/"
                element={<Dashboard searchQuery={searchQuery} />}
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/book/:id" element={<BookPage />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/success" element={<Success />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/mybooks" element={<MyBooks />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
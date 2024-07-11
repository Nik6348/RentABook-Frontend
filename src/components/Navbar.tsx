import React, { useState, useEffect } from "react";
import { FaUser, FaShoppingCart, FaSearch, FaBars, FaTimes, FaBook } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface NavbarProps {
  onSearch: (searchQuery: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const toggleMenu = () => setShowMenu(!showMenu);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 bg-gradient-to-r from-purple-800 via-indigo-700 to-purple-800 text-white shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="text-3xl font-bold cursor-pointer flex items-center"
                onClick={() => navigate("/")}
              >
                <FaBook className="mr-2 text-pink-300" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-indigo-300">
                  RentABook
                </span>
              </motion.span>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <input
                  type="text"
                  className="w-72 p-3 pl-12 rounded-full text-gray-900 bg-white bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-pink-400 transition duration-300"
                  placeholder="Search books..."
                  value={searchQuery}
                  onChange={handleSearch}
                />
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="text-white hover:bg-purple-700 hover:text-pink-300 px-4 py-3 rounded-full text-sm font-medium transition duration-300"
                onClick={() => navigate("/profile")}
              >
                <FaUser className="inline-block mr-2" />
                Profile
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="text-white hover:bg-purple-700 hover:text-pink-300 px-4 py-3 rounded-full text-sm font-medium transition duration-300"
                onClick={() => navigate("/cart")}
              >
                <FaShoppingCart className="inline-block mr-2" />
                Cart
              </motion.button>
            </div>
          </div>
          <div className="md:hidden">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-3 rounded-full text-white hover:text-pink-300 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-purple-800 focus:ring-white transition duration-300"
            >
              {showMenu ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </motion.button>
          </div>
        </div>
      </div>
      {isMobile && showMenu && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-purple-900 bg-opacity-95 backdrop-filter backdrop-blur-lg"
        >
          <div className="px-4 pt-4 pb-6 space-y-4">
            <input
              type="text"
              className="w-full p-3 rounded-full text-gray-900 bg-white bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-pink-400 transition duration-300"
              placeholder="Search books..."
              value={searchQuery}
              onChange={handleSearch}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="text-white hover:bg-purple-700 hover:text-pink-300 block px-4 py-3 rounded-full text-base font-medium w-full text-left transition duration-300"
              onClick={() => {
                navigate("/profile");
                setShowMenu(false);
              }}
            >
              <FaUser className="inline-block mr-3" />
              Profile
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="text-white hover:bg-purple-700 hover:text-pink-300 block px-4 py-3 rounded-full text-base font-medium w-full text-left transition duration-300"
              onClick={() => {
                navigate("/cart");
                setShowMenu(false);
              }}
            >
              <FaShoppingCart className="inline-block mr-3" />
              Cart
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
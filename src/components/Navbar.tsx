import React, { useState } from "react";
import { FaUser, FaShoppingCart, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  onSearch: (searchQuery: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav className="flex justify-between items-center p-3 bg-zinc-100 text-zinc-500">
      <div
        className="text-xl font-bold cursor-pointer hover:text-zinc-700"
        onClick={() => navigate("/")}
      >
        RentABook
      </div>

      <div className="flex items-center">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            className="w-full p-2 pr-10 pl-4 rounded-md border-2 bg-zinc-200 focus:border-black-500 focus:outline-none"
            placeholder="Search by title or author"
            value={searchQuery}
            onChange={handleSearch}
          />
          <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer hover:text-zinc-700" />
        </div>
      </div>

      <div className="flex items-center relative">
        <FaUser
          className="mx-2 cursor-pointer hover:text-zinc-700"
          onClick={toggleMenu}
        />
        {showMenu && (
          <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden transform origin-top-right transition-all duration-200 ease-out">
            <ul className="divide-y divide-gray-100">
              {[
                { label: "Profile Details", path: "/profile" },
                { label: "My Books", path: "/mybooks" },
                { label: "Logout", path: "/login" },
              ].map((item, index) => (
                <li key={index}>
                  <button
                    className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition duration-150 ease-in-out"
                    onClick={() => {
                      navigate(item.path);
                      setShowMenu(false);
                    }}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        <FaShoppingCart
          className="mx-2 cursor-pointer hover:text-zinc-700"
          onClick={() => navigate("/cart")}
        />
      </div>
    </nav>
  );
};

export default Navbar;

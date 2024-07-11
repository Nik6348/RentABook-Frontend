import React, { useState } from "react";
import { FaUserCircle, FaEdit, FaBook, FaSignOutAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const [name, setName] = useState("Nikhil Rajput");
  const [email, setEmail] = useState("rajputnik911@gmail.com");
  const [photo, setPhoto] = useState<string | null>(
    "https://avatars.githubusercontent.com/u/150193253?v=4"
  );

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhoto(e.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSave = () => {
    // Implement save logic here
    setIsEditing(false);
  };

  const handleLogout = () => {
    // Implement logout logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4 sm:p-6 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl bg-white rounded-2xl overflow-hidden shadow-2xl"
      >
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-8 sm:p-10 text-center relative overflow-hidden">
          <div className="relative inline-block mb-6">
            {photo ? (
              <img
                src={photo}
                alt="Profile"
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-full mx-auto object-cover border-4 border-white shadow-lg"
              />
            ) : (
              <FaUserCircle className="mx-auto text-white text-8xl sm:text-9xl" />
            )}
            {isEditing && (
              <label
                htmlFor="photo-upload"
                className="absolute bottom-0 right-0 bg-white rounded-full p-2 cursor-pointer shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <FaEdit className="text-purple-600" />
                <input
                  id="photo-upload"
                  type="file"
                  className="hidden"
                  onChange={handlePhotoUpload}
                  accept="image/*"
                />
              </label>
            )}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">{name}</h2>
          <p className="text-indigo-200 text-lg">{email}</p>
        </div>
        <div className="p-6 sm:p-8">
          {isEditing ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <input
                className="w-full p-3 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition duration-300"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              />
              <input
                className="w-full p-3 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition duration-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-2"
            >
              <p className="text-gray-700 text-lg">
                <strong>Name:</strong> {name}
              </p>
              <p className="text-gray-700 text-lg">
                <strong>Email:</strong> {email}
              </p>
            </motion.div>
          )}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition duration-300 flex items-center text-lg font-semibold shadow-md hover:shadow-lg"
              onClick={isEditing ? handleSave : () => setIsEditing(true)}
            >
              <FaEdit className="mr-2" />
              {isEditing ? "Save Profile" : "Edit Profile"}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition duration-300 flex items-center text-lg font-semibold shadow-md hover:shadow-lg"
              onClick={() => navigate("/mybooks")}
            >
              <FaBook className="mr-2" />
              My Books
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 transition duration-300 flex items-center text-lg font-semibold shadow-md hover:shadow-lg"
              onClick={handleLogout}
            >
              <FaSignOutAlt className="mr-2" />
              Logout
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
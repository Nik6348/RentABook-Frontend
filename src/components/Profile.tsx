import React, { useState } from "react";
import { FaUserCircle, FaEdit } from "react-icons/fa";

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("Nikhil Rajput");
  const [email, setEmail] = useState("rajputnik911@gmail.com");

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-center">
          <FaUserCircle className="mx-auto text-white text-6xl mb-2" />
          <h2 className="text-3xl font-bold text-white">Profile Details</h2>
        </div>
        <div className="p-6">
          {isEditing ? (
            <>
              <input
                className="w-full p-2 mb-4 border rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="w-full p-2 mb-4 border rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </>
          ) : (
            <>
              <p className="text-gray-700 mb-2">Name: {name}</p>
              <p className="text-gray-700">Email: {email}</p>
            </>
          )}
          <button
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 flex items-center"
            onClick={() => setIsEditing(!isEditing)}
          >
            <FaEdit className="mr-2" />
            {isEditing ? "Save" : "Edit Profile"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
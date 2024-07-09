import React from "react";

const Profile: React.FC = () => {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Profile Details
      </h2>
      {/* Add profile details content here */}
      <div className="bg-white p-4 rounded shadow-md">
        <p className="text-gray-600">Name: John Doe</p>
        <p className="text-gray-600">Email: john.doe@example.com</p>
        {/* Add more profile details as needed */}
      </div>
    </div>
  );
};

export default Profile;

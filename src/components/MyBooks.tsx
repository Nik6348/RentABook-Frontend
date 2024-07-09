import React from "react";

const MyBooks: React.FC = () => {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        My Books
      </h2>
      {/* Add list of borrowed books here */}
      <div className="bg-white p-4 rounded shadow-md">
        <p className="text-gray-600">No books borrowed yet.</p>
        {/* Display a list of books if any */}
      </div>
    </div>
  );
};

export default MyBooks;

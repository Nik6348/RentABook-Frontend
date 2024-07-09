import React from 'react';
import BookDetails from './BookDetails';

const BookPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <BookDetails />
    </div>
  );
};

export default BookPage;

import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-zinc-100 text-zinc-800 text-center p-4">
      <div className="flex justify-center space-x-4">
        <a href="/terms" className="hover:underline">Terms of Service</a>
        <a href="/privacy" className="hover:underline">Privacy Policy</a>
        <a href="/contact" className="hover:underline">Contact Us</a>
      </div>
    </footer>
  );
};

export default Footer;

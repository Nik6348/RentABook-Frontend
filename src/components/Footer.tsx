import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaBook, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-800 to-indigo-800 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h3 className="text-3xl font-bold mb-4 flex items-center">
              <FaBook className="mr-2 text-pink-300" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-indigo-300">RentABook</span>
            </h3>
            <p className="text-sm text-gray-300">Your digital library, anytime, anywhere.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <h4 className="text-lg font-semibold mb-4 border-b border-purple-600 pb-2">Quick Links</h4>
            <ul className="text-sm space-y-2">
              <li><a href="/" className="hover:text-pink-300 transition duration-300 flex items-center"><FaBook className="mr-2" />Home</a></li>
              <li><a href="/" className="hover:text-pink-300 transition duration-300 flex items-center"><FaBook className="mr-2" />About</a></li>
              <li><a href="/" className="hover:text-pink-300 transition duration-300 flex items-center"><FaBook className="mr-2" />Contact</a></li>
            </ul>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <h4 className="text-lg font-semibold mb-4 border-b border-purple-600 pb-2">Contact Us</h4>
            <p className="text-sm mb-2 flex items-center"><FaMapMarkerAlt className="mr-2 text-pink-300" />123 Book Street, Reading City</p>
            <p className="text-sm mb-2 flex items-center"><FaEnvelope className="mr-2 text-pink-300" />info@rentabook.com</p>
            <p className="text-sm flex items-center"><FaPhone className="mr-2 text-pink-300" />+91-7049496534</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
            <h4 className="text-lg font-semibold mb-4 border-b border-purple-600 pb-2">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-pink-300 transition duration-300"><FaFacebook size={24} /></a>
              <a href="#" className="text-white hover:text-pink-300 transition duration-300"><FaTwitter size={24} /></a>
              <a href="#" className="text-white hover:text-pink-300 transition duration-300"><FaInstagram size={24} /></a>
              <a href="#" className="text-white hover:text-pink-300 transition duration-300"><FaLinkedin size={24} /></a>
            </div>
          </motion.div>
        </div>
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.5, delay: 0.4 }}
          className="border-t border-purple-700 mt-8 pt-6 text-center text-sm"
        >
          <p>&copy; 2023 RentABook. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
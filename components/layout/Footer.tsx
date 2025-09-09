
import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 text-gray-600 border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
          <div>
            <h3 className="font-bold text-lg mb-4 text-gray-800">DateMatch</h3>
            <p className="text-sm">Trusted by millions to find their perfect match. We are committed to helping you find the love of your life.</p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4 text-gray-800">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-[#e42525]">Home</Link></li>
              <li><Link to="/search" className="hover:text-[#e42525]">Search</Link></li>
              <li><Link to="/payment" className="hover:text-[#e42525]">Upgrade</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4 text-gray-800">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-[#e42525]">About Us</a></li>
              <li><a href="#" className="hover:text-[#e42525]">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#e42525]">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-[#e42525]">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4 text-gray-800">Follow Us</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors"><FaFacebook size={24} /></a>
              <a href="#" className="text-gray-500 hover:text-blue-400 transition-colors"><FaTwitter size={24} /></a>
              <a href="#" className="text-gray-500 hover:text-pink-500 transition-colors"><FaInstagram size={24} /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-gray-200 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} DateMatch. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

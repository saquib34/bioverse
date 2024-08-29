import React from "react";
import { FaFacebookF, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="w-full bg-[#232323] text-white py-8 px-4 md:py-12 md:px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between items-start">
        <div className="flex flex-col items-start space-y-4 md:space-y-6 mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold">LOGO</h1>
          <div className="flex space-x-4 md:space-x-6">
            <FaFacebookF className="text-2xl md:text-3xl cursor-pointer hover:text-gray-400" />
            <FaYoutube className="text-2xl md:text-3xl cursor-pointer hover:text-gray-400" />
            <FaXTwitter className="text-2xl md:text-3xl cursor-pointer hover:text-gray-400" />
          </div>
        </div>
        
        <nav className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-24 mb-8 md:mb-0">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">Impact</h2>
            <ul className="space-y-2 md:space-y-3 text-base md:text-lg">
              <li className="hover:text-gray-400 cursor-pointer">Home</li>
              <li className="hover:text-gray-400 cursor-pointer">About</li>
              <li className="hover:text-gray-400 cursor-pointer">FAQ</li>
              <li className="hover:text-gray-400 cursor-pointer">Team</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">Downloads</h2>
            <ul className="text-base md:text-lg">
              <li className="hover:text-gray-400 cursor-pointer">Brochure</li>
            </ul>
          </div>
        </nav>
        
        <a href=""><button className="bg-gray-700 text-white px-6 py-2 md:px-8 md:py-3 rounded-full text-lg md:text-xl hover:bg-gray-600 transition-colors duration-300 mt-4 md:mt-0">
          Register Now/Login
          
        </button></a>
      </div>
    </footer>
  );
};

export default Footer;



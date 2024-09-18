import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-transparent text-white p-4 z-20">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold">BioVerse</div>
          
          {/* Hamburger menu button */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="lg:hidden focus:outline-none bg-transparent"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>

          {/* Desktop menu */}
          <div className="hidden lg:flex space-x-4">
            <Link to="/" className="hover:text-purple-300 text-white px-3 py-2">Home</Link>
            <Link to="/contactUs" className="hover:text-purple-300 text-white px-3 py-2">Contact Us</Link>
            <Link to="/login" className="hover:text-purple-300 text-white px-3 py-2"> Login</Link>

          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="lg:hidden mt-4 bg-purple-900 bg-opacity-75 rounded-lg p-2">
            <Link to="/" className="block py-2 px-4 hover:text-purple-300 text-white" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/contactUs" className="block py-2 px-4 hover:text-purple-300 text-white" onClick={() => setIsOpen(false)}>Contact Us</Link>
            <Link to="/login" className="block py-2 px-4 hover:text-purple-300 text-white" onClick={() => setIsOpen(false)}>Login Us</Link>

          </div>
        )}
      </div>
    </nav>
  );
};

export default LoginNavbar;
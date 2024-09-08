import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };
  const scrollToAbout = (e) => {
    e.preventDefault();
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };
  return (
    <div className="relative z-50">
      <nav className="bg-gray-100 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex flex-col items-center">
            <img src="/group-37337 copy.svg" alt="Logo" className="h-8 w-auto" />
            <span className="text-white text-sm mt-1 pl-7">2024</span>
          </div>
          <button onClick={toggleMenu} className="text-black bg-black p-1 rounded">
            {isMenuOpen ? <X size={24} color="white" /> : <Menu size={24} color="white" />}
          </button>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-black p-4">
          <a href="/" onClick={(e) => { e.preventDefault(); handleLinkClick('/'); }} className="block py-2 text-white hover:underline">Home</a>
          <a href="#about" onClick={scrollToAbout} className="block py-2 text-white hover:underline">About</a>
          <a href="/contactus" onClick={(e) => { e.preventDefault(); handleLinkClick('/contactus'); }} className="block py-2 text-white hover:underline">Contact Us</a>
          <a href="/login" onClick={(e) => { e.preventDefault(); handleLinkClick('/login'); }} className="block py-2 text-white hover:underline">Register/Login</a>
        </div>
      )}
    </div>
  );
};

export default Navbar;
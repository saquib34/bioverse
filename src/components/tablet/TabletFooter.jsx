import React from "react";
import { useNavigate } from "react-router-dom";

const TabletFooter = () => {
  const navigate = useNavigate();
  const onButtonContainerClick = () => {
    navigate("/login");
  };

  return (
    <footer className="w-auto  py-12 px-8 overflow-hidden text-white bg-inherit">
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover opacity-20"
          alt=""
          src="/group-2821.svg"
        />
      </div>
      
      <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start justify-between max-w-7xl mx-auto">
        <div className="mb-10 lg:mb-0 text-center lg:text-left">
          <img
            className="w-40 h-auto mb-8 mx-auto lg:mx-0"
            alt="Logo"
            src="/group-37340.svg"
          />
          <button
            className="bg-gray-500 text-white rounded-full py-3 px-6 text-lg font-semibold hover:bg-gray-600 transition-colors"
            onClick={onButtonContainerClick}
          >
            Register Now/Login
          </button>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-12 mb-10 lg:mb-0">
          <div className="flex flex-col items-center lg:items-start">
            <b className="mb-4 text-xl">Impact</b>
            <a href="#" className="text-current no-underline hover:underline mb-3 text-lg">Home</a>
            <a href="#" className="text-current no-underline hover:underline mb-3 text-lg">About</a>
            <a href="#" className="text-current no-underline hover:underline mb-3 text-lg">FAQ</a>
            <a href="#" className="text-current no-underline hover:underline mb-3 text-lg">Team</a>
            <a href="/contactus" className="text-current no-underline hover:underline mb-3 text-lg">Contact</a>
          </div>
          
          <div className="flex flex-col items-center lg:items-start">
            <b className="mb-4 text-xl">Downloads</b>
            <a href="#" className="text-current no-underline hover:underline mb-3 text-lg">Brochure</a>
          </div>
        </div>
        
        <div className="text-center lg:text-right">
          <img
            className="w-32 h-auto mx-auto lg:ml-auto"
            alt="Frame"
            src="/frame-3@2x.png"
          />
        </div>
      </div>
    </footer>
  );
};

export default TabletFooter;
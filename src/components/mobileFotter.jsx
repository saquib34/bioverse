import React from "react";

const MobileFooter = () => {
  const onButtonContainerClick = () => {
    console.log("Button Container Clicked");
  };

  return (
    <div className="absolute top-[5200px] bg-gray-400 w-full py-8 px-4 overflow-hidden text-white">
      <img
        className="absolute h-full w-full top-0 left-0 object-cover opacity-20"
        alt=""
        src="/group-2821.svg"
      />
      
      <div className="relative z-10 flex flex-col items-center">
        <img
          className="w-32 h-auto mb-6"
          alt="Logo"
          src="/group-37340.svg"
        />
        
        <div className="flex flex-wrap justify-center gap-8 mb-6 text-sm">
          <div className="flex flex-col items-center">
            <b className="mb-2">Impact</b>
            <a href="#" className="hover:underline">Home</a>
            <a href="#" className="hover:underline">About</a>
            <a href="#" className="hover:underline">FAQ</a>
            <a href="#" className="hover:underline">Team</a>
          </div>
          
          <div className="flex flex-col items-center">
            <b className="mb-2">Downloads</b>
            <a href="#" className="hover:underline">Broucher</a>
          </div>
        </div>
        
        <button
          className="bg-gray-500 text-white rounded-full py-2 px-4 text-sm font-semibold hover:bg-gray-600 transition-colors"
          onClick={onButtonContainerClick}
        >
          Register Now/Login
        </button>
        
        <img
          className="w-24 h-auto mt-6"
          alt="Frame"
          src="/frame-3@2x.png"
        />
      </div>
    </div>
  );
};

export default MobileFooter;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const MobileFooter = () => {
  const navigate = useNavigate();
  const [bottomLogoError, setBottomLogoError] = useState(false);

  const onButtonContainerClick = () => {
    navigate("/event-selection");
  };

  const handleBottomLogoError = () => {
    setBottomLogoError(true);
  };

  return (
    <div className="absolute top-[4600px] bg-gray-400 w-full  px-4 overflow-hidden text-white">
      <img
        className="absolute h-full w-full  -top-2 left-0 object-cover opacity-20"
        alt=""
        src="/group-2821.svg"
      />
      
      <div className="relative z-10 flex flex-col items-center">
        <img
          className="w-32 h-auto"
          alt="Logo"
          src="/group-37340.svg"
        />
                <img
            className="w-32 h-auto"
            alt="Additional Image 3"
            src="/frame-3@2x.png"
          />
        
        <div className="flex flex-wrap justify-center gap-3  text-sm">
          <FooterColumn title="Impact" links={[
            { text: "Home", href: "#" },
            { text: "About", href: "#" },
            { text: "FAQ", href: "#" },
            { text: "Team", href: "#" },
            { text: "Contact", href: "/contactus" }
          ]} />
          <FooterColumn title="Downloads" links={[
            { text: "Brochure", href: "#" }
          ]} />
        </div>
        
        <button
          className="bg-gray-500 text-white rounded-full py-2 px-4 text-sm font-semibold hover:bg-gray-600 transition-colors "
          onClick={onButtonContainerClick}
        >
          Register Now/Login
        </button>

        {/* Add new images here */}
        <div className="">

  
        </div>

      </div>
    </div>
  );
};

const FooterColumn = ({ title, links }) => (
  <div className="flex flex-col items-center">
    <b className="mb-2">{title}</b>
    {links.map((link, index) => (
      <a key={index} href={link.href} className="text-current no-underline hover:underline">
        {link.text}
      </a>
    ))}
  </div>
);

export default MobileFooter;
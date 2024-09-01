import React, { useState } from "react";

const MobileSponsors = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="relative w-full top-[1905px] text-right text-base">
      {[0, 1, 2, 3].map((index) => (
        <div key={index} className="mb-8 last:mb-0">
          <div 
            className="relative left-[-100px]"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <img
              className="w-[200px] h-[200px] object-contain rounded-2xl shadow-[0px_2.4120004177093506px_7.24px_rgba(19,_18,_66,_0.07)]"
              alt=""
              src="/logo@2x.png"
            />
            {hoveredIndex === index && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-2xl transition-opacity duration-300">
                <div className="py-2 px-4 rounded-full bg-gray-400 text-white flex items-center">
                  <div className="mr-2">LEARN MORE</div>
                  <img
                    className="w-4 h-4"
                    alt=""
                    src="/fluentmdl2up.svg"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default MobileSponsors;
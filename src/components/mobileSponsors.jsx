import React, { useState } from "react";


const MobileSponsors = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="relative top-[1905px] w-full px-4 py-8 bg-gray-100">
      <div className="grid grid-cols-2 gap-6 md:grid-cols-2 pr-7 lg:grid-cols-3">
        {[0, 1, 2, 3].map((index) => (
          <div
            key={index}
            className="relative"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <img
              className="w-full h-auto object-contain rounded-2xl shadow-md"
              alt=""
              src="/logo@2x.png"
            />
            {hoveredIndex === index && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-2xl transition-opacity duration-300">
                <div className="py-2 px-4 rounded-full bg-gray-400 text-white flex items-center">
                  <div className="mr-2">LEARN MORE</div>
                  <img className="w-4 h-4" alt="" src="/fluentmdl2up.svg" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileSponsors;

import React, { useState } from "react";

const TabletSponsors = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="relative px-4 py-8 mt-[1940px] bg-gray-100">
      <div className="grid grid-cols-2 gap-8 sm:gap-12 md:gap-16 lg:gap-20">
        {[0, 1, 2, 3].map((index) => (
          <div
            key={index}
            className="relative flex justify-center"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <img
              className="w-full h-auto max-w-[150px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px] object-contain rounded-2xl shadow-md transition-transform duration-300 hover:scale-105"
              alt=""
              src="/logo@2x.png"
            />
            {hoveredIndex === index && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-2xl transition-opacity duration-300">
                <div className="py-2 px-4 rounded-full bg-gray-400 text-white flex items-center text-xs sm:text-sm">
                  <div className="mr-2">LEARN MORE</div>
                  <img className="w-3 h-3 sm:w-4 sm:h-4" alt="" src="/fluentmdl2up.svg" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabletSponsors;
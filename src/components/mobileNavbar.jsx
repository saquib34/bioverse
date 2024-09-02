import React, { useState } from "react";

const MobileNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClick = () => {
    // console.log$&
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bg-gray-200 h-[100px] overflow-hidden text-left font-barlow z-50">
      <div className="absolute h-3/4 w-auto top-[12.86%] right-[66.14%] bottom-[12.14%] left-[4.42%] scale-125 transform origin-left">
          <img
            className="absolute h-[96.95%] w-[38.23%] top-[0%] right-[53.21%] bottom-[3.05%] left-[8.56%] max-w-full overflow-hidden max-h-full object-cover"
            alt=""
            src="/rectangle@2x.png"
          />
          <img
            className="absolute h-[12.76%] w-[4.82%] top-[65.43%] right-[80.89%] bottom-[21.8%] left-[14.29%] max-w-full overflow-hidden max-h-full"
            alt=""
            src="/vector.svg"
          />
          <img
            className="absolute h-[30.1%] w-[18.72%] top-[54.11%] right-[58.47%] bottom-[15.79%] left-[22.81%] max-w-full overflow-hidden max-h-full"
            alt=""
            src="/vector1.svg"
          />
          <img
            className="absolute h-[8.38%] w-[3.4%] top-[20.68%] right-[61.02%] bottom-[70.94%] left-[35.58%] max-w-full overflow-hidden max-h-full"
            alt=""
            src="/vector2.svg"
          />
          <img
            className="absolute h-[15.24%] w-[16.82%] top-[13.84%] right-[67.97%] bottom-[70.92%] left-[15.2%] max-w-full overflow-hidden max-h-full"
            alt=""
            src="/vector3.svg"
          />
          <img
            className="absolute h-[8.95%] w-[5.29%] top-[49.01%] right-[92.06%] bottom-[42.04%] left-[2.65%] max-w-full overflow-hidden max-h-full"
            alt=""
            src="/vector4.svg"
          />
          <img
            className="absolute h-[10.29%] w-[5.06%] top-[36.1%] right-[27.49%] bottom-[53.62%] left-[67.45%] max-w-full overflow-hidden max-h-full"
            alt=""
            src="/vector5.svg"
          />
          <img
            className="absolute h-[8%] w-[4.66%] top-[35.94%] right-[92.7%] bottom-[56.06%] left-[2.64%] max-w-full overflow-hidden max-h-full"
            alt=""
            src="/vector6.svg"
          />
          <img
            className="absolute h-[6.29%] w-[2.61%] top-[76.64%] right-[77.66%] bottom-[17.07%] left-[19.74%] max-w-full overflow-hidden max-h-full"
            alt=""
            src="/vector7.svg"
          />
          <img
            className="absolute h-[32.76%] w-[2.61%] top-[30.58%] right-[84.72%] bottom-[36.66%] left-[12.68%] max-w-full overflow-hidden max-h-full"
            alt=""
            src="/vector8.svg"
          />
          <img
            className="absolute h-[5.52%] w-[2.29%] top-[87.51%] right-[78.89%] bottom-[6.97%] left-[18.82%] max-w-full overflow-hidden max-h-full"
            alt=""
            src="/vector9.svg"
          />
          <img
            className="absolute h-[6.29%] w-[2.61%] top-[65.95%] right-[78.86%] bottom-[27.76%] left-[18.53%] max-w-full overflow-hidden max-h-full"
            alt=""
            src="/vector10.svg"
          />
          <img
            className="absolute h-[4.76%] w-[1.97%] top-[95.33%] right-[82.26%] bottom-[-0.09%] left-[15.77%] max-w-full overflow-hidden max-h-full"
            alt=""
            src="/vector11.svg"
          />
          <img
            className="absolute h-[32.76%] w-[10.58%] top-[30.58%] right-[89.42%] bottom-[36.66%] left-[0%] max-w-full overflow-hidden max-h-full"
            alt=""
            src="/vector12.svg"
          />
          <img
            className="absolute h-[6.86%] w-[2.84%] top-[16.35%] right-[64.89%] bottom-[76.79%] left-[32.26%] max-w-full overflow-hidden max-h-full"
            alt=""
            src="/vector13.svg"
          />
          <img
            className="absolute h-[7.81%] w-[3.16%] top-[5.06%] right-[64.92%] bottom-[87.13%] left-[31.93%] max-w-full overflow-hidden max-h-full"
            alt=""
            src="/vector14.svg"
          />
          <img
            className="absolute h-[7.43%] w-[8.53%] top-[27.37%] right-[63.36%] bottom-[65.2%] left-[28.11%] max-w-full overflow-hidden max-h-full"
            alt=""
            src="/vector15.svg"
          />
          <img
            className="absolute h-[8.19%] w-[11.77%] top-[54.91%] right-[71.46%] bottom-[36.9%] left-[16.77%] max-w-full overflow-hidden max-h-full"
            alt=""
            src="/vector16.svg"
          />
          <img
            className="absolute h-[32.76%] w-[9.87%] top-[30.58%] right-[37.39%] bottom-[36.66%] left-[52.74%] max-w-full overflow-hidden max-h-full"
            alt=""
            src="/vector17.svg"
          />
          <img
            className="absolute h-[10.67%] w-[3.87%] top-[41.64%] right-[38.63%] bottom-[47.69%] left-[57.5%] max-w-full overflow-hidden max-h-full"
            alt=""
            src="/vector18.svg"
          />
          <img
            className="absolute h-[32.76%] w-[10.58%] top-[30.58%] right-[24.62%] bottom-[36.66%] left-[64.79%] max-w-full overflow-hidden max-h-full"
            alt=""
            src="/vector19.svg"
          />
          <img
            className="absolute h-[33.71%] w-[10.43%] top-[30.01%] right-[12.69%] bottom-[36.28%] left-[76.88%] max-w-full overflow-hidden max-h-full"
            alt=""
            src="/vector20.svg"
          />
          <img
            className="absolute h-[32.76%] w-[9.87%] top-[30.58%] right-[0.51%] bottom-[36.66%] left-[89.61%] max-w-full overflow-hidden max-h-full"
            alt=""
            src="/vector21.svg"
          />
          <img
            className="absolute h-[17.9%] w-[16.75%] top-[43.63%] right-[66.83%] bottom-[38.46%] left-[16.42%] max-w-full overflow-hidden max-h-full"
            alt=""
            src="/vector22.svg"
          />
          <img
            className="absolute h-[19.24%] w-[17.61%] top-[35.24%] right-[63.36%] bottom-[45.52%] left-[19.03%] max-w-full overflow-hidden max-h-full"
            alt=""
            src="/vector23.svg"
          />
          <img
            className="absolute h-[14.29%] w-[14.85%] top-[30.13%] right-[62.19%] bottom-[55.59%] left-[22.96%] max-w-full overflow-hidden max-h-full"
            alt=""
            src="/vector24.svg"
          />
          <img
            className="absolute h-[32.76%] w-[12.64%] top-[30.58%] right-[49.09%] bottom-[36.66%] left-[38.28%] max-w-full overflow-hidden max-h-full"
            alt=""
            src="/vector25.svg"
          />
          <b className="absolute top-[68.8%] left-[77.11%] text-lg">2024</b>
        </div>
        <button
          onClick={handleClick}
          data-collapse-toggle="navbar-default"
          type="button"
          className="absolute top-[calc(50%_-_25px)] right-6 w-[50px] h-[50px] inline-flex items-center justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 z-20"
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen ? 'true' : 'false'}
        >
          <img
            className="w-full h-full"
            alt="Menu"
            src="/fluentnavigation24filled.svg"
          />
        </button>
      </div>
      <div className={`fixed top-[100px] right-0 w-3/4 h-auto bg-black bg-opacity-90 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <nav className="py-6 h-full flex flex-col justify-center">
          <ul className="text-right list-none">
            <li><a href="#home" className="block px-12 py-3 text-white text-lg hover:bg-blue-700 ">Home</a></li>
            <li><a href="#about" className="block px-12 py-3 text-white text-lg hover:bg-blue-700">About</a></li>
            <li><a href="#info" className="block px-12 py-3 text-white text-lg hover:bg-blue-700">Info</a></li>
            <li><a href="#faq" className="block px-12 py-3 text-white text-lg hover:bg-blue-700">FAQ</a></li>
            <li>
              <button className="rounded-3xl bg-white text-blue-800 hover:bg-gray-200 transition-all duration-300 mt-6 w-3/4 mx-auto">
                <a href="/login" className="block px-12 py-3 text-lg">Register/Login</a>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default MobileNavbar;
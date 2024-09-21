import React from 'react';
import Navbar from './navbar';
import { useNavigate } from 'react-router-dom';


const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen  relative overflow-hidden bg-gray-100">
      {/* Background images */}
      <div className="absolute inset-0 z-0">
        {/* <img 
          src="/left.png" 
          alt="" 
          className="absolute bottom-0 left-0 right-100 w-1/2 object-cover pb-4"
        />
        <img 
          src="/right.png" 
          alt="" 
          className="absolute top-0 right-0 w-1/2 object-cover"
        /> */}

        <img
          className="absolute w-full top-[-1%]  max-w-full overflow-hidden max-h-full"
          alt=""
          src="/group-7@2x.png"
        />
      </div>

      {/* Navbar */}
      <Navbar className="z-30" />

      {/* Main content */}
      <main className="relative z-20 container mx-auto px-4 flex flex-col items-center justify-center min-h-screen">
        <div className="max-w-4xl mx-auto text-center text-white mb-16">
          <img src="/group-37337.svg" alt="BIOVERSE" className="mx-auto mb-16 w-[600px]" />
          <p className="mb-8 tracking-[-0.03em] leading-[120%] text-17xl">October 18th and 19th, 2024</p>
          <p className="text-14xl tracking-[-0.03em] leading-[120%] inline-block  mb-16 max-w-3xl mx-auto">
            "Join Us for an Epic Biohacking Journey! Collaborate with Pioneers, Push the Boundaries of Science, and Shape the Future of Biotechnology Through Unprecedented Innovation and Creative Exploration."
          </p>
          <button className="[background:linear-gradient(87.44deg,_#8b4c5e,_#863a7b_3%,_#802a91_13.5%,_#7d219e_13.51%,_#7125c5_49.5%,_#1b298f_73.5%,_#361064)] text-white px-12 py-3 rounded-18xl text-xl font-semibold hover:bg-purple-700 transition duration-300"
            onClick={() => {
              navigate("/event-selection");
            }
            }
          >
            Register Now
          </button>
        </div>
      </main>

      {/* Info Cards */}
      <div className="relative -top-20 left-auto right-auto container mx-auto items-start font-plus-jakarta-sans pb-4">
        <div className="left-auto flex flex-row items-center justify-center gap-6">
          <div className="self-stretch  w-[300px] h-30 [backdrop-filter:blur(38.06px)] rounded-[32.63px] bg-gray-200 overflow-hidden shrink-0 flex flex-col items-center justify-center  box-border">
            <div className="relative text-[28.55px] leading-[50px] font-semibold text-transparent !bg-clip-text [background:linear-gradient(90deg,_#f087ff,_#de78f8_50%,_#8935d8)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
              ₹ 100000
            </div>
            <div className="relative text-[28.55px] tracking-[0.05em] leading-[43.5px] font-outfit">
              Prize Pool
            </div>
          </div>
          <div className="self-stretch  w-[430px]  [backdrop-filter:blur(38.06px)] rounded-[32.63px] bg-gray-200 overflow-hidden shrink-0 flex flex-col items-center justify-center  box-border">
            <div className="relative text-[30.1px] leading-[50px] font-semibold text-transparent !bg-clip-text [background:linear-gradient(90deg,_#1fcff1,_#20abe1_61%,_#234db6)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
              18th and 19th
            </div>
            <div className="relative text-[28.55px] tracking-[0.05em] leading-[43.5px] font-outfit">
              October, 2024
            </div>
          </div>
          <div className="flex flex-col items-start justify-start text-left">
            <div className="self-stretch relative leading-[87px] font-semibold text-transparent !bg-clip-text [background:linear-gradient(90deg,_#19fb9b,_#128881_59.5%,_#076e68)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
              36 Hours
            </div>
            <div className="self-stretch relative text-[28.55px] tracking-[0.05em] leading-[43.5px] text-center">
              Possibilities
            </div>
          </div>
        </div>
      </div>
      <div className="relative -top-20 left-auto right-auto container mx-auto items-start font-plus-jakarta-sans pb-4">
          <div className="left-auto flex flex-row items-center justify-center gap-6">
            <div className="self-stretch  w-[270px] h-[105px] [backdrop-filter:blur(38.06px)] rounded-[32.63px] bg-gray-200 overflow-hidden shrink-0 flex flex-col items-center justify-center  box-border">
              <div className="relative  text-[28.55px] leading-[50px] font-semibold text-transparent !bg-clip-text [background:linear-gradient(90deg,_#f087ff,_#de78f8_50%,_#8935d8)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
              Paper Symposium
              </div>
     
            </div>
            <div className="self-stretch  w-[300px]  [backdrop-filter:blur(38.06px)] rounded-[32.63px] bg-gray-200 overflow-hidden shrink-0 flex flex-col items-center justify-center  box-border">
              <div className="relative text-[30.1px] leading-[50px] font-semibold text-transparent !bg-clip-text [background:linear-gradient(90deg,_#1fcff1,_#20abe1_61%,_#234db6)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
              Bio Hackathon
              </div>

            </div>
            <div className="self-stretch  w-[300px]  [backdrop-filter:blur(38.06px)] rounded-[32.63px] bg-gray-200 overflow-hidden shrink-0 flex flex-col items-center justify-center  box-border">
              <div className="relative text-[30.1px] leading-[50px] font-semibold text-transparent !bg-clip-text [background:linear-gradient(90deg,_#1fcff1,_#20abe1_61%,_#234db6)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
              Bio Conference
              </div>

            </div>
   
          </div>
        </div>

    </div>
  );
};

export default LandingPage;
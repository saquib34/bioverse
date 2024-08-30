import React from "react";
import ProgressBar from "./ProgressBar";
import bg from "../assets/bg.svg";
import bg2 from "../assets/blob.svg";
import text from "../assets/bio-verse.svg";

const Completion = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-custom-gradient px-4 sm:px-6 md:px-8 lg:px-10">
      <img
        src={bg2}
        alt=""
        className="hidden sm:block absolute -top-28 right-0 w-[300px] md:w-[500px] lg:w-[630px] h-full object-cover"
      />
      <img
        src={bg}
        alt=""
        className="hidden sm:block absolute w-full h-full object-cover"
      />
      <img
        src={text}
        alt=""
        className="absolute inset-0 w-[300px] sm:w-[500px] md:w-[800px] lg:w-[1000px] xl:w-[1400px] mx-auto top-[240px]"
      />

      <div className="relative z-10 p-6 sm:p-8 md:p-10 lg:p-12 bg-gray-300 bg-opacity-40 backdrop-blur-xs border border-gray-200 shadow-md rounded-3xl max-w-4xl w-full">
        <ProgressBar currentStep={4} />
        <h2 className="text-lg sm:text-xl md:text-2xl text-white font-bold mb-4 text-center">
          Registration Completed Successfully
        </h2>
        <p className="text-white mb-4 text-center">
          Please join the WhatsApp group for quick and regular updates.
        </p>
        <div className="flex justify-center mt-6">
          <button className="w-[80px] sm:w-[100px] p-2 bg-purple-900 text-white rounded-3xl hover:bg-purple-300 hover:text-black">
            Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Completion;

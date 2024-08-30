import React, { useState } from "react";
import ProgressBar from "./ProgressBar";
import bg from "../assets/bg.svg";
import bg2 from "../assets/blob.svg";
import text from "../assets/bio-verse.svg";

const Step3 = ({ onNext }) => {
  const [member1, setMember1] = useState({ name: "", regNumber: "" });
  const [member3, setMember3] = useState({ name: "", regNumber: "" });

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
        <ProgressBar currentStep={2} />
        <h2 className="text-xl text-white font-bold mb-4">Project Details</h2>
        <p className="font-semibold mb-4 text-center sm:text-left">
          Please fill your information so we know you registered for the event.
        </p>
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            <input
              type="text"
              value={member1.name}
              onChange={(e) =>
                setMember1({ ...member1, name: e.target.value })
              }
              placeholder="Theme / Domain of Project"
              className="flex-1 p-3 border placeholder-gray-900 placeholder:text-sm placeholder:font-semibold bg-gray-300 bg-opacity-40 backdrop-blur-xs rounded-3xl"
            />
          </div>
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            <input
              type="text"
              value={member3.name}
              onChange={(e) =>
                setMember3({ ...member3, name: e.target.value })
              }
              placeholder="Description"
              className="flex-1 h-[110px] p-3 border placeholder-gray-900 placeholder:text-sm placeholder:font-semibold bg-gray-300 bg-opacity-40 backdrop-blur-xs rounded-3xl"
            />
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <button
            onClick={onNext}
            className="w-[100px] p-2 bg-purple-900 text-white rounded-3xl hover:bg-purple-300 hover:text-black"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step3;

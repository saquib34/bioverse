import React from "react";
import ProgressBar from "./ProgressBar";
import bg from "/bg.svg";
import bg2 from "/blob.svg";
import text from "/bio-verse.svg";
import { useNavigate } from "react-router-dom";

const Completion = ({ formData, submissionStatus, errorMessage }) => {
  const navigate = useNavigate();

  const handleNext = () => {
        navigate('/login')
  };
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-custom-gradient px-4 sm:px-6 md:px-8 lg:px-10">
      {/* Background images remain the same */}
      <div className="relative z-10 p-6 sm:p-8 md:p-10 lg:p-12 bg-gray-300 bg-opacity-40 backdrop-blur-xs border border-gray-200 shadow-md rounded-3xl max-w-4xl w-full">
        <ProgressBar currentStep={3} />
        <h2 className="text-lg sm:text-xl md:text-2xl text-white font-bold mb-4 text-center">
          {submissionStatus === 'success' 
            ? "Registration Completed Successfully" 
            : submissionStatus === 'error' 
              ? "Registration Failed" 
              : "Submitting Registration..."}
        </h2>
        <p className="text-white mb-4 text-center">
          {submissionStatus === 'success' 
            ? "Thank you for registering. You recived a verfication for Email." 
            : submissionStatus === 'error' 
              ? `An error occurred: ${errorMessage}` 
              : "Please wait while we process your registration."}
        </p>
        {submissionStatus === 'success' && (
          <div className="flex justify-center mt-6">
            <button className="w-[80px] sm:w-[100px] p-2 bg-purple-900 text-white rounded-3xl hover:bg-purple-300 hover:text-black"
            onClick={(handleNext)}>
            
              Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Completion;
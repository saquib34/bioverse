// ProgressBar.jsx
import React from "react";

const ProgressBar = ({ currentStep }) => {
  const steps = ["Registration", "Team Details", "Project Details", "Completion"];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step}>
            <div className={`flex flex-col items-center ${
              index <= currentStep ? "text-purple-600" : "text-gray-400"
            }`}>
              <div className={`w-8 h-8 flex items-center justify-center rounded-full ${
                index <= currentStep ? "bg-purple-600" : "bg-gray-300"
              } text-white text-sm font-bold`}>
                {index + 1}
              </div>
              <span className="mt-2 text-xs">{step}</span>
            </div>
            {index < steps.length - 1 && (
              <div className={`flex-1 h-1 mx-2 ${
                index < currentStep ? "bg-purple-600" : "bg-gray-300"
              }`}></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
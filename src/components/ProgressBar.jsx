import React from 'react';

const ProgressBar = ({ currentStep }) => {
  const steps = ['Step 1', 'Step 2', 'Step 3', 'Completion'];
  const totalSteps = steps.length;

  return (
    <div className="relative w-full max-w-md mx-auto mb-8">
      <div className="flex items-center">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full font-medium    ${index < currentStep ? 'text-gray-200 bg-purple-900' : ' bg-gray-100'}`}
            >
              {index + 1}
            </div>
            {index < totalSteps - 1 && (
              <div
                className={`flex-1 h-1 mx-4 rounded-3xl ${index < currentStep ? 'bg-purple-900' : 'bg-gray-100'}`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;

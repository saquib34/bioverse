import React, { useCallback } from "react";
import ProgressBar from "./ProgressBar";
import bg from "/bg.svg";
import bg2 from "/blob.svg";
import text from "/bio-verse.svg";

const Step3 = ({ onNext, onPrev, onChange, formData, isSubmitting }) => {
  const handleChange = useCallback((field, value) => {
    onChange({ [field]: value });
  }, [onChange]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    await onNext();
  }, [onNext, isSubmitting]);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-custom-gradient px-4 sm:px-6 md:px-8 lg:px-10">
      <img src={bg2} alt="" className="hidden sm:block absolute -top-28 right-0 w-[300px] md:w-[500px] lg:w-[630px] h-full object-cover" />
      <img src={bg} alt="" className="hidden sm:block absolute w-full h-full object-cover" />
      <img src={text} alt="" className="absolute inset-0 w-[300px] sm:w-[500px] md:w-[800px] lg:w-[1000px] xl:w-[1400px] mx-auto top-[240px]" />

      <div className="relative z-10 p-6 sm:p-8 md:p-10 lg:p-12 bg-white bg-opacity-20 backdrop-blur-xs border border-gray-200 shadow-md rounded-3xl max-w-4xl w-full">
        <ProgressBar currentStep={2} />
        <h2 className="text-xl text-white font-bold mb-4">Project Details</h2>
        <p className="font-semibold mb-4 text-center sm:text-left text-white">Please provide information about your project.</p>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-4">
            <input
              type="text"
              value={formData.projectTheme}
              onChange={(e) => handleChange('projectTheme', e.target.value)}
              placeholder="Theme / Domain of Project"
              required
              className="flex-1 p-3 border placeholder-black placeholder:text-sm placeholder:font-semibold bg-white backdrop-blur-xs rounded-3xl"
            />
            <textarea
              value={formData.projectDescription}
              onChange={(e) => handleChange('projectDescription', e.target.value)}
              placeholder="Description"
              required
              className="flex-1 h-[110px] p-3 border placeholder-black placeholder:text-sm placeholder:font-semibold bg-white backdrop-blur-xs rounded-3xl resize-none"
            />
          </div>
          <div className="flex justify-between mt-6">
            <button 
              type="button" 
              onClick={onPrev}
              className="w-[100px] p-2 bg-gray-500 text-white rounded-3xl hover:bg-gray-600"
            >
              Previous
            </button>
            <button 
              type="submit" 
              className="w-[100px] p-2 bg-purple-900 text-white rounded-3xl hover:bg-purple-300 hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Step3;
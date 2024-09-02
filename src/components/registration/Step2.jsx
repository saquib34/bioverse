// Step2.jsx
import React, { useState } from "react";
import ProgressBar from "./ProgressBar";
import bg from "/bg.svg";
import bg2 from "/blob.svg";
import text from "/bio-verse.svg";

const Step2 = ({ onNext,onPrev , onChange, formData }) => {
  const [showPasswordField, setShowPasswordField] = useState(false);

  const handleChange = (field, value) => {
    onChange({ [field]: value });
  };

  const handleTeamLeadChange = (e) => {
    const selectedMember = e.target.value;
    handleChange('teamLeadName', selectedMember);
    setShowPasswordField(true);
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (formData.teamName && formData.teamLeadName && formData.password) {
      onNext();
    } else {
      alert("All fields are required");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-custom-gradient px-4 sm:px-6 md:px-8 lg:px-10">
      <img src={bg2} alt="" className="hidden sm:block absolute -top-28 right-0 w-[300px] md:w-[500px] lg:w-[630px] h-full object-cover" />
      <img src={bg} alt="" className="hidden sm:block absolute w-full h-full object-cover" />
      <img src={text} alt="" className="absolute inset-0 w-[300px] sm:w-[500px] md:w-[800px] lg:w-[1000px] xl:w-[1400px] mx-auto top-[240px]" />

      <div className="relative z-10 p-6 sm:p-8 md:p-10 lg:p-12 bg-white bg-opacity-40 backdrop-blur-xs border border-gray-200 shadow-md rounded-3xl max-w-4xl w-full">
        <ProgressBar currentStep={1} />
        <h2 className="text-xl text-white font-bold mb-4">Team Details</h2>
        <p className="font-semibold mb-4 text-center sm:text-left">Please fill your team information.</p>
        <form onSubmit={handleNext}>
          <div className="flex flex-col space-y-4">
            <input
              type="text"
              value={formData.teamName}
              onChange={(e) => handleChange('teamName', e.target.value)}
              placeholder="Team Name"
              required
              className="flex-1 p-3 border placeholder-black placeholder:text-sm placeholder:font-semibold bg-white backdrop-blur-xs rounded-3xl"
            />
            <select
              value={formData.teamLeadName}
              onChange={handleTeamLeadChange}
              required
              className="flex-1 p-3 border placeholder-black text-sm font-semibold bg-white backdrop-blur-xs rounded-3xl"
            >
              <option value="">Select Team Lead</option>
              <option value={formData.member1.name}>{formData.member1.name}</option>
              <option value={formData.member2.name}>{formData.member2.name}</option>
              <option value={formData.member3.name}>{formData.member3.name}</option>
            </select>
            
            {showPasswordField && (
              <input
                type="password"
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                placeholder="Create Password"
                required
                className="flex-1 p-3 border placeholder-black placeholder:text-sm placeholder:font-semibold bg-white backdrop-blur-xs rounded-3xl"
              />
            )}
          </div>
          
          <div className="flex justify-between mt-6">
            <button type="button" onClick={onPrev} className="w-[100px] p-2 bg-gray-500 text-white rounded-3xl hover:bg-gray-600">
              Previous
            </button>
            <button type="submit" className="w-[100px] p-2 bg-purple-900 text-white rounded-3xl hover:bg-purple-300 hover:text-black">
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


export default Step2;
import React, { useState, useEffect } from "react";
import { User, Mail, Phone, Hash } from "lucide-react";
import bg from "/bg.svg";
import bg2 from "/blob.svg";
import text from "/bio-verse.svg";

const Step1 = ({ onNext, onChange, formData }) => {
  const [error, setError] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [localFormData, setLocalFormData] = useState(() => {
    const initialData = {};
    for (let i = 1; i <= 5; i++) {
      initialData[`member${i}`] = { name: '', regNumber: '', email: '', mobile: '' };
    }
    return initialData;
  });

  useEffect(() => {
    onChange(localFormData);
  }, [localFormData, onChange]);

  const handleChange = (field, value) => {
    setError("");
    setLocalFormData(prevData => ({
      ...prevData,
      [`member${currentStep}`]: { ...prevData[`member${currentStep}`], [field]: value }
    }));
  };

  const checkDuplicates = () => {
    const regNumbers = Object.values(localFormData)
      .map(member => member.regNumber)
      .filter(Boolean);
    const uniqueRegNumbers = new Set(regNumbers);
    if (regNumbers.length !== uniqueRegNumbers.size) {
      setError("Duplicate registration numbers are not allowed.");
      return true;
    }
    return false;
  };

  const handleNext = (e) => {
    e.preventDefault();
    const currentMember = localFormData[`member${currentStep}`];
    if (currentMember.name && currentMember.regNumber && currentMember.email && currentMember.mobile) {
      if (currentStep < 5) {
        setCurrentStep(currentStep + 1);
      } else {
        if (checkDuplicates()) return;
        onNext();
      }
    } else {
      setError("All fields are required");
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderInputField = (field, placeholder, icon) => (
    <div className="relative">
      {icon}
      <input
        type={field === 'email' ? 'email' : field === 'mobile' ? 'tel' : 'text'}
        value={localFormData[`member${currentStep}`]?.[field] || ''}
        onChange={(e) => handleChange(field, e.target.value)}
        placeholder={placeholder}
        required
        className="w-full p-3  border placeholder-black placeholder:text-sm placeholder:font-semibold bg-white backdrop-blur-xs rounded-3xl"
      />
    </div>
  );

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-custom-gradient px-4 sm:px-6 md:px-8 lg:px-10">
      <img src={bg2} alt="" className="hidden sm:block absolute -top-28 right-0 w-[300px] md:w-[500px] lg:w-[630px] h-full object-cover" />
      <img src={bg} alt="" className="hidden sm:block absolute w-full h-full object-cover" />
      <img src={text} alt="" className="absolute inset-0 w-[300px] sm:w-[500px] md:w-[800px] lg:w-[1000px] xl:w-[1400px] mx-auto top-[240px]" />

      <div className="relative z-10 p-6 sm:p-8 md:p-10 lg:p-12 bg-white bg-opacity-40 backdrop-blur-xs border border-gray-200 shadow-md rounded-3xl max-w-4xl w-full">
        <h2 className="text-xl text-white font-bold mb-4">Registration details</h2>
        <p className="font-semibold mb-4 text-center sm:text-left">Please fill your information so we know you registered for the event.</p>
        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
        <form onSubmit={handleNext} className="space-y-6">
          <h3 className="text-white text-lg font-semibold mb-2">Member {currentStep}</h3>
          {renderInputField('name', 'Your Name', <User className="absolute -left-4 top-3 text-purple-200 bg-inherit" size={18} />)}
          {renderInputField('regNumber', 'ID/Registration Number', <Hash className="absolute -left-4 top-3 text-purple-200" size={18} />)}
          {renderInputField('email', 'E-mail ID', <Mail className="absolute -left-4 top-3 text-purple-200" size={18} />)}
          {renderInputField('mobile', 'Mobile Number', <Phone className="absolute -left-4 top-3 text-purple-200" size={18} />)}
          
          <div className="flex justify-between mt-8">
            {currentStep > 1 && (
              <button type="button" onClick={handlePrevious} className="w-[100px] p-2 bg-gray-500 text-white rounded-3xl hover:bg-gray-600">
                Previous
              </button>
            )}
            <button type="submit" className="w-[100px] p-2 bg-purple-900 text-white rounded-3xl hover:bg-purple-300 hover:text-black ml-auto">
              {currentStep === 5 ? 'Finish' : 'Next'}
            </button>
          </div>
        </form>
        <div className="mt-4 flex justify-center">
          <span className="text-white">Step {currentStep} of 5</span>
        </div>
      </div>
    </div>
  );
};

export default Step1;
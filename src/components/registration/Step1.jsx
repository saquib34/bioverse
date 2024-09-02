// Step1.jsx
import React from "react";
import ProgressBar from "./ProgressBar";
import bg from "/bg.svg";
import bg2 from "/blob.svg";
import text from "/bio-verse.svg";

const Step1 = ({ onNext, onChange, formData }) => {
  const handleChange = (member, field, value) => {
    onChange({ [member]: { ...formData[member], [field]: value } });
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (formData.member1.name && formData.member1.regNumber && formData.member1.email && formData.member1.mobile &&
        formData.member2.name && formData.member2.regNumber && formData.member2.email && formData.member2.mobile &&
        formData.member3.name && formData.member3.regNumber && formData.member3.email && formData.member3.mobile) {
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

      <div className="relative z-10 p-6 sm:p-8 md:p-10 lg:p-12 bg-white bg-opacity-40 backdrop-blur-xs border shadow-md rounded-3xl max-w-4xl w-full">
        <ProgressBar currentStep={0} />
        <h2 className="text-xl text-white font-bold mb-4">Registration details</h2>
        <p className="font-semibold mb-4 text-center sm:text-left">Please fill your information so we know you registered for the event.</p>
        <form onSubmit={handleNext}>
          <div className="flex flex-col space-y-4">
            {['member1', 'member2', 'member3'].map((member, index) => (
              <div key={member} className="flex flex-col space-y-2">
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <input
                    type="text"
                    value={formData[member].name}
                    onChange={(e) => handleChange(member, 'name', e.target.value)}
                    placeholder={`Member Name ${index + 1}`}
                    required
                    className="flex-1 p-3 border placeholder-black placeholder:text-sm placeholder:font-semibold bg-white  backdrop-blur-xs rounded-3xl"
                  />
                  <input
                    type="text"
                    value={formData[member].regNumber}
                    onChange={(e) => handleChange(member, 'regNumber', e.target.value)}
                    placeholder="ID/Registration number"
                    required
                    className="flex-1 p-3 border placeholder-black placeholder:text-sm placeholder:font-semibold bg-white backdrop-blur-xs rounded-3xl"
                  />
                </div>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <input
                    type="email"
                    value={formData[member].email}
                    onChange={(e) => handleChange(member, 'email', e.target.value)}
                    placeholder="E-mail ID"
                    required
                    className="flex-1 p-3 border placeholder-black placeholder:text-sm placeholder:font-semibold bg-white backdrop-blur-xs rounded-3xl"
                  />
                  <input
                    type="tel"
                    value={formData[member].mobile}
                    onChange={(e) => handleChange(member, 'mobile', e.target.value)}
                    placeholder="Mobile Number"
                    required
                    className="flex-1 p-3 border placeholder-black placeholder:text-sm placeholder:font-semibold bg-white  backdrop-blur-xs rounded-3xl"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-6">
            <button type="submit" className="w-[100px] p-2 bg-purple-900 text-white rounded-3xl hover:bg-purple-300 hover:text-black">
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Step1;
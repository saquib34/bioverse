import React, { useState, useEffect } from "react";
import { User, Mail, Phone, Hash } from "lucide-react";

const Step1 = ({ onNext, onChange, formData }) => {
  const [error, setError] = useState("");
  const [localFormData, setLocalFormData] = useState({});

  useEffect(() => {
    if (Object.keys(localFormData).length === 0) {
      const initialData = {};
      for (let i = 1; i <= 5; i++) {
        initialData[`member${i}`] = { name: '', regNumber: '', email: '', mobile: '' };
      }
      setLocalFormData(initialData);
      onChange(initialData);
    }
  }, [localFormData, onChange]);

  const handleChange = (member, field, value) => {
    setError("");
    const updatedData = {
      ...localFormData,
      [member]: { ...localFormData[member], [field]: value }
    };
    setLocalFormData(updatedData);
    onChange(updatedData);
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
    if (checkDuplicates()) return;
    const allFieldsFilled = Object.values(localFormData).every(member => 
      member.name && member.regNumber && member.email && member.mobile
    );
    if (allFieldsFilled) {
      onNext();
    } else {
      setError("All fields are required");
    }
  };

  return (
    <div className="bg-purple-600 min-h-screen flex items-center justify-center p-4" style={{backgroundImage: "url('/bg.svg')", backgroundSize: "cover", backgroundPosition: "center"}}>
      <div className="bg-purple-500 bg-opacity-90 backdrop-blur-sm rounded-3xl p-8 w-full max-w-3xl">
        <h2 className="text-2xl text-white font-bold mb-4">Registration details</h2>
        <p className="text-white mb-6">Please fill your information so we know you registered for the event.</p>
        {error && <p className="text-red-300 mb-4 text-center">{error}</p>}
        <form onSubmit={handleNext} className="space-y-6">
          {Object.keys(localFormData).map((member, index) => (
            <div key={member}>
              <h3 className="text-white text-lg font-semibold mb-2">Member {index + 1}</h3>
              <div className="space-y-2">
                <div className="relative">
                  <User className="absolute left-0.5  top-2.5 text-purple-200" size={18} />
                  <input
                    type="text"
                    value={localFormData[member].name}
                    onChange={(e) => handleChange(member, 'name', e.target.value)}
                    placeholder="   Your Name"
                    required
                    className="w-full bg-purple-400 bg-opacity-50 rounded-full py-2  pl-5 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-300"
                  />
                </div>
                <div className="relative">
                  <Hash className="absolute left-0.5  top-2.5 text-purple-200" size={18} />
                  <input
                    type="text"
                    value={localFormData[member].regNumber}
                    onChange={(e) => handleChange(member, 'regNumber', e.target.value)}
                    placeholder="   ID/Registration Number"
                    required
                    className="w-full bg-purple-400 bg-opacity-50 rounded-full py-2  pl-5 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-300"
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-0.5  top-2.5 text-purple-200" size={18} />
                  <input
                    type="email"
                    value={localFormData[member].email}
                    onChange={(e) => handleChange(member, 'email', e.target.value)}
                    placeholder="   E-mail ID"
                    required
                    className="w-full bg-purple-400 bg-opacity-50 rounded-full py-2  pl-5 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-300"
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-0.5 top-2.5 text-purple-200" size={18} />
                  <input
                    type="tel"
                    value={localFormData[member].mobile}
                    onChange={(e) => handleChange(member, 'mobile', e.target.value)}
                    placeholder="  Mobile Number"
                    required
                    className="w-full bg-purple-400 bg-opacity-50 rounded-full py-2  pl-5 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-300"
                  />
                </div>
              </div>
            </div>
          ))}
          <div className="flex justify-center mt-8">
            <button type="submit" className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-8 rounded-full focus:outline-none focus:shadow-outline transition duration-300">
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Step1;
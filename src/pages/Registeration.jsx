import React, { useState } from "react";
import Step1 from "../components/step1";
import Step2 from "../components/step2";
import Step3 from "../components/step3";
import Completion from "../components/completiton";

const Registration = () => {
  const [step, setStep] = useState(1);

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleAddMember = (member) => {
    console.log(member);
  };

  return (
    <div className="App">
      {step === 1 && <Step1 onNext={handleNext} onAddMember={handleAddMember} />}
      {step === 2 && <Step2 onNext={handleNext} />}
      {step === 3 && <Step3 onNext={handleNext} />}
      {step === 4 && <Completion />}
    </div>
  );
};

export default Registration;

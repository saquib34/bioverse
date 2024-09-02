import React, { useState } from 'react';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { db } from '../../config/firebase'; // Updated import path
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Completion from './Completion';

const RegistrationForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    member1: { name: '', regNumber: '', email: '', mobile: '' },
    member2: { name: '', regNumber: '', email: '', mobile: '' },
    member3: { name: '', regNumber: '', email: '', mobile: '' },
    teamName: '',
    teamLeadName: '',
    teamLeadEmail: '', // Add team lead email field
    password: '',
    projectTheme: '',
    projectDescription: ''
  });
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleChange = (stepData) => {
    setFormData(prevData => ({ ...prevData, ...stepData }));
  };

  const setTeamLeadEmail = () => {
    const { teamLeadName, member1, member2, member3 } = formData;
    let teamLeadEmail = '';

    if (member1.name.toString() === teamLeadName.toString()) {
      teamLeadEmail = member1.email;
    } else if (member2.name.toString() === teamLeadName.toString()) {
      teamLeadEmail = member2.email;
    } else if (member3.name.toString() === teamLeadName.toString()) {
      teamLeadEmail = member3.email;
    }

    setFormData(prevData => ({
      ...prevData,
      teamLeadEmail
    }));

    return teamLeadEmail;
  };
  const checkExistingMembers = async () => {
    const members = [formData.member1, formData.member2, formData.member3];
    for (const member of members) {
      const regQuery = query(collection(db, "registrations"),
        where("member1.regNumber", "==", member.regNumber),
        where("member2.regNumber", "==", member.regNumber),
        where("member3.regNumber", "==", member.regNumber)
      );
      const emailQuery = query(collection(db, "registrations"),
        where("member1.email", "==", member.email),
        where("member2.email", "==", member.email),
        where("member3.email", "==", member.email)
      );

      const [regQuerySnapshot, emailQuerySnapshot] = await Promise.all([
        getDocs(regQuery),
        getDocs(emailQuery)
      ]);

      if (!regQuerySnapshot.empty) {
        return `Member with registration number ${member.regNumber} is already registered in a team.`;
      }
      if (!emailQuerySnapshot.empty) {
        return `Member with email ${member.email} is already registered in a team.`;
      }
    }
    return null;
  };


  // Add any additional validation logic here

  const validateForm = () => {
    // console.log$&
    // console.log$&
    // console.log$&

    return formData.teamName &&
      formData.teamLeadName &&
      formData.teamLeadEmail &&
      formData.password &&
      formData.projectTheme &&
      formData.projectDescription &&
      formData.member1.name && formData.member1.regNumber && formData.member1.email && formData.member1.mobile &&
      formData.member2.name && formData.member2.regNumber && formData.member2.email && formData.member2.mobile &&
      formData.member3.name && formData.member3.regNumber && formData.member3.email && formData.member3.mobile;
  };

  const handleSubmit = async () => {
    setSubmissionStatus('submitting');
    setErrorMessage('');
    setTeamLeadEmail();

    if (!validateForm()) {
      setSubmissionStatus('error');
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    try {
      const existingMemberError = await checkExistingMembers();
      if (existingMemberError) {
        setSubmissionStatus('error');
        setErrorMessage(existingMemberError);
        return;
      }

      // console.log$&
      const docRef = await addDoc(collection(db, "registrations"), formData);
      // console.log$&
      createUserWithEmailAndPassword(getAuth(), formData.teamLeadEmail, formData.password)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          sendEmailVerification(user).then(() => {
            getAuth().signOut();
            alert("Email Verification Link Successfully Sent to your Email Address");
          }).catch((error) => {
            console.error("Error sending verification email: ", error);
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error("Error creating user: ", error);
          console.error("Error code: ", errorCode);
          console.error("Error message: ", errorMessage);
        });


      setSubmissionStatus('success');
      nextStep(); // Move to completion step
    } catch (e) {
      console.error("Error adding document: ", e);
      console.error("Error creating user: ", e);
      setSubmissionStatus('error');
      setErrorMessage(`An error occurred while submitting the form: ${e.message}`);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1 onNext={nextStep} onChange={handleChange} formData={formData} />;
      case 2:
        return <Step2 onNext={nextStep} onPrev={prevStep} onChange={handleChange} formData={formData} />;
      case 3:
        return <Step3 onNext={handleSubmit} onPrev={prevStep} onChange={handleChange} formData={formData} />;
      case 4:
        return <Completion formData={formData} submissionStatus={submissionStatus} errorMessage={errorMessage} />;
      default:
        return <div>Error: Unknown step</div>;
    }
  };

  return (
    <div className="registration-form">
      {renderStep()}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

export default RegistrationForm;
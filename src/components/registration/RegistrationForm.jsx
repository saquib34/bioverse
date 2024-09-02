import React, { useState, useCallback, useMemo, useRef } from 'react';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { db } from '../../config/firebase';
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
    teamLeadEmail: '',
    password: '',
    projectTheme: '',
    projectDescription: ''
  });
  const [submissionStatus, setSubmissionStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const isSubmittingRef = useRef(false);

  const nextStep = useCallback(() => setStep(prevStep => prevStep + 1), []);
  const prevStep = useCallback(() => setStep(prevStep => prevStep - 1), []);

  const handleChange = useCallback((stepData) => {
    setFormData(prevData => ({ ...prevData, ...stepData }));
  }, []);

  const setTeamLeadEmail = useCallback(() => {
    setFormData(prevData => {
      const { teamLeadName, member1, member2, member3 } = prevData;
      let teamLeadEmail = '';

      if (member1.name === teamLeadName) teamLeadEmail = member1.email;
      else if (member2.name === teamLeadName) teamLeadEmail = member2.email;
      else if (member3.name === teamLeadName) teamLeadEmail = member3.email;

      return { ...prevData, teamLeadEmail };
    });
  }, []);

  const checkExistingMembers = useCallback(async () => {
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
  }, [formData]);

  const validateForm = useCallback(() => {
    const { member1, member2, member3, teamName, teamLeadName, teamLeadEmail, password, projectTheme, projectDescription } = formData;
    return teamName && teamLeadName && teamLeadEmail && password && projectTheme && projectDescription &&
      member1.name && member1.regNumber && member1.email && member1.mobile &&
      member2.name && member2.regNumber && member2.email && member2.mobile &&
      member3.name && member3.regNumber && member3.email && member3.mobile;
  }, [formData]);

  const handleSubmit = useCallback(async () => {
    if (isSubmittingRef.current) {
      console.log('Submission already in progress');
      return;
    }

    isSubmittingRef.current = true;
    setSubmissionStatus('submitting');
    setErrorMessage('');
    setTeamLeadEmail();

    if (!validateForm()) {
      setSubmissionStatus('error');
      setErrorMessage('Please fill in all required fields.');
      isSubmittingRef.current = false;
      return;
    }

    try {
      const existingMemberError = await checkExistingMembers();
      if (existingMemberError) {
        setSubmissionStatus('error');
        setErrorMessage(existingMemberError);
        isSubmittingRef.current = false;
        return;
      }

      await addDoc(collection(db, "registrations"), formData);
      
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, formData.teamLeadEmail, formData.password);
      await sendEmailVerification(auth.currentUser);
      await auth.signOut();

      alert("Email Verification Link Successfully Sent to your Email Address");
      setSubmissionStatus('success');
      nextStep(); // Move to completion step
    } catch (e) {
      console.error("Error during submission: ", e);
      setSubmissionStatus('error');
      setErrorMessage(`An error occurred while submitting the form: ${e.message}`);
    } finally {
      isSubmittingRef.current = false;
    }
  }, [formData, validateForm, checkExistingMembers, setTeamLeadEmail, nextStep]);

  const renderStep = useMemo(() => {
    switch (step) {
      case 1:
        return <Step1 onNext={nextStep} onChange={handleChange} formData={formData} />;
      case 2:
        return <Step2 onNext={nextStep} onPrev={prevStep} onChange={handleChange} formData={formData} />;
      case 3:
        return <Step3 onNext={handleSubmit} onPrev={prevStep} onChange={handleChange} formData={formData} isSubmitting={isSubmittingRef.current} />;
      case 4:
        return <Completion formData={formData} submissionStatus={submissionStatus} errorMessage={errorMessage} />;
      default:
        return <div>Error: Unknown step</div>;
    }
  }, [step, nextStep, prevStep, handleChange, handleSubmit, formData, submissionStatus, errorMessage, isSubmittingRef]);

  return (
    <div className="registration-form">
      {renderStep}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

export default RegistrationForm;
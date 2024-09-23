import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, fetchSignInMethodsForEmail } from "firebase/auth";
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
    member4: { name: '', regNumber: '', email: '', mobile: '' },
    member5: { name: '', regNumber: '', email: '', mobile: '' },
    teamName: '',
    teamLeadName: '',
    teamLeadEmail: '',
    teamLeadPhone: '',
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
      const { teamLeadName, member1, member2, member3,member4,member5 } = prevData;
      let teamLeadEmail = '';
      let teamLeadPhone = '';

      if (member1.name === teamLeadName) {
        teamLeadEmail = member1.email;
        teamLeadPhone = member1.mobile;
      } else if (member2.name === teamLeadName) {
        teamLeadEmail = member2.email;
        teamLeadPhone = member2.mobile;
      } else if (member3.name === teamLeadName) {
        teamLeadEmail = member3.email;
        teamLeadPhone = member3.mobile;
      }
      else if (member4.name === teamLeadName) {
        teamLeadEmail = member4.email;
        teamLeadPhone = member4.mobile;
      }
      else if (member5.name === teamLeadName) {
        teamLeadEmail = member5.email;
        teamLeadPhone = member5.mobile;
      }
    

      return { ...prevData, teamLeadEmail, teamLeadPhone };
    });
  }, []);

  const validateForm = useCallback(() => {
    const { member1, member2, member3,member4,member5, teamName, teamLeadName, teamLeadEmail, teamLeadPhone, password, projectTheme, projectDescription } = formData;
    return teamName && teamLeadName && teamLeadEmail && teamLeadPhone && password && projectTheme && projectDescription &&
      member1.name && member1.regNumber && member1.email && member1.mobile &&
      member2.name && member2.regNumber && member2.email && member2.mobile &&
      member3.name && member3.regNumber && member3.email && member3.mobile &&
      member4.name && member4.regNumber && member4.email && member4.mobile &&
      member5.name && member5.regNumber && member5.email && member5.mobile ;

  }, [formData]);

  useEffect(() => {
    setTeamLeadEmail();
  }, [formData.teamLeadName, setTeamLeadEmail]);

  const checkExistingMembers = useCallback(async () => {
    const auth = getAuth();
    const members = [formData.member1, formData.member2, formData.member3];

    for (const member of members) {
      // Check Firebase Auth
      try {
        const signInMethods = await fetchSignInMethodsForEmail(auth, member.email);
        if (signInMethods.length > 0) {
          return `Email ${member.email} is already registered in our authentication system.`;
        }
      } catch (error) {
        console.error("Error checking email in Auth:", error);
        return "An error occurred while checking email availability. Please try again.";
      }

      // Check Firestore
      const regQuery = query(collection(db, "registrations"), 
        where("member1.regNumber", "==", member.regNumber)
      );
      const emailQuery = query(collection(db, "registrations"), 
        where("member1.email", "==", member.email)
      );
      const phoneQuery = query(collection(db, "registrations"), 
        where("member1.mobile", "==", member.mobile)
      );

      try {
        const [regQuerySnapshot, emailQuerySnapshot, phoneQuerySnapshot] = await Promise.all([
          getDocs(regQuery),
          getDocs(emailQuery),
          getDocs(phoneQuery)
        ]);

        if (!regQuerySnapshot.empty) {
          return `Registration number ${member.regNumber} is already registered.`;
        }
        if (!emailQuerySnapshot.empty) {
          return `Email ${member.email} is already registered in our database.`;
        }
        if (!phoneQuerySnapshot.empty) {
          return `Phone number ${member.mobile} is already registered.`;
        }
      } catch (error) {
        console.error("Error checking Firestore:", error);
        return "An error occurred while checking registration data. Please try again.";
      }
    }
    return null;
  }, [formData]);

  const handleSubmit = useCallback(async () => {
    if (isSubmittingRef.current) {
      console.log('Submission already in progress');
      return;
    }

    isSubmittingRef.current = true;
    setSubmissionStatus('submitting');
    setErrorMessage('');

    if (!validateForm()) {
      setSubmissionStatus('error');
      setErrorMessage('Please fill in all required fields.');
      isSubmittingRef.current = false;
      alert('Please fill in all required fields.');
      return;
    }

    try {
      const existingMemberError = await checkExistingMembers();
      if (existingMemberError) {
        setSubmissionStatus('error');
        setErrorMessage(existingMemberError);
        isSubmittingRef.current = false;
        alert(existingMemberError);
        return;
      }

      // If all checks pass, proceed with registration
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
      let errorMsg = "An error occurred while submitting the form. ";
      if (e.code === "auth/weak-password") {
        errorMsg += "The password is too weak. Please choose a stronger password.";
      } else if (e.code === "auth/email-already-in-use") {
        errorMsg += "The email address is already in use.";
      } else if (e.code === "auth/invalid-email") {
        errorMsg += "The email address is not valid.";
      } else {
        errorMsg += e.message;
      }
      setSubmissionStatus('error');
      setErrorMessage(errorMsg);
      alert(errorMsg);
    } finally {
      isSubmittingRef.current = false;
    }
  }, [formData, validateForm, checkExistingMembers, nextStep]);

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
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiMail, FiFileText, FiUpload, FiCheck, FiSearch, FiEdit, FiFlag, FiUsers, FiBook, FiPhone } from 'react-icons/fi';
import { doc, setDoc, getDoc, query, where, getDocs, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase'; // Make sure this path is correct
import { useNavigate } from 'react-router-dom';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import LoginNavbar from './loginNavbar';
const API_URL = import.meta.env.VITE_APP_EASEBUZZ_LINK;
const EASEBUZZ_KEY = import.meta.env.VITE_APP_EASEBUZZ_KEY;




const PaperPresentationRegistration = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    registrationType: 'fresh',
    nationality: '',
    firstAuthorName: '',
    firstAuthorEmail: '',
    firstAuthorMobile: '',
    secondAuthorName: '',
    secondAuthorEmail: '',
    researchHeading: '',
    abstract: '',
    aadharImage: null,
    researchPaper: null,
  });
  const [isRetrieving, setIsRetrieving] = useState(false);
  const [errors, setErrors] = useState({});
  const [isPaid, setIsPaid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitProgress, setSubmitProgress] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();


  useEffect(() => {
    const loadScript = () => {
        const script = document.createElement('script');
        script.src = "https://ebz-static.s3.ap-south-1.amazonaws.com/easecheckout/v2.0.0/easebuzz-checkout-v2.min.js";
        script.async = true;
        script.onload = initiatePayment;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    };

    loadScript();
}, []);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] || null : value || ''
    }));
    setIsEditing(true);
  };

  const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const validateMobile = (mobile) => {
    const re = /^[0-9]{10}$/;
    return re.test(mobile);
  };

  const handleRetrieve = async () => {
    if (!formData.firstAuthorEmail) {
      setErrors({ firstAuthorEmail: "Please enter First Author's Email to retrieve details" });
      return;
    }
    setIsRetrieving(true);
    setErrors({});
    try {
      const q = query(collection(db, 'paperPresentations'), where('firstAuthorEmail', '==', formData.firstAuthorEmail));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const docData = querySnapshot.docs[0].data();
        setFormData(prevData => ({
          ...prevData,
          ...docData,
          registrationType: 'retrieve',  // Set this explicitly
        }));
        setIsPaid(docData.isPaid || false);
        setStep(1);
        setIsEditing(false);
      } else {
        setErrors({ retrieve: "No registration found with this email. You may proceed with a new registration." });
      }
    } catch (error) {
      console.error("Error retrieving data:", error);
      setErrors({ retrieve: "Error retrieving data. Please try again." });
    }
    setIsRetrieving(false);
  };

  const checkDuplicate = async () => {
    const q = query(collection(db, 'paperPresentations'), where('firstAuthorEmail', '==', formData.firstAuthorEmail));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nationality) newErrors.nationality = "Nationality is required";
    if (formData.nationality !== 'Indian') newErrors.nationality = "Only Indian nationals are eligible to participate";
    if (!formData.firstAuthorName) newErrors.firstAuthorName = "First author name is required";
    if (!formData.firstAuthorEmail) newErrors.firstAuthorEmail = "First author email is required";
    if (!validateEmail(formData.firstAuthorEmail)) newErrors.firstAuthorEmail = "Invalid email format";
    if (!formData.firstAuthorMobile) newErrors.firstAuthorMobile = "First author mobile number is required";
    if (!validateMobile(formData.firstAuthorMobile)) newErrors.firstAuthorMobile = "Invalid mobile number format";
    if (!formData.researchHeading) newErrors.researchHeading = "Research heading is required";
    if (!formData.abstract) newErrors.abstract = "Abstract is required";
    if (!formData.aadharImage) newErrors.aadharImage = "Aadhar card upload is required";
    if (!formData.researchPaper) newErrors.researchPaper = "Research paper upload is required";
    
    if (formData.secondAuthorName && !formData.secondAuthorEmail) newErrors.secondAuthorEmail = "Second author email is required if name is provided";
    if (formData.secondAuthorEmail && !validateEmail(formData.secondAuthorEmail)) newErrors.secondAuthorEmail = "Invalid email format for second author";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (isPaid) {
      return;
    }
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitProgress(0);
    try {
      // Check for duplicates only if it's a fresh registration
      if (formData.registrationType === 'fresh') {
        const isDuplicate = await checkDuplicate();
        if (isDuplicate) {
          setErrors({ firstAuthorEmail: "A registration with this email already exists" });
          setIsSubmitting(false);
          return;
        }
      }
      
      const aadharImageRef = ref(storage, `aadharImages/${formData.firstAuthorEmail}`);
      const researchPaperRef = ref(storage, `researchPapers/${formData.firstAuthorEmail}`);
      
      let aadharImageUrl = formData.aadharImage;
      let researchPaperUrl = formData.researchPaper;
  
      setSubmitProgress(20);
  
      if (formData.aadharImage instanceof File) {
        await uploadBytes(aadharImageRef, formData.aadharImage);
        aadharImageUrl = await getDownloadURL(aadharImageRef);
      }
  
      setSubmitProgress(50);
  
      if (formData.researchPaper instanceof File) {
        await uploadBytes(researchPaperRef, formData.researchPaper);
        researchPaperUrl = await getDownloadURL(researchPaperRef);
      }
  
      setSubmitProgress(80);
  
      await setDoc(doc(db, 'paperPresentations', formData.firstAuthorEmail), {
        ...formData,
        aadharImage: aadharImageUrl,
        researchPaper: researchPaperUrl,
        isPaid: false,
        submittedAt: new Date(),
      }, { merge: true });  // Use merge: true to update existing documents
  
      setSubmitProgress(100);
      setStep(5); // Move to success step
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrors({ submit: "Error submitting form. Please try again. " + error.message });
    } finally {
      setIsSubmitting(false);
    }
  };


  
  const initiatePayment = async () => {


    try {

        
        const txnid = 'TXN' + Date.now()+Math.floor(Math.random() * 1000);
        const paymentData = {
            txnid,
            amount: '100',
            firstname: formData.firstAuthorName,
            email: formData.firstAuthorEmail,

            phone: formData.firstAuthorMobile,
            productinfo: 'Bioverse Registration',
            surl: 'https://bioverse.asia/payment/success',
            furl: 'https://bioverse.asia/payment/failure'
        };

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(paymentData),
        });

        const responseText = await response.text();
        console.log(responseText);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}, message: ${responseText}`);
        }

        let result;
        try {
            result = JSON.parse(responseText);
        } catch (e) {
            console.error('Failed to parse response as JSON:', responseText);
            throw new Error('Invalid response from server');
        }

        if (result.status === 1) {
            proceedToPayment(result.data);
        } else {
            setError(`Payment initiation failed: ${result.data}`);
        }
    } catch (error) {
        console.error('Error initiating payment:', error);
        setError(`Error initiating payment: ${error.message}`);
    }
};

const proceedToPayment = (access_key) => {
    if (window.EasebuzzCheckout) {
        if (!EASEBUZZ_KEY) {
            console.error('Easebuzz key is not set in environment variables');
            setError('Payment configuration error. Please contact support.');
            return;
        }
        
        const easebuzzCheckout = new window.EasebuzzCheckout(EASEBUZZ_KEY, 'test');
        const options = {
            access_key: access_key,
            onResponse: (response) => {
                if (response.status === 'success') {
                    console.log('Payment successful:', response);
                    // if(response.amount === '100')
                    // {
                    //     return;
                    // }
                    navigate('/payment/success', { state: { response } });
                } else {
                    console.error('Payment failed:', response);
                    navigate('/payment/failure', { state: { response } });
                }
            },
            theme: "#123456"
        };
        easebuzzCheckout.initiatePayment(options);
    } else {
        console.error('Easebuzz SDK not loaded');
        setError('Payment gateway not available. Please try again later.');
    }
};

  const handlePayment = async () => {
    // console.log("Redirecting to payment gateway...");
    // navigate('/payment', {
    //   state: {
    //     email: formData.firstAuthorEmail,
    //     firstname: formData.firstAuthorName,
    //     phone: formData.firstAuthorMobile,
    //     amount: '100', // Change this to the actual registration fee
    //   }
    // });

    
    try {
        initiatePayment();
        
      await setDoc(doc(db, 'paperPresentations', formData.firstAuthorEmail), { isPaid: true }, { merge: true });
      setIsPaid(true);
      setStep(5); // Move to success step
    } catch (error) {
      console.error("Payment error:", error);
      setErrors({ payment: "Payment failed. Please try again." });
    }
  };

  const steps = [
    { title: "Retrieve", icon: FiSearch },
    { title: "Personal", icon: FiUser },
    { title: "Contact", icon: FiMail },
    { title: "Research", icon: FiFileText },
    { title: "Documents", icon: FiUpload },
  ];

  const pageVariants = {
    initial: { opacity: 0, y: 50 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -50 }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5
  };

  const inputClasses = "relative block w-full p-3 text-base bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-800 -mx-3";

  const renderStep = () => {
    if (isPaid) {
      return (
        <motion.div
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
          className="space-y-4"
        >
          <h2 className="text-2xl font-bold mb-6 text-indigo-800">Registration Details</h2>
          <div className="space-y-2">
            <p><strong>Nationality:</strong> {formData.nationality}</p>
            <p><strong>First Author Name:</strong> {formData.firstAuthorName}</p>
            <p><strong>First Author Email:</strong> {formData.firstAuthorEmail}</p>
            <p><strong>First Author Mobile:</strong> {formData.firstAuthorMobile}</p>
            <p><strong>Second Author Name:</strong> {formData.secondAuthorName || 'N/A'}</p>
            <p><strong>Second Author Email:</strong> {formData.secondAuthorEmail || 'N/A'}</p>
            <p><strong>Research Heading:</strong> {formData.researchHeading}</p>
            <p><strong>Abstract:</strong> {formData.abstract}</p>
            <p><strong>Aadhar Card:</strong> Uploaded</p>
            <p><strong>Research Paper:</strong> Uploaded</p>
            <p><strong>Payment Status:</strong> Paid</p>
          </div>
        </motion.div>
      );
    }

    switch(step) {
      case 0:
        return (
          <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold mb-6 text-indigo-800">Registration Type</h2>
            <div className="space-y-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="registrationType"
                  value="fresh"
                  checked={formData.registrationType === 'fresh'}
                  onChange={handleInputChange}
                  className="form-radio"
                />
                <span className="ml-2">Fresh Registration</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="registrationType"
                  value="retrieve"
                  checked={formData.registrationType === 'retrieve'}
                  onChange={handleInputChange}
                  className="form-radio"
                />
                <span className="ml-2">Retrieve Registration</span>
              </label>
            </div>
            {formData.registrationType === 'retrieve' && (
              <div className="relative">
                <FiMail className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="email"
                  name="firstAuthorEmail"
                  value={formData.firstAuthorEmail}
                  onChange={handleInputChange}
                  placeholder="First Author's Email"
                  className={inputClasses}
                />
              </div>
            )}
            <button
              onClick={formData.registrationType === 'retrieve' ? handleRetrieve : () => setStep(1)}
              className="w-full p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-base font-semibold"
              disabled={isRetrieving}
            >
              {isRetrieving ? 'Retrieving...' : formData.registrationType === 'retrieve' ? 'Retrieve Registration' : 'Start New Registration'}
            </button>
            {errors.retrieve && <p className="text-red-500 mt-2">{errors.retrieve}</p>}
          </motion.div>
        );
      case 1:
        return (
          <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold mb-6 text-indigo-800">Personal Information</h2>
            <div className="relative">
              <FiFlag className="absolute top-3 left-3 text-gray-400" />
              <select
                name="nationality"
                value={formData.nationality}
                onChange={handleInputChange}
                className={`${inputClasses} ${errors.nationality ? 'border-red-500' : ''}`}
                required
              >
                <option value="">Select Nationality</option>
                <option value="Indian">Indian</option>
                <option value="Other">Other</option>
              </select>
            </div>
            {errors.nationality && <p className="text-red-500 mt-2">{errors.nationality}</p>}
            {formData.nationality === 'Indian' && (
              <div className="relative">
                <FiUser className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="text"
                  name="firstAuthorName"
                  value={formData.firstAuthorName}
                  onChange={handleInputChange}
                  placeholder="First Author Name"
                  className={`${inputClasses} ${errors.firstAuthorName ? 'border-red-500' : ''}`}
                  required
                />
              </div>
            )}
            {errors.firstAuthorName && <p className="text-red-500 mt-2">{errors.firstAuthorName}</p>}
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold mb-6 text-indigo-800">Contact Information</h2>
            <div className="relative">
              <FiMail className="absolute top-3 left-3 text-gray-400" />
              <input
                type="email"
                name="firstAuthorEmail"
                value={formData.firstAuthorEmail}
                onChange={handleInputChange}
                placeholder="First Author Email"
                className={`${inputClasses} ${errors.firstAuthorEmail ? 'border-red-500' : ''}`}
                required
              />
            </div>
            {errors.firstAuthorEmail && <p className="text-red-500 mt-2">{errors.firstAuthorEmail}</p>}
            <div className="relative">
              <FiPhone className="absolute top-3 left-3 text-gray-400" />
              <input
                type="tel"
                name="firstAuthorMobile"
                value={formData.firstAuthorMobile}
                onChange={handleInputChange}
                placeholder="First Author Mobile Number"
                className={`${inputClasses} ${errors.firstAuthorMobile ? 'border-red-500' : ''}`}
                required
              />
            </div>
            {errors.firstAuthorMobile && <p className="text-red-500 mt-2">{errors.firstAuthorMobile}</p>}
            <div className="relative">
              <FiUsers className="absolute top-3 left-3 text-gray-400" />
              <input
                type="text"
                name="secondAuthorName"
                value={formData.secondAuthorName}
                onChange={handleInputChange}
                placeholder="Second Author Name (optional)"
                className={inputClasses}
              />
            </div>
            <div className="relative">
              <FiMail className="absolute top-3 left-3 text-gray-400" />
              <input
                type="email"
                name="secondAuthorEmail"
                value={formData.secondAuthorEmail}
                onChange={handleInputChange}
                placeholder="Second Author Email (optional)"
                className={`${inputClasses} ${errors.secondAuthorEmail ? 'border-red-500' : ''}`}
              />
            </div>
            {errors.secondAuthorEmail && <p className="text-red-500 mt-2">{errors.secondAuthorEmail}</p>}
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold mb-6 text-indigo-800">Research Details</h2>
            <div className="relative">
              <FiBook className="absolute top-3 left-3 text-gray-400" />
              <input
                type="text"
                name="researchHeading"
                value={formData.researchHeading}
                onChange={handleInputChange}
                placeholder="Research Heading"
                className={`${inputClasses} ${errors.researchHeading ? 'border-red-500' : ''}`}
                required
              />
            </div>
            {errors.researchHeading && <p className="text-red-500 mt-2">{errors.researchHeading}</p>}
            <div className="relative">
              <FiFileText className="absolute top-3 left-3 text-gray-400" />
              <textarea
                name="abstract"
                value={formData.abstract}
                onChange={handleInputChange}
                placeholder="Research Abstract"
                className={`${inputClasses} h-32 ${errors.abstract ? 'border-red-500' : ''}`}
                required
              />
            </div>
            {errors.abstract && <p className="text-red-500 mt-2">{errors.abstract}</p>}
          </motion.div>
        );
      case 4:
        return (
          <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold mb-6 text-indigo-800">Upload Documents</h2>
            <div>
              <label className="block text-base font-medium text-black mb-2">Upload Aadhar Card</label>
              <p className="text-sm text-black mb-2">Please upload a clear PDF scan of your Aadhar card. Maximum file size: 300KB</p>
              <div className="relative">
                <FiUpload className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="file"
                  name="aadharImage"
                  onChange={handleInputChange}
                  accept=".pdf"
                  className={`${inputClasses} ${errors.aadharImage ? 'border-red-500' : ''}`}
                  required
                />
              </div>
              {formData.aadharImage && (
                <span className="text-sm text-gray-600 mt-1 block">{formData.aadharImage.name}</span>
              )}
              {errors.aadharImage && <p className="text-red-500 mt-2">{errors.aadharImage}</p>}
            </div>
            <div>
              <label className="block text-base font-medium text-black mb-2">Upload Research Paper</label>
              <p className="text-sm text-black mb-2">Upload your complete research paper in PDF format. Ensure all figures and tables are included.</p>
              <div className="relative">
                <FiUpload className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="file"
                  name="researchPaper"
                  onChange={handleInputChange}
                  accept=".pdf"
                  className={`${inputClasses} ${errors.researchPaper ? 'border-red-500' : ''}`}
                  required
                />
              </div>
              {formData.researchPaper && (
                <span className="text-sm text-gray-600 mt-1 block">{formData.researchPaper.name}</span>
              )}
              {errors.researchPaper && <p className="text-red-500 mt-2">{errors.researchPaper}</p>}
            </div>
          </motion.div>
        );
      case 5:
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <FiCheck className="text-6xl text-green-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4 text-indigo-800">Registration Successful!</h2>
            <p className="text-lg mb-6 text-gray-600">Thank you for registering for the Paper Presentation.</p>
            {!isPaid && (
              <button
                onClick={handlePayment}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-base font-semibold"
              >
                Proceed to Payment
              </button>
            )}
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className=' bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4 overflow-hidden relative'>
        <LoginNavbar />

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4 overflow-hidden relative">
      {/* Animated background */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-50"></div>
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full opacity-20"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 40 + 10}px`,
                height: `${Math.random() * 40 + 10}px`,
                animation: `float ${Math.random() * 10 + 5}s infinite ease-in-out`,
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 w-full max-w-md md:max-w-lg lg:max-w-xl relative z-10">
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-center text-indigo-900 mb-6">Paper Presentation Registration</h1>
          {formData.nationality !== 'Other' && step > 0 && (
            <div className="flex justify-between items-center">
              {steps.map((s, index) => (
                <div key={index} className="flex flex-col items-center">
                  <motion.div
                    className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center ${
                      step > index ? 'bg-indigo-600 text-white' : 'bg-gray-300 text-gray-600'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <s.icon className="text-lg md:text-xl" />
                  </motion.div>
                  <span className="text-xs md:text-sm mt-1 font-medium">{s.title}</span>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>

        {!isPaid && step > 0 && step < 5 && formData.nationality !== 'Other' && (
          <motion.div
            className="flex justify-between mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <button
              onClick={() => setStep(Math.max(0, step - 1))}
              className="px-4 py-2 rounded-full bg-gray-300 hover:bg-gray-400 text-gray-800 transition-colors text-sm md:text-base font-semibold"
            >
              Previous
            </button>
            {step === 4 ? (
              <button
                onClick={handleSubmit}
                className="px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white transition-colors text-sm md:text-base font-semibold flex items-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 mr-2">
                    <CircularProgressbar
                      value={submitProgress}
                      strokeWidth={12}
                      styles={buildStyles({
                        strokeLinecap: 'round',
                        textSize: '24px',
                        pathColor: `white`,
                        textColor: 'white',
                        trailColor: '#3730A3',
                        backgroundColor: '#3730A3',
                      })}
                    />
                  </div>
                ) : null}
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            ) : (
              <button
                onClick={() => setStep(Math.min(4, step + 1))}
                className="px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white transition-colors text-sm md:text-base font-semibold"
              >
                Next
              </button>
            )}
          </motion.div>
        )}

        {errors.submit && <p className="text-red-500 mt-4 text-center text-sm">{errors.submit}</p>}
        
        {isPaid && step < 5 && (
          <div className="mt-4 text-center">
            <p className="text-green-600 font-semibold text-sm">Payment Completed</p>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default PaperPresentationRegistration;
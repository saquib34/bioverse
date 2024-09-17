import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiMail, FiFileText, FiUpload, FiCheck, FiSearch, FiEdit, FiFlag, FiUsers, FiBook, FiHash } from 'react-icons/fi';
import { getFirestore, doc, setDoc, getDoc, query, where, getDocs, collection } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';

const PaperPresentationRegistration = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    aadharNumber: '',
    nationality: '',
    firstAuthorName: '',
    firstAuthorEmail: '',
    secondAuthorName: '',
    secondAuthorEmail: '',
    researchHeading: '',
    abstract: '',
    aadharImage: null,
    researchPaper: null,
  });
  const [isRetrieving, setIsRetrieving] = useState(false);
  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleRetrieve = async () => {
    if (!formData.aadharNumber) {
      setErrors({ aadharNumber: "Please enter Aadhar number to retrieve details" });
      return;
    }
    setIsRetrieving(true);
    setErrors({});
    try {
      const docRef = doc(db, 'paperPresentations', formData.aadharNumber);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setFormData(data);
        setIsPaid(data.isPaid || false);
        setStep(1);
        setIsEditing(false);
      } else {
        setErrors({ retrieve: "No registration found with this Aadhar number. You may proceed with a new registration." });
      }
    } catch (error) {
      console.error("Error retrieving data:", error);
      setErrors({ retrieve: "Error retrieving data. Please try again." });
    }
    setIsRetrieving(false);
  };

  const checkDuplicate = async () => {
    const q = query(collection(db, 'paperPresentations'), where('aadharNumber', '==', formData.aadharNumber));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  };

  const handleSubmit = async () => {
    setErrors({});
    if (formData.nationality !== 'Indian') {
      setErrors({ nationality: "Only Indian nationals are eligible to participate" });
      return;
    }
    if (!isEditing) {
      const isDuplicate = await checkDuplicate();
      if (isDuplicate) {
        setErrors({ aadharNumber: "A registration with this Aadhar number already exists" });
        return;
      }
    }
    try {
      const aadharImageRef = ref(storage, `aadharImages/${formData.aadharNumber}`);
      const researchPaperRef = ref(storage, `researchPapers/${formData.aadharNumber}`);
      
      if (formData.aadharImage) {
        await uploadBytes(aadharImageRef, formData.aadharImage);
      }
      if (formData.researchPaper) {
        await uploadBytes(researchPaperRef, formData.researchPaper);
      }

      let aadharImageUrl = formData.aadharImage ? await getDownloadURL(aadharImageRef) : null;
      let researchPaperUrl = formData.researchPaper ? await getDownloadURL(researchPaperRef) : null;

      await setDoc(doc(db, 'paperPresentations', formData.aadharNumber), {
        ...formData,
        aadharImage: aadharImageUrl,
        researchPaper: researchPaperUrl,
        isPaid: isPaid,
        submittedAt: new Date(),
      });

      setStep(5); // Move to success step
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrors({ submit: "Error submitting form. Please try again. " + error.message });
    }
  };

  const handlePayment = async () => {
    // Implement payment logic here
    // After successful payment:
    try {
      await setDoc(doc(db, 'paperPresentations', formData.aadharNumber), { isPaid: true }, { merge: true });
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

  const inputClasses = "w-full p-3 pl-10 text-base bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-800";

  const renderStep = () => {
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
            <h2 className="text-2xl font-bold mb-6 text-indigo-800">Retrieve or Start New</h2>
            <div className="relative">
              <FiHash className="absolute top-3 left-3 text-gray-400" />
              <input
                type="text"
                name="aadharNumber"
                value={formData.aadharNumber}
                onChange={handleInputChange}
                placeholder="First Author's Aadhar Number"
                className={inputClasses}
              />
            </div>
            <button
              onClick={handleRetrieve}
              className="w-full p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-base font-semibold"
              disabled={isRetrieving}
            >
              {isRetrieving ? 'Retrieving...' : 'Retrieve Registration'}
            </button>
            <button
              onClick={() => setStep(1)}
              className="w-full p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-base font-semibold"
            >
              Start New Registration
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
                className={inputClasses}
                disabled={!isEditing && isPaid}
              >
                <option value="">Select Nationality</option>
                <option value="Indian">Indian</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="relative">
              <FiUser className="absolute top-3 left-3 text-gray-400" />
              <input
                type="text"
                name="firstAuthorName"
                value={formData.firstAuthorName}
                onChange={handleInputChange}
                placeholder="First Author Name"
                className={inputClasses}
                disabled={!isEditing && isPaid}
              />
            </div>
            {errors.nationality && <p className="text-red-500 mt-2">{errors.nationality}</p>}
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
                className={inputClasses}
                disabled={!isEditing && isPaid}
              />
            </div>
            <div className="relative">
              <FiUsers className="absolute top-3 left-3 text-gray-400" />
              <input
                type="text"
                name="secondAuthorName"
                value={formData.secondAuthorName}
                onChange={handleInputChange}
                placeholder="Second Author Name (optional)"
                className={inputClasses}
                disabled={!isEditing && isPaid}
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
                className={inputClasses}
                disabled={!isEditing && isPaid}
              />
            </div>
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
                className={inputClasses}
                disabled={!isEditing && isPaid}
              />
            </div>
            <div className="relative">
              <FiFileText className="absolute top-3 left-3 text-gray-400" />
              <textarea
                name="abstract"
                value={formData.abstract}
                onChange={handleInputChange}
                placeholder="Research Abstract"
                className={`${inputClasses} h-32 pl-10`}
                disabled={!isEditing && isPaid}
              />
            </div>
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
              <label className="block text-base font-medium text-gray-700 mb-2">Upload Aadhar Card</label>
              <p className="text-sm text-gray-500 mb-2">Please upload a clear PDF scan of your Aadhar card. Maximum file size: 300KB</p>
              <div className="relative">
                <FiUpload className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="file"
                  name="aadharImage"
                  onChange={handleInputChange}
                  accept=".pdf"
                  className={inputClasses}
                  disabled={!isEditing && isPaid}
                />
              </div>
            </div>
            <div>
              <label className="block text-base font-medium text-gray-700 mb-2">Upload Research Paper</label>
              <p className="text-sm text-gray-500 mb-2">Upload your complete research paper in PDF format. Ensure all figures and tables are included.</p>
              <div className="relative">
                <FiUpload className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="file"
                  name="researchPaper"
                  onChange={handleInputChange}
                  accept=".pdf"
                  className={inputClasses}
                  disabled={!isEditing && isPaid}
                />
              </div>
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

      <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 w-full max-w-md md:max-w-lg lg:max-w-xl relative z-10">
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-center text-indigo-900 mb-6">Paper Presentation Registration</h1>
          <div className="flex justify-between items-center">
            {steps.map((s, index) => (
              <div key={index} className="flex flex-col items-center">
                <motion.div
                  className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center ${
                    step >= index ? 'bg-indigo-600 text-white' : 'bg-gray-300 text-gray-600'
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
        </motion.div>

        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>

        {step > 0 && step < 5 && (
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
            {isEditing || !isPaid ? (
              <button
                onClick={() => step === 4 ? handleSubmit() : setStep(Math.min(4, step + 1))}
                className="px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white transition-colors text-sm md:text-base font-semibold"
              >
                {step === 4 ? 'Submit' : 'Next'}
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 rounded-full bg-yellow-500 hover:bg-yellow-600 text-white transition-colors text-sm md:text-base font-semibold"
              >
                <FiEdit className="inline-block mr-1" /> Edit
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
  );
};

export default PaperPresentationRegistration;
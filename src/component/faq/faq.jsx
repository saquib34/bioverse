import React, { useState } from "react";
import { GrFormAdd, GrFormSubtract } from "react-icons/gr";
import LeftEllipse from "../../assets/FaqLeftEllipse.png";
import RightEllipse from "../../assets/FaqRightEllipse.png";
import RightLayer from "../../assets/Layer_2.svg"

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div
      className={`p-4 rounded-lg transition-all duration-300 ease-in-out cursor-pointer ${
        isOpen ? "bg-gray-700" : "bg-gray-800 hover:bg-gray-700"
      }`}
      onClick={onClick}
    >
      <div className="flex justify-between items-center text-white">
        <h3
          className="text-lg transition-colors duration-300 ease-in-out hover:text-purple-300"
          style={{
            background:
              "linear-gradient(90deg, #EF86FE 0%, #AE52E6 67%, #8A36D8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {question}
        </h3>
        <button
          className="transform transition-transform duration-300 hover:scale-110"
          aria-expanded={isOpen}
          aria-controls={`faq-answer-${question}`}
        >
          {isOpen ? <GrFormSubtract /> : <GrFormAdd />}
        </button>
      </div>
      {isOpen && (
        <p
          className="mt-2 text-gray-400 p-2 rounded"
          id={`faq-answer-${question}`}
          style={{
            color: "rgba(233, 233, 233, 1)",
          }}
        >
          {answer}
        </p>
      )}
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Why ut enim ad minim veniam quis?",
      answer:
        "Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat aute irure dolor.",
    },
    {
      question: "Why ut enim ad minim veniam quis?",
      answer:
        "Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat aute irure dolor.",
    },
    {
      question: "Why ut enim ad minim veniam quis?",
      answer:
        "Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat aute irure dolor.",
    },
    {
      question: "Why ut enim ad minim veniam quis?",
      answer:
        "Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat aute irure dolor.",
    },
    {
      question: "Why ut enim ad minim veniam quis?",
      answer:
        "Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat aute irure dolor.",
    },
    {
      question: "Why ut enim ad minim veniam quis?",
      answer:
        "Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat aute irure dolor.",
    },
    // Add more FAQs as needed
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="relative min-h-screen bg-black flex flex-col items-center justify-center py-20">
      {/* LeftSideEllipse */}
      <div
        className="absolute"
        style={{
          backgroundImage: `url(${LeftEllipse})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zindex: -2,
          left: "0",
          top: "10%",
          width: "50%", // Adjust width as needed
          height: "90%",
        }}
      />
      
      {/* LeftSideEllipse */}
      <div
        className="absolute"
        style={{
          backgroundImage: `url(${RightEllipse})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zindex: -2,
          right: "0",
          top: "30%",
          width: "40%", // Adjust width as needed
          height: "90%",
          opacity:0.5
        }}
      />
      

     


      <h2 className="text-white text-4xl font-semibold mb-8 mt-60">FAQ</h2>
      <div
        className="grid grid-cols-2 gap-8 max-w-4xl"
        style={{ gridAutoRows: "minmax(0, auto)" }}
      >
        {faqs.map((faq, index) => (
          <div key={index} className="flex flex-col">
            <FAQItem
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => toggleFAQ(index)}
            />
          </div>
        ))}
      </div>
      


  
    </div>
  );
};

export default FAQ;

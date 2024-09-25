import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqData = [
  {
    question: "What should I bring to BioVerse ??",
    answer: "Bring your laptops and chargers and any personal items you require.",
    color: "pink"
  },
  {
    question: "Who can participate??",
    answer: "Our hackathon is open for students faculty and professionals and anyone passionate about technology and innovation in the field of biotechnology.",
    color: "green"
  },
  {
    question: "Do I need a team to participate??",
    answer: "Yes you need a team of 5 members to participate in the hackathon and just 2 authors for Paper symposium",
    color: "green"
  },
  {
    question: "What's the judging process ??",
    answer: "Criteria such as innovation, technological complexity,originality, practicality and presentation are ranked at the top for judgement.",
    color: "pink"
  },
  {
    question: "How to prepare for the hackathon ? ?",
    answer: "Familiarize yourself with the event's theme and rules. Brush up on your coding skills, brainstorm project ideas, and consider learning about new technologies and don't forget to get plenty of rest before the event.",
    color: "pink"
  },
  {
    question: " What is the procedure of participation ?? (Outside India)",
    answer: "Register yourself for event of your choice from the Register Now Section of our website. If selected you will receive an invitation with further  instructions",
    color: "green"
  },
  {
    "question": "Do I need to stay for the entire time duration ? and Food and accomodations ?",
    "answer": "Staying for the entire time is encouraged but you can take breaks and  rest  in  between and  Food and living arrangements will be provided by the  institution.",
    "color": "green"
  }
  ,
  {
    "question": "Registration Fees",
    "answer": "The registration fees for our events are as follows:\n- Hackathon: ₹397\n- Paper Presentation: ₹150\n\nPlease make sure to register in advance to secure your spot!",
    "color": "pink"
  }
  
];
const Mobilefaq = () => {
    const [expandedIndex, setExpandedIndex] = useState(null);
  
    const toggleExpand = (index) => {
      setExpandedIndex(expandedIndex === index ? null : index);
    };
  
    return (
      <div className="relative top-[1850px] left-0 w-auto px-4 text-left text-sm" id="faq">
        <img
          className="absolute top-[0px] left-0 w-full h-auto object-cover"
          alt=""
          src="/group-2819@2x.png"
        />
        <div className="relative z-10 mt-16 mb-8 text-center">
          <h2 className="text-2xl font-semibold capitalize">FAQ</h2>
        </div>
        <div className="relative z-10 flex flex-col items-center gap-4">
          {faqData.map((faq, index) => (
            <div key={index} className="w-[85%] max-w-[400px] bg-gray-600 rounded-lg shadow-md overflow-hidden">
              <div className="flex items-center p-3">
                <div 
                  className="flex-grow pr-2 cursor-pointer"
                  onClick={() => toggleExpand(index)}
                >
                  <div className={`text-xs font-medium leading-tight text-transparent bg-clip-text bg-gradient-to-r ${faq.color === 'pink' ? 'from-[#ef86fe] via-[#ae52e6] to-[#8a36d8]' : 'from-[#18f69a] via-[#0f827b] to-[#076f69]'}`}>
                    {faq.question}
                  </div>
                </div>
                <button
                  onClick={() => toggleExpand(index)}
                  className="flex-shrink-0 w-6 h-6 bg-gradient-to-b from-[#f7f7ff] via-[#b9b9bf] to-[#949499] rounded-full flex items-center justify-center"
                >
                  {expandedIndex === index ? (
                    <ChevronUp className="w-4 h-4 text-gray-800" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-800" />
                  )}
                </button>
              </div>
              {expandedIndex === index && (
                <div className="bg-gray-700 p-3 text-white text-[10px] leading-tight">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Mobilefaq;
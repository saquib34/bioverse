import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqData = [
  {
    question: "What should I bring to the Hackathon?",
    answer: "Bring your laptop, charger, any hardware you plan to use, and your enthusiasm! Don't forget your student ID if you're a student. It's also a good idea to bring any specific software or tools you might need for your project, as well as personal items like a water bottle and snacks.",
    color: "pink"
  },
  {
    question: "Who can participate in the Hackathon?",
    answer: "Our hackathon is open to students, professionals, and anyone passionate about technology and innovation. We welcome participants from all backgrounds, including developers, designers, and creative thinkers. Whether you're a coding whiz or have great ideas, there's a place for you!",
    color: "green"
  },
  {
    question: "Do I need to have a team before the event?",
    answer: "No, you don't need to have a team before the event. While you're welcome to come with a pre-formed team, we'll have team-forming activities at the beginning of the hackathon. This is a great opportunity to meet new people and collaborate with others who have complementary skills!",
    color: "green"
  },
  {
    question: "How are projects judged?",
    answer: "Projects are judged based on criteria such as innovation, technical complexity, practicality, and presentation. A panel of industry experts will evaluate each project, considering factors like originality, potential impact, and elegant solutions to real-world problems.",
    color: "pink"
  },
  {
    question: "How can I prepare for the Hackathon?",
    answer: "To prepare, familiarize yourself with the event's theme and rules. Brush up on your coding skills, brainstorm project ideas, and consider learning about new technologies you might want to use. Don't forget to get plenty of rest before the event and come with an open mind ready to learn and collaborate!",
    color: "pink"
  },
  {
    question: "What is the procedure to participate in the Hackathon? (Outside India)",
    answer: "International participants can register on our website and submit the required application form. If selected, you'll receive an invitation with further instructions. Please note that while we can't provide travel assistance, we offer options for remote participation in certain tracks.",
    color: "green"
  },
  {
    question: "Who can participate in the Hackathon?",
    answer: "Our hackathon is open to students, professionals, and anyone passionate about technology and innovation. We welcome participants from all backgrounds, including developers, designers, and creative thinkers. Whether you're a coding whiz or have great ideas, there's a place for you!",
    color: "green"
  },
  {
    question: "What should I bring to the Hackathon?",
    answer: "Bring your laptop, charger, any hardware you plan to use, and your enthusiasm! Don't forget your student ID if you're a student. It's also a good idea to bring any specific software or tools you might need for your project, as well as personal items like a water bottle and snacks.",
    color: "pink"
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
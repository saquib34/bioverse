import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqData = [
  {
    question: "What should I bring to BioVerse ?",
    answer: "Bring your laptops and chargers and any personal items you require.",
    color: "pink"
  },
  {
    question: "Who can participate?",
    answer: "Our hackathon is open for students faculty and professionals and anyone passionate about technology and innovation in the field of biotechnology.",
    color: "green"
  },
  {
    question: "Do I need a team to participate?",
    answer: "Yes you need a team of 5 members to participate in the hackathon and just 2 authors for Paper symposium",
    color: "green"
  },
  {
    question: "What's the judging process ?",
    answer: "Criteria such as innovation, technological complexity,originality, practicality and presentation are ranked at the top for judgement.",
    color: "pink"
  },
  {
    question: "How to prepare for the hackathon ?",
    answer: "Familiarize yourself with the event's theme and rules. Brush up on your coding skills, brainstorm project ideas, and consider learning about new technologies and don't forget to get plenty of rest before the event.",
    color: "pink"
  },
  {
    question: " What is the procedure of participation ?",
    answer: "Register yourself for event of your choice from the Register Now Section of our website. If selected you will receive an invitation with further  instructions",
    color: "green"
  },
  {
    "question": "Do I need to stay for the entire time duration ? and Food and accomodations ?",
    "answer": "Staying for the entire time is encouraged but you can take breaks and  rest  in between and  Food and living arrangements will be provided by the  institution.",
    "color": "green"
  },
  {
    "question": "Registration Fees",
    "answer": "The registration fees for our events are as follows:- Hackathon: ₹397             -                                            Paper Presentation: ₹150 Please make sure to register in advance to secure your spot!",
    "color": "pink"
  }
  
];

const FAQ = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const containerRef = useRef(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  useEffect(() => {
    if (containerRef.current) {
      const items = containerRef.current.children;
      const itemHeight = 148.9; // Original height of each FAQ item
      const expandedHeight = 300; // Estimated height when expanded
      const gap = 28; // Vertical gap between items
      const columns = 2; // Number of columns in the grid
      const totalItems = items.length;
      const lastRowStartIndex = totalItems - (totalItems % columns || columns);

      let containerYOffset = 0;

      Array.from(items).forEach((item, idx) => {
        const itemElement = item;
        if (expandedIndex === null) {
          // Reset positions when no item is expanded
          itemElement.style.transform = 'none';
          itemElement.style.zIndex = '1';
        } else {
          const itemColumn = idx % columns;
          const itemRow = Math.floor(idx / columns);
          const expandedColumn = expandedIndex % columns;
          const expandedRow = Math.floor(expandedIndex / columns);
          let yOffset = 0;

          if (expandedIndex >= lastRowStartIndex) {
            // Last row expansion: move all items upwards
            yOffset = -(expandedHeight - itemHeight) - gap;
            if (idx >= lastRowStartIndex && idx !== expandedIndex) {
              // Adjust position for last row items
              yOffset += (expandedHeight - itemHeight) / 2;
            }
          } else {
            // Normal behavior for non-last row expansions
            if (itemRow === expandedRow && itemColumn !== expandedColumn) {
              // Move the adjacent item in the same row further away
              yOffset = (expandedHeight - itemHeight) / 2;
            } else if (itemRow > expandedRow) {
              // Move items below the expanded item down
              yOffset = (expandedHeight - itemHeight) + gap;
            }
          }

          itemElement.style.transform = `translateY(${yOffset}px)`;
          itemElement.style.zIndex = idx === expandedIndex ? '10' : '1';

          // Update container offset for last row expansion
          if (expandedIndex >= lastRowStartIndex && idx === expandedIndex) {
            containerYOffset = -(expandedHeight - itemHeight) - gap;
          }
        }
      });

      // Apply offset to the container to prevent collision
      containerRef.current.style.transform = `translateY(${containerYOffset}px)`;
    }
  }, [expandedIndex]);

  return (
    <div className="absolute top-[7117px] left-[calc(50%_-_1411px)] w-[2145.2px] h-[1875.7px] text-left text-45xl" id="FAQ">
      <img
        className="absolute top-[0px] left-[calc(50%_-_1072.6px)] w-[1750px] h-[1778.6px] object-contain"
        alt=""
        src="/group-2819@2x.png"
      />
      <div className="absolute top-[733px] left-[calc(50%_+_275.4px)] w-[131px] h-[63px]">
        <div className="absolute top-[0px] left-[calc(50%_-_65.5px)] leading-[99%] capitalize font-semibold">
          FAQ
        </div>
      </div>
      <div 
        ref={containerRef} 
        className="absolute top-[1052px] left-[668px] w-[1477.2px] flex flex-row items-center justify-center flex-wrap content-center gap-x-[76px] gap-y-28 text-[25.88px] transition-transform duration-300 ease-in-out"
      >
        {faqData.map((faq, index) => (
          <div key={index} className="w-[682.6px] relative transition-all duration-300 ease-in-out">
            <div className={`shadow-[0px_2.4120004177093506px_7.24px_rgba(19,_18,_66,_0.07)] bg-gray-600 ${
              expandedIndex === index ? 'rounded-t-lgi-3' : 'rounded-lgi-3'
            }`}>
              <div className="p-4 h-[148.9px] relative">
                <div className={`absolute top-1/2 left-4 transform -translate-y-1/2 w-[75%] leading-[33.77px] text-transparent !bg-clip-text [background:linear-gradient(90deg,_${faq.color === 'pink' ? '#ef86fe,_#ae52e6_67%,_#8a36d8' : '#18f69a,_#0f827b_71%,_#076f69'})] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]`}>
                  {faq.question}
                </div>
                <div 
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer z-10"
                  onClick={() => toggleExpand(index)}
                >
                  <div className="w-12 h-12 rounded-[9.65px] [background:linear-gradient(180deg,_#f7f7ff,_#b9b9bf_63%,_#949499)] flex items-center justify-center">
                    {expandedIndex === index ? (
                      <ChevronUp className="text-gray-800" />
                    ) : (
                      <ChevronDown className="text-gray-800" />
                    )}
                  </div>
                </div>
              </div>
            </div>
            {expandedIndex === index && (
              <div className="bg-gray-700 p-4 rounded-b-lgi-3 text-white text-sm">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
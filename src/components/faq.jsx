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

          if (idx === expandedIndex) {
            // Keep the expanded item in place
            yOffset = 0;
            itemElement.style.zIndex = '10';
          } else if (itemRow === expandedRow && itemColumn !== expandedColumn) {
            // Move the adjacent item in the same row further away
            yOffset = expandedHeight - itemHeight + gap;
          } else if (itemRow > expandedRow) {
            // Move items below the expanded item down
            yOffset = (expandedHeight - itemHeight) + gap;
          }

          itemElement.style.transform = `translateY(${yOffset}px)`;
          itemElement.style.zIndex = idx === expandedIndex ? '10' : '1';
        }
      });
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
      <div ref={containerRef} className="absolute top-[1052px] left-[668px] w-[1477.2px] flex flex-row items-center justify-center flex-wrap content-center gap-x-[76px] gap-y-28 text-[25.88px]">
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
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
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
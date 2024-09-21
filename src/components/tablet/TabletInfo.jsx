import React from "react";

const TabletInfo = () => {
  return (
    <div className="relative w-full top-15 text-base sm:text-lg md:text-xl text-whitesmoke overflow-hidden border-hidden object-cover bg-gray-100" id="info">
      <div className="absolute inset-0 overflow-hidden">
        <img
          className="w-full h-full object-cover"
          alt=""
          src="/group-37355.svg"
        />
        <img
          className="absolute top-0 left-0 w-full h-full object-cover"
          alt=""
          src="/group-37361.svg"
        />
      </div>
      <div className="relative z-10 flex flex-col items-center py-8 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="w-full max-w-4xl mx-auto space-y-12 sm:space-y-16 md:space-y-24">
          {[
            {
              title: "What is Bioverse ASIA?",
              content: "A 36-hour Bio Hackathon that aims to revolutionize the intersection of biology and computer science. Organized by the Innovation Incubation and Entrepreneurship Center of SRM Institute of Science and Technology, Ramapuram, this event will take place on October 18-19, 2024.",
              gradient: "from-[#ef86fe] via-[#ae52e6] to-[#8a36d8]"
            },
            {
              title: "Who is organizing this?",
              content: "BioVerse Asia is being organized by the Innovation Incubation and Entrepreneurship Center of SRM Institute of Science and Technology, Ramapuram.",
              gradient: "from-[#1fcef0] via-[#20a7df] to-[#2351b8]"
            },
            {
              title: "What can you expect from us?",
              content: [
                "Cutting-edge resources: Access to state-of-the-art tools and databases for your projects.",
                "Expert mentorship: Guidance from industry leaders and academic experts in bio-tech.",
                "Engaging workshops: Hands-on sessions on emerging technologies in biology and computing.",
                "Networking opportunities: Connect with peers, potential collaborators, and industry representatives.",
                "Fair competition: Well-structured hackathon with clear guidelines and impartial judging.",
                "Valuable prizes: Recognition for top projects, including awards and potential funding.",
                "Continuous support: Ongoing assistance to help bring promising ideas to fruition post-event."
              ],
              gradient: "from-[#18f69a] via-[#0f827b] to-[#076f69]"
            }
          ].map((card, index) => (
            <div key={index} className="relative w-full">
              <div className="relative shadow-[0px_2.4120004177093506px_7.24px_rgba(19,_18,_66,_0.07)] rounded-xl bg-gray-500 bg-opacity-80 pt-12 sm:pt-16 pb-6 px-5 sm:px-8">
                <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{backgroundImage: "url('/group-37355.svg')"}} />
                <h2 className={`text-xl sm:text-2xl md:text-3xl leading-tight font-extrabold text-transparent bg-clip-text bg-gradient-to-r ${card.gradient} mb-3 sm:mb-5`}>
                  {card.title}
                </h2>
                {Array.isArray(card.content) ? (
                  <ul className="leading-relaxed list-disc pl-4 space-y-1 sm:space-y-2">
                    {card.content.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="leading-relaxed">{card.content}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TabletInfo;
import React from "react";

const MobileAbout = () => {
    return (
      <>
        <div
          className="relative top-[805px] left-[calc(50%_-_31px)] text-[20px] leading-[99%] capitalize font-semibold"
          id="about"
        >
          About
        </div>
        <div className="relative top-[17.2%] left-[calc(50%_-_176px)] text-[13px] leading-[99%] capitalize">
          <p className="[margin-block-start:0] [margin-block-end:.77px]">{`join a 36 hours verse of `}</p>
          <p className="m-0">infinite possibilities</p>
        </div>
        <div className="absolute top-[980px] left-[calc(50%_-_260px)] w-[452px] h-[533.3px] text-justify text-xs">
          <img
            className="absolute top-[27px] w-full left-[-120px] h-full"
            alt=""
            src="/group-37378.svg"
          />
          <div className="absolute h-[56.25%] top-[13.19%] bottom-[40.56%] left-[calc(50%_+_184px)] shadow-[0px_0.7133529782295227px_2.14px_rgba(19,_18,_66,_0.07)] rounded-[5.71px] bg-gray-400 w-[500px] [transform:_rotate(90deg)] [transform-origin:0_0]" />
          <img
            className="absolute h-[6.24%] w-[34.18%] top-[0%] right-[54.09%] bottom-[93.76%] left-[11.73%] rounded-[18.63px] max-w-full overflow-hidden max-h-full object-contain"
            alt=""
            src="/button@2x.png"
          />
          <div className="absolute top-[500px] left-[calc(50%_+_75px)] rounded-[17.14px] ">
            <div className="absolute top-[8.34px] left-[9.26px] w-[110px] h-[17px] text-lg">
              <a
                className="absolute top-[200px] left-[0px] font-medium text-[inherit] [text-decoration:none]"
                href="/Brochure Bio-Verse.pdf"
                target="_blank"
              >
                <button className="bg-[#4b209c] w-[150px] h-[40px] text-[11px] text-white font-medium rounded-xl">
                  Download Broucher
                </button>
              </a>
            </div>
          </div>
          <div className="absolute top-[49px] left-[128px] leading-[122.57%] font-medium inline-block w-[266px]">
            BioVerse Asia, the pioneering Bio Hackathon in Asia*, is poised to
            transform the landscape where biology meets computer science.
            Scheduled for October 18-19, 2024, this intensive 36-hour event is
            being orchestrated by the Innovation Incubation and Entrepreneurship
            Center of SRM Institute of Science and Technology, Ramapuram.
            BioVerse Asia aims to create a dynamic platform where students,
            professionals, and enthusiasts can collaboratively shape the future
            of biological research and healthcare through innovative technology.
            The event will challenge participants to develop cutting-edge
            solutions in key areas such as bioinformatics, genomics,
            computational biology, synthetic biology, and personalized medicine.
          </div>
          <div className="absolute top-[350px] left-[128px] leading-[122.57%] font-medium whitespace-pre-wrap inline-block w-[269px]">
            {" "}
            This groundbreaking hackathon offers a unique opportunity for
            attendees to showcase their skills, network with industry leaders,
            and position themselves at the forefront of the bio-tech revolution.
            Participants will have access to state-of-the-art resources and
            mentorship from renowned experts in the field. The event will
            feature multiple tracks catering to different skill levels and
            interests, workshops on emerging technologies like CRISPR and
            machine learning in biology, and networking sessions with potential
            employers and investors. By bringing together diverse talents and
            fostering interdisciplinary collaboration, BioVerse Asia seeks to
            catalyze innovations that could potentially reshape healthcare,
            environmental biotechnology, and biological research across Asia and
            beyond.
          </div>
          <div className="absolute top-[845px] left-[calc(50%_-_2px)] text-center text-5xl leading-[99%] capitalize font-semibold">
            SPONSORS
          </div>
        </div>
      </>
    );
};

export default MobileAbout;
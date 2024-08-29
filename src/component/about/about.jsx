import React from "react";
import Layer1 from "../../assets/Layer_1.svg";
import EllipseLeft from "../../assets/Ellipse23.png";
import downloadIcon from "../../assets/DownloadBrochureButton.svg";
import LongCardBg from "../../assets/LongCardBg.png";
import EllipseRight from "../../assets/Ellipse22.png";
import Layer2 from "../../assets/Layer_2.svg";

const About = () => {
  return (
    <div className="relative flex items-center justify-center w-full h-screen z-10">
      {/* Layer 1 PNG Background */}
      <div
        className="absolute layer-1-bg"
        style={{
          backgroundImage: `url(${Layer1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: -2,
          left: "0.8%",
          top: "10%",
          width: "15%",
          height: "90%",
          opacity: 0.5,
        }}
      />
      {/* Ellipse on left */}
      <div
        className="absolute ellipse-left"
        style={{
          backgroundImage: `url(${EllipseLeft})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: -1,
          width: "20%",
          height: "60%",
          left: "0",
          top: "20%",
          opacity: 0.7,
        }}
      />
      {/* About Heading */}
      <div
        className="absolute about-heading"
        style={{
          top: "5%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: "Poppins, sans-serif",
          fontSize: "32px",
          fontWeight: "600",
          lineHeight: "63.36px",
          textAlign: "center",
          color: "#FFFFFF",
          zIndex: 1,
        }}
      >
        <h1>About</h1>
      </div>

      {/* Paragraph */}
      <div className="absolute join-paragraph left-20 top-3/20 pl-60">
        <p
          className="font-poppins"
          style={{
            fontSize: "30px",
            color: "white",
            marginTop: "-175px",
            zIndex: 1,
          }}
        >
          Join A 36 Hours Verse of <br />
          Infinite Possibilities
        </p>
      </div>

      {/* Download Brochure Button with Hover Effect */}
      <button
        className="absolute download-button right-80 bottom-100 px-4 py-2 bg-blue-500 text-white rounded-md flex items-center hover:bg-blue-600 transition-all duration-300 ease-in-out transform hover:scale-105"
        style={{
          zIndex: 2,
          borderRadius: "25px",
          background:
            "linear-gradient(to right, rgba(139, 76, 94, 1), rgba(134, 58, 123, 1), rgba(128, 42, 145, 1), rgba(125, 33, 158, 1), rgba(113, 37, 197, 1), rgba(27, 41, 143, 1), rgba(54, 16, 100, 1))",
        }}
      > 
        Download Brochure{" "}
        <img src={downloadIcon} alt="Download Icon" className="mr-2 size-8" />
      </button>
      
      {/* Long Card */}
      <div className="relative mt-[600px] mb-16 z-10 long-card">
        <div
          className="card bg-gray-800 rounded-2xl p-4 flex"
          style={{
            width: "1352px",
            height: "300px",
            backgroundImage: `url(${LongCardBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: 1.0,
          }}
        >
          <div className="card-left flex-1 mr-4"></div>
          <div className="card-right flex-2">
            <p className="text-white font-poppins text-xl ">
              <br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
      </div>
      {/* Small Three Cards */}
      <div
        className="absolute bottom-16 w-full flex justify-center gap-4 small-cards"
        style={{
          top: "950px",
        }}
      >
        {[1, 2, 3].map((index) => (
          <div
            key={index}
            className="small-card bg-gray-900 rounded-lg p-4"
            style={{
              width: "419px",
              height: "366px",
              backgroundImage: `url(${LongCardBg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              opacity: 1.0,
            }}
          >
            <div className="card-right flex-2">
              <p className="text-white font-poppins text-xl ">
                <br />
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Ellipse on right */}
      <div
        className="absolute ellipse-right"
        style={{
          backgroundImage: `url(${EllipseRight})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: -1,
          width: "40%",
          height: "100%",
          right: "10px",
          top: "50%",
        }}
      />
      {/* Layer 2 PNG Background */}
      <div
        className="absolute layer-2-bg"
        style={{
          backgroundImage: `url(${Layer2})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: -2,
          width: "30%",
          height: "120%",
          right: "10px",
          top: "0",
          opacity: 0.4,
        }}
      />

      {/* Mobile-specific styles */}
      <style jsx>{`
        @media (max-width: 1200px) {
          .relative {
            flex-direction: column;
            height: auto;
            padding: 2rem 1rem;
            overflow-x: hidden;
          }

          .absolute {
            position: static;
            width: 100% !important;
            height: auto !important;
            transform: none !important;
            left: auto !important;
            right: auto !important;
            top: auto !important;
            margin-bottom: 1rem;
          }

          .about-heading {
            position: relative;
            margin-bottom: 1rem;
          }

          .join-paragraph {
            position: relative;
            text-align: center;
            padding-left: 0;
            margin-top: 1rem;
            margin-bottom: 1rem;
          }

          .download-button {
            position: relative;
            margin: 1rem auto;
            font-size: 0.8rem;
            padding: 0.5rem 1rem;
            width: auto;
            max-width: 169px;
          }

          .download-button img {
            width: 1rem;
            height: 1rem;
          }

          .long-card {
            position: static;
            margin-top: 2rem;
            margin-bottom: 2rem;
          }

          .long-card .card {
            width: 100% !important;
            height: auto !important;
            flex-direction: column;
          }

          .small-cards {
            position: static;
            flex-direction: column;
            gap: 1rem;
          }

          .small-card {
            width: 100% !important;
            height: auto !important;
          }

         
         
          p {
            font-size: 1rem !important;
            margin-top: 0 !important;
          }

          h1 {
            font-size: 2rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default About;
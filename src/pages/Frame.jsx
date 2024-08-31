import { useCallback } from "react";
import Navbar from "../components/navbar";
import Home from "../components/home";
import Bg from "../components/bg";
import Footer from "../components/footer";
import MidPage from "../components/about";
import Sponsors from "../components/sponsors";
import InfoCard from "../components/infocard";
import FAQ from "../components/faq";
const Frame = () => {
  const onButtonContainerClick = useCallback(() => {
    // Please sync "Login page" to the project
  }, []);

  return (
    <div className="w-full relative bg-gray-100 h-[9716px] overflow-hidden text-justify text-[67.97px] text-white font-poppins">
      <div className="absolute h-[102.94%] w-[131.19%] top-[-3.19%] right-[-12.38%] bottom-[0.25%] left-[-18.81%] text-center">
        <div className="absolute h-[18.75%] w-full top-[0%] right-[0%] bottom-[81.25%] left-[0%]">
          <Navbar />
          < Home />

        </div>
        <Bg />
        <Footer />
  
      </div>

      < MidPage />
      <Sponsors />
      <InfoCard />
      <FAQ />
  
    </div>
  );
};

export default Frame;

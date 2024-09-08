import { useCallback } from "react";
import MobileNavbar from "./mobileNavbar";
import MobileMid from "./mobileMid";
import MobileAbout from "./mobileAbout";
import MobileSponsors from "./mobileSponsors";
import MobileInfo from "./mobileInfo";
import Mobilefaq from "./mobileFaq";
import MobileFooter from "./mobileFotter";

const Phone = () => {
  const onButtonContainerClick = useCallback(() => {
    // Please sync "Login page" to the project
  }, []);

  return (
    <div className="w-full relative bg-gray-100 h-[4950px] overflow-hidden text-left text-[12.35px] text-white font-poppins">
      <div className="absolute top-[-25px] left-[calc(50%_-_313px)] w-[597.9px] h-[721.2px] text-center">
        <MobileNavbar />
        <MobileMid />
      </div>
      <MobileAbout />
      <MobileSponsors />
      <MobileInfo />
      <Mobilefaq />
      <MobileFooter />
    </div>
  );
};

export default Phone;

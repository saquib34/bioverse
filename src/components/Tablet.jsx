import React from "react";
import { useNavigate } from "react-router-dom";
import LandingPage from "./tablet/LandingPage";
import MidPage from "./tablet/MidPage";
import TabletSponsors from "./tablet/TabletSponsors";
import MobileInfo from "./mobileInfo"
import TabletInfo from "./tablet/TabletInfo";
import TabletFaq from "./tablet/TabletFaq";
import TabletFooter from "./tablet/TabletFooter";


const Tablet = () => {

    const navigate = useNavigate();
    
    return (
        <div className=" bg-gray-100 text-white min-h-screen ">
        <LandingPage />
        <MidPage />

        {/* <div className="bg-gray-100"/> */}
        {/* <MobileSponsors className="bg-gray-100"/> */}
        <TabletSponsors />

        <TabletInfo />
        <TabletFaq />
        <div className="top-20 bg-gray-100"/>
  
        <TabletFooter />
        
 

       


      </div>

    );
    }
export default Tablet;
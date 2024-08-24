import MainContent from "../components/MainContent";
import FrameComponent from "../components/FrameComponent";
import FrameComponent1 from "../components/FrameComponent1";
import FrameComponent2 from "../components/FrameComponent2";
import FrameComponent3 from "../components/FrameComponent3";
import TestimonialContent from "../components/TestimonialContent";
import FrameComponent4 from "../components/FrameComponent4";
import Footer from "../components/Footer";

const LogIn = () => {
  return (
    <div className="w-full relative bg-gray-300 overflow-hidden flex flex-col items-start justify-start pt-2.5 px-0 pb-0 box-border gap-[227px] leading-[normal] tracking-[normal] text-left text-45xl text-white font-poppins lg:gap-[113px] mq450:gap-[57px]">
      <div className="w-[705px] h-[705px] absolute !m-[0] bottom-[519px] left-[-333px] [filter:blur(544px)] rounded-[50%] bg-darkorchid" />
      <MainContent />
      <img
        className="w-[2070px] h-[1690.1px] absolute !m-[0] bottom-[1617.9px] left-[-205px]"
        alt=""
        src="/group-37116.svg"
      />
      <FrameComponent />
      <img
        className="w-[1506px] relative max-h-full hidden max-w-full z-[4]"
        alt=""
        src="/subtract.svg"
      />
      <section className="w-full h-[1289.8px] absolute !m-[0] top-[0px] right-[0px] left-[0px]">
        <img
          className="absolute top-[-279px] left-[-214px] w-[2156px] h-[1568.8px] object-contain z-[1]"
          alt=""
          src="/group-7@2x.png"
        />
        <img
          className="absolute top-[350px] left-[111px] w-[1506px] h-[175.6px] z-[2]"
          loading="lazy"
          alt=""
          src="/subtract.svg"
        />
      </section>
      <FrameComponent1 />
      <img
        className="w-[2256px] h-[1390px] absolute !m-[0] top-[2361px] left-[-333px]"
        alt=""
        src="/group-16.svg"
      />
      <FrameComponent2 />
      <div className="self-stretch flex flex-row items-start justify-center py-0 px-5">
        <h1 className="m-0 relative text-inherit leading-[99%] capitalize font-semibold font-[inherit] mq450:text-19xl mq450:leading-[38px] mq825:text-32xl mq825:leading-[51px]">
          About
        </h1>
      </div>
      <FrameComponent3 />
      <div className="self-stretch flex flex-row items-start justify-center pt-0 pb-[23px] pl-[21px] pr-5">
        <h1 className="m-0 relative text-inherit leading-[99%] capitalize font-semibold font-[inherit] z-[1] mq450:text-19xl mq450:leading-[38px] mq825:text-32xl mq825:leading-[51px]">
          FAQ
        </h1>
      </div>
      <img
        className="w-[1369px] h-[277px] absolute !m-[0] top-[1337px] right-[179px] z-[3]"
        alt=""
        src="/group-9.svg"
      />
      <TestimonialContent />
      <div className="self-stretch flex flex-row items-start justify-center pt-0 pb-[23px] pl-[21px] pr-5">
        <h1 className="m-0 relative text-inherit leading-[99%] capitalize font-semibold font-[inherit] z-[1] mq450:text-19xl mq450:leading-[38px] mq825:text-32xl mq825:leading-[51px]">
          Team
        </h1>
      </div>
      <FrameComponent4 />
      <Footer />
    </div>
  );
};

export default LogIn;

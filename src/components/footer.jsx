import React from "react";

const Footer = () => {
    const onButtonContainerClick = () => {
        console.log("Button Container Clicked");
        }
return (
 

 
    <div className="absolute bottom-[0.01px] left-[calc(50%_-_808.5px)] bg-gray-400 w-[1728px] h-[351px] overflow-hidden text-13xl">
      <img
        className="absolute h-[293.76%] w-[58.71%] top-[-96.01%] right-[20.57%] bottom-[-97.75%] left-[20.72%] max-w-full overflow-hidden max-h-full"
        alt=""
        src="/group-2821.svg"
      />
      <div className="absolute h-[56.98%] w-[50.58%] top-[21.65%] right-[36.63%] bottom-[21.37%] left-[12.79%]">
        <img
          className="absolute h-[16.95%] w-[24.78%] top-[64.5%] right-[75.22%] bottom-[18.55%] left-[0%] max-w-full overflow-hidden max-h-full"
          alt=""
          src="/group-27.svg"
        />
        <div className="absolute top-[0px] left-[508px] w-[115.1px] h-[200px]">
          <b className="absolute top-[0px] left-[0.13px] tracking-[-0.03em] leading-[120%]">
            Impact
          </b>
          <div className="absolute top-[60px] left-[0px] w-[72px] h-[140px] text-5xl">
            <div className="absolute top-[0px] left-[0.13px] tracking-[-0.03em] leading-[120%] font-semibold">
              Home
            </div>
            <div className="absolute top-[37px] left-[0px] tracking-[-0.03em] leading-[120%] font-semibold">
              About
            </div>
            <div className="absolute top-[74px] left-[0.13px] tracking-[-0.03em] leading-[120%] font-semibold">
              FAQ
            </div>
            <div className="absolute top-[111px] left-[0px] tracking-[-0.03em] leading-[120%] font-semibold">
              Team
            </div>
          </div>
        </div>
        <div className="absolute top-[0px] left-[697.13px] w-[177px] h-[89px]">
          <b className="absolute top-[0px] left-[0px] tracking-[-0.03em] leading-[120%]">
            Downloads
          </b>
          <div className="absolute top-[60px] left-[0px] text-5xl tracking-[-0.03em] leading-[120%]">
            Brochuer
          </div>
        </div>
      </div>
      <div
        className="absolute top-[calc(50%_+_44.5px)] left-[calc(50%_+_394px)] rounded-[34.23px] bg-gray-500 w-[284px] h-[63.4px] flex flex-col items-center justify-center py-[16.7px] px-[24.1px] box-border cursor-pointer text-right text-[22.2px]"
        onClick={onButtonContainerClick}
      >
        <div className="w-[213px] relative h-[33px]">
          <div className="absolute top-[0px] left-[0px]">
            Register Now/Login
          </div>
        </div>
      </div>
      <img
        className="absolute h-[35.75%] w-[17.42%] top-[28.49%] right-[77.55%] bottom-[35.75%] left-[5.03%] max-w-full overflow-hidden max-h-full"
        alt=""
        src="/group-37340.svg"
      />
      <img
        className="absolute top-[16px] left-[calc(50%_+_430px)] w-[235px] h-[222px] overflow-hidden object-cover"
        alt=""
        src="/frame-3@2x.png"
      />
    </div>
    );
};

export default Footer;
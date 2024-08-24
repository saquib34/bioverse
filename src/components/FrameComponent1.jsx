import PropTypes from "prop-types";

const FrameComponent1 = ({ className = "" }) => {
  return (
    <section
      className={`self-stretch flex flex-row items-start justify-center pt-0 pb-[71px] pl-[21px] pr-5 box-border max-w-full text-justify text-lg text-white font-poppins mq825:pb-[46px] mq825:box-border ${className}`}
    >
      <div className="rounded-18xl bg-gray-200 overflow-hidden flex flex-row items-end justify-center pt-[13px] pb-3.5 pl-[78px] pr-[54px] box-border gap-[70px] max-w-full z-[2] mq450:gap-[17px] mq825:gap-[35px] mq1425:flex-wrap mq1425:pl-[39px] mq1425:pr-[27px] mq1425:box-border">
        <div className="h-[400px] w-[423px] relative max-w-full">
          <div className="absolute w-[calc(100%_-_15px)] top-[12px] right-[7px] left-[8px] rounded-lg bg-white h-[373px] overflow-hidden" />
          <img
            className="absolute top-[0px] left-[0px] w-full h-full overflow-hidden object-cover z-[4]"
            loading="lazy"
            alt=""
            src="/frame-2@2x.png"
          />
        </div>
        <div className="h-[355px] w-16 flex flex-col items-start justify-start py-0 pl-0 pr-[7px] box-border">
          <img
            className="self-stretch h-[307px] rounded-18xl max-w-full overflow-hidden shrink-0 object-contain"
            loading="lazy"
            alt=""
            src="/button@2x.png"
          />
        </div>
        <div className="w-[466px] flex flex-col items-start justify-start pt-0 px-0 pb-[79px] box-border min-h-[307px] max-w-full">
          <div className="self-stretch flex flex-col items-end justify-start gap-[68px] mq825:gap-[34px]">
            <div className="self-stretch relative leading-[122.57%] font-medium">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat
            </div>
            <div className="w-[313px] flex flex-row items-start justify-end py-0 px-[70px] box-border mq450:pl-5 mq450:pr-5 mq450:box-border">
              <button className="cursor-pointer [border:none] pt-[13px] px-4 pb-3 bg-gray-700 flex-1 rounded-12xl flex flex-row items-start justify-start relative gap-[7px] whitespace-nowrap hover:bg-gainsboro">
                <div className="relative text-base-8 font-poppins text-white text-right inline-block min-w-[101px]">
                  LEARN MORE
                </div>
                <img
                  className="h-[38.7px] w-[38.7px] absolute !m-[0] top-[3px] right-[15.3px] overflow-hidden shrink-0 object-contain"
                  alt=""
                  src="/fluentmdl2up@2x.png"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

FrameComponent1.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent1;

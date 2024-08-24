import PropTypes from "prop-types";

const FrameComponent2 = ({ className = "" }) => {
  return (
    <section
      className={`self-stretch flex flex-row items-start justify-center pt-0 px-5 pb-[23px] box-border max-w-full text-center text-49xl text-white font-plus-jakarta-sans ${className}`}
    >
      <div className="w-[1296px] flex flex-row items-end justify-center flex-wrap content-end gap-8 max-w-full mq825:gap-4">
        <div className="w-[414px] [backdrop-filter:blur(38.06px)] rounded-[32.63px] bg-gray-400 overflow-hidden shrink-0 flex flex-col items-start justify-start pt-[21.8px] px-[9px] pb-[21.7px] box-border max-w-full">
          <h1 className="m-0 relative text-inherit leading-[87px] font-semibold font-[inherit] text-transparent !bg-clip-text [background:linear-gradient(90deg,_#f087ff,_#de78f8_50%,_#8935d8)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] mq450:text-22xl mq450:leading-[52px] mq825:text-35xl mq825:leading-[70px]">
            Prize Money
          </h1>
          <div className="self-stretch flex flex-row items-start justify-center py-0 pl-5 pr-[21px] text-9xl-5 font-outfit">
            <div className="w-[129px] relative tracking-[0.05em] leading-[44px] inline-block min-w-[129px] whitespace-nowrap mq450:text-4xl mq450:leading-[35px]">
              ₹ 70,000
            </div>
          </div>
        </div>
        <div className="flex-1 [backdrop-filter:blur(38.06px)] rounded-[32.63px] bg-gray-400 overflow-hidden flex flex-col items-start justify-start pt-[21.8px] pb-[21.7px] pl-[37px] pr-9 box-border min-w-[344px] max-w-full mq450:min-w-full">
          <div className="relative leading-[87px] font-semibold text-transparent !bg-clip-text [background:linear-gradient(90deg,_#1fcff1,_#20abe1_61%,_#234db6)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] mq450:text-22xl mq450:leading-[52px] mq825:text-35xl mq825:leading-[70px]">
            29th and 30th
          </div>
          <div className="self-stretch flex flex-row items-start justify-center py-0 pl-0 pr-0.5 text-9xl-5 font-outfit">
            <div className="relative tracking-[0.05em] leading-[44px] mq450:text-4xl mq450:leading-[35px]">
              September, 2024
            </div>
          </div>
        </div>
        <div className="w-72 flex flex-col items-start justify-end pt-0 px-0 pb-[21.7px] box-border text-left">
          <div className="self-stretch flex flex-col items-start justify-start">
            <div className="relative leading-[87px] font-semibold text-transparent !bg-clip-text [background:linear-gradient(90deg,_#19fb9b,_#128881_59.5%,_#076e68)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] mq450:text-22xl mq450:leading-[52px] mq825:text-35xl mq825:leading-[70px]">
              36 Hours
            </div>
            <div className="self-stretch relative text-9xl-5 tracking-[0.05em] leading-[44px] text-center mq450:text-4xl mq450:leading-[35px]">
              Possibilities
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

FrameComponent2.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent2;

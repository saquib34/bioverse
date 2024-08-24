import PropTypes from "prop-types";

const Footer = ({ className = "" }) => {
  return (
    <footer
      className={`self-stretch bg-gray-800 overflow-hidden flex flex-row items-start justify-between pt-[76px] pb-[75px] pl-[159px] pr-[186px] box-border max-w-full gap-5 text-center text-69xl-3 text-white font-impact lg:pl-[79px] lg:pr-[93px] lg:box-border mq450:py-[49px] mq450:px-5 mq450:box-border mq1425:flex-wrap mq1425:justify-center ${className}`}
    >
      <div className="w-[278.6px] flex flex-col items-start justify-start gap-[23px] min-w-[278.6px] mq1425:flex-1">
        <div className="w-[170px] relative tracking-[-0.03em] leading-[106px] inline-block mq450:text-7xl mq450:leading-[42px] mq825:text-25xl mq825:leading-[64px]">
          LOGO
        </div>
        <div className="self-stretch flex flex-row items-start justify-end">
          <img
            className="h-[33.9px] w-[216.6px] relative"
            loading="lazy"
            alt=""
            src="/group-27.svg"
          />
        </div>
      </div>
      <div className="w-[813px] flex flex-row items-end justify-center gap-[162.9px] min-w-[813px] max-w-full text-13xl font-poppins mq450:gap-[41px] mq825:gap-[81px] mq825:flex-wrap mq1425:flex-1 mq1425:min-w-full">
        <div className="flex-1 flex flex-row items-start justify-center gap-[74px] min-w-[238px] max-w-full mq450:gap-[37px] mq450:flex-wrap">
          <div className="w-[115.1px] flex flex-col items-start justify-start gap-[22px] min-w-[115.1px] mq450:flex-1">
            <b className="self-stretch relative tracking-[-0.03em] leading-[120%] inline-block min-w-[115px] mq450:text-lgi mq450:leading-[23px] mq825:text-7xl mq825:leading-[31px]">
              Impact
            </b>
            <div className="w-[72px] flex flex-col items-start justify-start gap-2 text-5xl">
              <div className="self-stretch relative tracking-[-0.03em] leading-[29px] font-semibold inline-block min-w-[71px] mq450:text-lgi mq450:leading-[23px]">
                Home
              </div>
              <div className="self-stretch relative tracking-[-0.03em] leading-[29px] font-semibold inline-block min-w-[72px] mq450:text-lgi mq450:leading-[23px]">
                About
              </div>
              <div className="w-12 relative tracking-[-0.03em] leading-[29px] font-semibold inline-block min-w-[48px] mq450:text-lgi mq450:leading-[23px]">
                FAQ
              </div>
              <div className="relative tracking-[-0.03em] leading-[29px] font-semibold inline-block min-w-[68px] mq450:text-lgi mq450:leading-[23px]">
                Team
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col items-start justify-start gap-[22px] min-w-[115px]">
            <b className="self-stretch relative tracking-[-0.03em] leading-[120%] mq450:text-lgi mq450:leading-[23px] mq825:text-7xl mq825:leading-[31px]">
              Downloads
            </b>
            <div className="w-[104px] relative text-5xl tracking-[-0.03em] leading-[29px] inline-block min-w-[104px] mq450:text-lgi mq450:leading-[23px]">
              Brochuer
            </div>
          </div>
        </div>
        <div className="h-[120px] flex flex-col items-start justify-start min-w-[284px] mq825:flex-1">
          <button className="cursor-pointer [border:none] py-[15.2px] px-[35px] bg-gray-700 rounded-[34.23px] flex flex-row items-start justify-start whitespace-nowrap hover:bg-gainsboro">
            <div className="relative text-3xl-2 font-poppins text-white text-right">
              Register Now/Login
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  className: PropTypes.string,
};

export default Footer;

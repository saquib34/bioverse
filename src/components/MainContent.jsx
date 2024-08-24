import PropTypes from "prop-types";

const MainContent = ({ className = "" }) => {
  return (
    <section
      className={`self-stretch flex flex-row items-start justify-center pt-0 pb-[308.8px] pl-[141px] pr-5 box-border max-w-full mq450:pb-[201px] mq450:box-border mq825:pl-[35px] mq825:box-border mq1425:pl-[70px] mq1425:box-border ${className}`}
    >
      <header className="w-[1175px] flex flex-row items-start justify-between gap-5 max-w-full text-left text-21xl text-white font-outfit">
        <div className="flex flex-col items-start justify-start pt-[11px] px-0 pb-0">
          <a className="[text-decoration:none] relative tracking-[0.03em] leading-[29px] font-black text-transparent !bg-clip-text [background:linear-gradient(87.3deg,_#9945ff,_#5398d5_23.28%,_#5a8fd9_43.1%,_#3e5586_60.68%,_#19fb9b)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] inline-block min-w-[125px] whitespace-nowrap">
            LOGO
          </a>
        </div>
        <div className="w-[502px] flex flex-col items-start justify-start pt-2.5 pb-0 pl-0 pr-[30px] box-border max-w-full text-right text-xl font-poppins mq825:w-[30px]">
          <div className="self-stretch flex flex-row items-start justify-between gap-5 mq825:hidden">
            <div className="flex flex-row items-start justify-start gap-2.5">
              <a className="[text-decoration:none] relative text-[inherit] inline-block min-w-[60px]">
                Home
              </a>
              <div className="flex flex-col items-start justify-start pt-3 px-0 pb-0">
                <img
                  className="w-[13px] h-[7px] relative"
                  alt=""
                  src="/nav-icon-images.svg"
                />
              </div>
            </div>
            <div className="flex flex-row items-start justify-start gap-2.5">
              <a className="[text-decoration:none] relative text-[inherit] inline-block min-w-[60px]">
                About
              </a>
              <div className="flex flex-col items-start justify-start pt-3 px-0 pb-0">
                <img
                  className="w-[13px] h-[7px] relative"
                  alt=""
                  src="/nav-icon-images.svg"
                />
              </div>
            </div>
            <div className="flex flex-row items-start justify-start gap-2.5">
              <a className="[text-decoration:none] relative text-[inherit] inline-block min-w-[40px]">
                FAQ
              </a>
              <div className="flex flex-col items-start justify-start pt-3 px-0 pb-0">
                <img
                  className="w-[13px] h-[7px] relative"
                  alt=""
                  src="/nav-icon-images.svg"
                />
              </div>
            </div>
            <div className="flex flex-row items-start justify-start gap-2.5">
              <a className="[text-decoration:none] relative text-[inherit] inline-block min-w-[58px]">
                Team
              </a>
              <div className="flex flex-col items-start justify-start pt-3 px-0 pb-0">
                <img
                  className="w-[13px] h-[7px] relative"
                  alt=""
                  src="/nav-icon-images.svg"
                />
              </div>
            </div>
          </div>
        </div>
        <button className="cursor-pointer [border:none] py-[12.6px] px-[27px] bg-gray-700 rounded-[25.91px] flex flex-row items-start justify-start whitespace-nowrap hover:bg-gainsboro">
          <a className="[text-decoration:none] relative text-base-8 font-poppins text-white text-right">
            Register Now/Login
          </a>
        </button>
      </header>
    </section>
  );
};

MainContent.propTypes = {
  className: PropTypes.string,
};

export default MainContent;

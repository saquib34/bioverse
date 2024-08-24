import PropTypes from "prop-types";

const LongCard = ({ className = "" }) => {
  return (
    <div
      className={`w-[1352px] flex flex-row items-start justify-start max-w-full z-[1] text-justify text-5xl text-white font-poppins ${className}`}
    >
      <div className="flex-1 [backdrop-filter:blur(28px)] rounded-3xl bg-gray-500 overflow-hidden flex flex-col items-start justify-start pt-[102px] px-[50px] pb-[102.6px] box-border relative max-w-full mq450:pt-[66px] mq450:pb-[67px] mq450:box-border mq1425:pl-[25px] mq1425:pr-[25px] mq1425:box-border">
        <img
          className="w-[1483px] h-[471px] absolute !m-[0] top-[-54px] left-[-66px] object-cover"
          alt=""
          src="/image-12@2x.png"
        />
        <div className="self-stretch relative leading-[122.57%] font-medium z-[1] mq450:text-lgi mq450:leading-[24px]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat Lorem ipsum dolor sit amet,
          consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et do
        </div>
      </div>
    </div>
  );
};

LongCard.propTypes = {
  className: PropTypes.string,
};

export default LongCard;

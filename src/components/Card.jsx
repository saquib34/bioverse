import PropTypes from "prop-types";

const Card = ({ className = "", image13 }) => {
  return (
    <div
      className={`[backdrop-filter:blur(28px)] rounded-3xl bg-gray-500 overflow-hidden flex flex-row items-start justify-start pt-[106.6px] pb-[105.4px] pl-[33px] pr-8 box-border max-w-full text-justify text-lg text-white font-poppins mq450:pt-[69px] mq450:pb-[69px] mq450:box-border ${className}`}
    >
      <div className="flex-1 flex flex-row items-start justify-start relative max-w-full">
        <img
          className="h-[389px] w-[438px] absolute !m-[0] top-[-118.6px] left-[calc(50%_-_219px)] object-cover"
          loading="lazy"
          alt=""
          src={image13}
        />
        <div className="flex-1 relative leading-[122.57%] font-medium inline-block max-w-full z-[1]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  className: PropTypes.string,
  image13: PropTypes.string,
};

export default Card;

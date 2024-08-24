import { useMemo } from "react";
import PropTypes from "prop-types";

const GroupComponent = ({
  className = "",
  whyUtEnimAdMinimVeniamQuis,
  propBackground,
  propAlignSelf,
  group36813,
}) => {
  const whyUtEnimStyle = useMemo(() => {
    return {
      background: propBackground,
      alignSelf: propAlignSelf,
    };
  }, [propBackground, propAlignSelf]);

  return (
    <div
      className={`self-stretch shadow-[0px_2.4px_7.24px_rgba(19,_18,_66,_0.07)] rounded-lgi-3 bg-gray-600 flex flex-row items-start justify-start pt-[48.2px] px-[39px] pb-[48.3px] box-border gap-[68.2px] max-w-full z-[1] text-left text-6xl-9 font-poppins mq450:gap-[17px] mq825:gap-[34px] mq825:flex-wrap ${className}`}
    >
      <div className="h-[146.5px] w-[682.6px] relative shadow-[0px_2.4px_7.24px_rgba(19,_18,_66,_0.07)] rounded-lgi-3 bg-gray-600 hidden max-w-full" />
      <div className="flex-1 flex flex-col items-start justify-start pt-[5.3px] px-0 pb-0 box-border min-w-[316px] max-w-full">
        <div
          className="relative leading-[33.8px] text-transparent !bg-clip-text [background:linear-gradient(90deg,_#1fcef0,_#20a7df_67%,_#2351b8)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] z-[1] mq450:text-2xl mq450:leading-[27px]"
          style={whyUtEnimStyle}
        >
          {whyUtEnimAdMinimVeniamQuis}
        </div>
      </div>
      <img
        className="h-[50px] w-[50px] relative z-[1]"
        loading="lazy"
        alt=""
        src={group36813}
      />
    </div>
  );
};

GroupComponent.propTypes = {
  className: PropTypes.string,
  whyUtEnimAdMinimVeniamQuis: PropTypes.string,
  group36813: PropTypes.string,

  /** Style props */
  propBackground: PropTypes.any,
  propAlignSelf: PropTypes.any,
};

export default GroupComponent;

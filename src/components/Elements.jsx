import { useMemo } from "react";
import PropTypes from "prop-types";

const Elements = ({
  className = "",
  propAlignSelf,
  propWidth,
  imagePlaceholder,
  jobTitle,
}) => {
  const elementsStyle = useMemo(() => {
    return {
      alignSelf: propAlignSelf,
      width: propWidth,
    };
  }, [propAlignSelf, propWidth]);

  return (
    <div
      className={`self-stretch rounded-[23.92px] bg-gray-600 flex flex-col items-start justify-start pt-0 px-0 pb-[32.5px] box-border gap-[17px] max-w-full text-left text-2xl-5 text-white font-inter ${className}`}
      style={elementsStyle}
    >
      <img
        className="self-stretch h-[446px] relative rounded-[23.92px] max-w-full overflow-hidden shrink-0 object-cover"
        loading="lazy"
        alt=""
        src={imagePlaceholder}
      />
      <div className="self-stretch flex flex-col items-start justify-start py-0 px-[19px] box-border gap-[28.7px] max-w-full">
        <div className="self-stretch flex flex-row items-start justify-start max-w-full">
          <div className="flex-1 flex flex-col items-start justify-start gap-[4.8px] max-w-full">
            <div className="self-stretch relative leading-[36px] font-semibold shrink-0 mq450:text-mid mq450:leading-[29px]">
              Jordyn Septimus
            </div>
            <div className="self-stretch relative text-base-7 leading-[27px] text-gray-100 shrink-0">
              {jobTitle}
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-row items-start justify-start">
          <div className="flex flex-row items-start justify-start gap-[19.2px]">
            <img
              className="h-[43px] w-[43px] relative rounded-[119.58px] min-h-[43px]"
              alt=""
              src="/icon-box.svg"
            />
            <img
              className="h-[43px] w-[43px] relative rounded-[119.58px] object-cover min-h-[43px]"
              alt=""
              src="/icon-box-1@2x.png"
            />
            <img
              className="h-[43px] w-[43px] relative rounded-[119.58px] min-h-[43px]"
              alt=""
              src="/icon-box-2.svg"
            />
            <img
              className="h-[43px] w-[43px] relative rounded-[119.58px] hidden min-h-[43px]"
              alt=""
              src="/icon-box1.svg"
            />
            <img
              className="h-[43px] w-[43px] relative rounded-[119.58px] hidden min-h-[43px]"
              alt=""
              src="/icon-box2.svg"
            />
            <img
              className="h-[43px] w-[43px] relative rounded-[119.58px] object-cover hidden min-h-[43px]"
              alt=""
              src="/icon-box3@2x.png"
            />
            <img
              className="h-[43px] w-[43px] relative rounded-[119.58px] object-cover hidden min-h-[43px]"
              alt=""
              src="/icon-box4@2x.png"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

Elements.propTypes = {
  className: PropTypes.string,
  imagePlaceholder: PropTypes.string,
  jobTitle: PropTypes.string,

  /** Style props */
  propAlignSelf: PropTypes.any,
  propWidth: PropTypes.any,
};

export default Elements;

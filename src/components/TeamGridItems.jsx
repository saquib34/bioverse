import { useMemo } from "react";
import Elements from "./Elements";
import PropTypes from "prop-types";

const TeamGridItems = ({
  className = "",
  propPadding,
  imagePlaceholder,
  jobTitle,
  propAlignSelf,
  propWidth,
}) => {
  const teamGridItemsStyle = useMemo(() => {
    return {
      padding: propPadding,
    };
  }, [propPadding]);

  return (
    <div
      className={`w-[410px] flex flex-col items-start justify-start pt-[145px] px-0 pb-0 box-border max-w-full mq450:pt-[61px] mq450:box-border mq825:pt-[94px] mq825:box-border ${className}`}
      style={teamGridItemsStyle}
    >
      <Elements
        propAlignSelf={propAlignSelf}
        propWidth={propWidth}
        imagePlaceholder={imagePlaceholder}
        jobTitle={jobTitle}
      />
    </div>
  );
};

TeamGridItems.propTypes = {
  className: PropTypes.string,
  imagePlaceholder: PropTypes.string,
  jobTitle: PropTypes.string,
  propAlignSelf: PropTypes.string,
  propWidth: PropTypes.string,

  /** Style props */
  propPadding: PropTypes.any,
};

export default TeamGridItems;

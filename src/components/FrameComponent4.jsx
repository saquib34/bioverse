import Elements from "./Elements";
import TeamGridItems from "./TeamGridItems";
import PropTypes from "prop-types";

const FrameComponent4 = ({ className = "" }) => {
  return (
    <section
      className={`self-stretch flex flex-row items-start justify-center pt-0 pb-[155px] pl-12 pr-5 box-border max-w-full lg:pb-[101px] lg:box-border mq825:pb-[66px] mq825:box-border mq1425:pl-6 mq1425:box-border ${className}`}
    >
      <div className="w-[1420px] flex flex-row items-start justify-between max-w-full gap-5 mq1425:flex-wrap mq1425:justify-center">
        <Elements
          propAlignSelf="unset"
          propWidth="410px"
          imagePlaceholder="/image-placeholder@2x.png"
          jobTitle="UI/UX Designer"
        />
        <TeamGridItems
          imagePlaceholder="/image-placeholder@2x.png"
          jobTitle="Front End Developer"
          propAlignSelf="stretch"
          propWidth="unset"
        />
        <TeamGridItems
          propPadding="290px 0px 0px"
          imagePlaceholder="/image-placeholder@2x.png"
          jobTitle="Front End Developer"
        />
      </div>
    </section>
  );
};

FrameComponent4.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent4;

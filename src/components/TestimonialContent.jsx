import GroupComponent from "./GroupComponent";
import PropTypes from "prop-types";

const TestimonialContent = ({ className = "" }) => {
  return (
    <section
      className={`self-stretch flex flex-row items-start justify-center pt-0 pb-[23px] pl-[21px] pr-5 box-border max-w-full text-left text-6xl-9 text-whitesmoke font-poppins ${className}`}
    >
      <div className="w-[1392.7px] flex flex-row items-start justify-center flex-wrap content-start gap-[27.5px] max-w-full">
        <div className="flex-1 flex flex-col items-start justify-start gap-[31.4px] min-w-[444px] max-w-full mq825:gap-4 mq825:min-w-full">
          <div className="self-stretch shadow-[0px_2.4px_7.24px_rgba(19,_18,_66,_0.07)] rounded-lgi-3 bg-gray-600 flex flex-row items-start justify-start pt-[48.2px] px-[38px] pb-[63.4px] box-border gap-[27.5px] max-w-full z-[1] mq825:flex-wrap">
            <div className="h-[275.4px] w-[682.6px] relative shadow-[0px_2.4px_7.24px_rgba(19,_18,_66,_0.07)] rounded-lgi-3 bg-gray-600 hidden max-w-full" />
            <div className="flex-1 flex flex-col items-start justify-start pt-[5.3px] px-0 pb-0 box-border min-w-[343px] max-w-full mq825:min-w-full">
              <div className="self-stretch flex flex-col items-start justify-start gap-[16.5px] max-w-full">
                <div className="w-[492px] relative leading-[33.8px] text-transparent !bg-clip-text [background:linear-gradient(90deg,_#ef86fe,_#ae52e6_67%,_#8a36d8)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] inline-block max-w-full z-[2] mq450:text-2xl mq450:leading-[27px]">
                  Why ut enim ad minim veniam quis?
                </div>
                <div className="self-stretch relative text-4xl-5 leading-[36.18px] z-[2] mq450:text-lgi mq450:leading-[29px]">
                  Ut enim ad minim veniam quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat aute irure
                  dolor
                </div>
              </div>
            </div>
            <div className="h-[50px] w-[50px] relative rounded-[9.65px] [background:linear-gradient(180deg,_#f7f7ff,_#c6c6cd_49.5%,_#949499)] z-[2]">
              <div className="absolute top-[0px] left-[0px] rounded-[9.65px] [background:linear-gradient(180deg,_#f7f7ff,_#c6c6cd_49.5%,_#949499)] w-full h-full hidden" />
              <img
                className="absolute top-[23.9px] left-[14.1px] w-[21.7px] h-[2.4px] z-[3]"
                loading="lazy"
                alt=""
                src="/group-36810.svg"
              />
            </div>
          </div>
          <div className="self-stretch shadow-[0px_2.4px_7.24px_rgba(19,_18,_66,_0.07)] rounded-lgi-3 bg-gray-600 flex flex-row items-start justify-start pt-[48.2px] px-[38px] pb-[48.3px] box-border gap-[42.8px] max-w-full z-[1] mq825:gap-[21px] mq825:flex-wrap">
            <div className="h-[146.5px] w-[682.6px] relative shadow-[0px_2.4px_7.24px_rgba(19,_18,_66,_0.07)] rounded-lgi-3 bg-gray-600 hidden max-w-full" />
            <div className="flex-1 flex flex-col items-start justify-start pt-[5.3px] px-0 pb-0 box-border min-w-[333px] max-w-full">
              <div className="relative leading-[34.1px] font-medium text-transparent !bg-clip-text [background:linear-gradient(90deg,_#18f69a,_#0f827b_71%,_#076f69)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] z-[1] mq450:text-2xl mq450:leading-[27px]">
                When ut enim ad minim veniam quis?`
              </div>
            </div>
            <img
              className="h-[50px] w-[50px] relative z-[1]"
              loading="lazy"
              alt=""
              src="/group-36813.svg"
            />
          </div>
          <GroupComponent
            whyUtEnimAdMinimVeniamQuis="Why ut enim ad minim veniam quis?`"
            group36813="/group-36813-1.svg"
          />
        </div>
        <div className="flex-1 flex flex-col items-start justify-start pt-[2.6px] px-0 pb-0 box-border min-w-[444px] max-w-full text-midnightblue mq825:min-w-full">
          <div className="self-stretch flex flex-col items-start justify-start gap-[28.9px] max-w-full">
            <GroupComponent
              whyUtEnimAdMinimVeniamQuis="Why ut enim ad minim veniam quis?`"
              propBackground="linear-gradient(90deg, #1fcef0, #20a7df 67%, #2351b8)"
              propAlignSelf="unset"
              group36813="/group-36813-2.svg"
            />
            <GroupComponent
              whyUtEnimAdMinimVeniamQuis="Why ut enim ad minim veniam quis?"
              propBackground="linear-gradient(90deg, #ef86fe, #ae52e6 67%, #8a36d8)"
              propAlignSelf="stretch"
              group36813="/group-36813-3.svg"
            />
            <div className="self-stretch shadow-[0px_2.4px_7.24px_rgba(19,_18,_66,_0.07)] rounded-lgi-3 bg-gray-600 flex flex-row items-start justify-start pt-[48.3px] px-[39px] pb-[48.2px] box-border gap-[31.5px] max-w-full z-[1] mq825:gap-4 mq825:flex-wrap">
              <div className="h-[146.5px] w-[682.6px] relative shadow-[0px_2.4px_7.24px_rgba(19,_18,_66,_0.07)] rounded-lgi-3 bg-gray-600 hidden max-w-full" />
              <div className="flex-1 flex flex-col items-start justify-start pt-[5.5px] px-0 pb-0 box-border min-w-[339px] max-w-full mq825:min-w-full">
                <div className="self-stretch relative leading-[33.77px] font-medium z-[1] mq450:text-2xl mq450:leading-[27px]">
                  When ut enim ad minim veniam quis?`
                </div>
              </div>
              <img
                className="h-[50px] w-[50px] relative z-[1]"
                loading="lazy"
                alt=""
                src="/group-36813-4.svg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

TestimonialContent.propTypes = {
  className: PropTypes.string,
};

export default TestimonialContent;

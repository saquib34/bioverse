import PropTypes from "prop-types";

const FrameComponent = ({ className = "" }) => {
  return (
    <section
      className={`self-stretch flex flex-row items-start justify-center pt-0 px-5 pb-[59px] box-border max-w-full text-center text-17xl text-white font-poppins ${className}`}
    >
      <div className="w-[1288px] flex flex-col items-end justify-start gap-[49px] max-w-full mq825:gap-6">
        <div className="self-stretch flex flex-col items-start justify-start gap-[45px] mq825:gap-[22px]">
          <b className="self-stretch relative tracking-[-0.03em] leading-[120%] z-[2] mq450:text-3xl mq450:leading-[26px] mq825:text-10xl mq825:leading-[35px]">
            September 29th and 30th, 2024
          </b>
          <blockquote className="m-0 self-stretch relative text-xl tracking-[-0.03em] leading-[120%] z-[2] mq450:text-base mq450:leading-[19px]">
            "Join Us for an Epic Biohacking Journey! Collaborate with Pioneers,
            Push the Boundaries of Science, and Shape the Future of
            Biotechnology Through Unprecedented Innovation and Creative
            Exploration."
          </blockquote>
        </div>
        <div className="self-stretch flex flex-row items-start justify-center py-0 pl-[21px] pr-5">
          <button className="cursor-pointer [border:none] pt-[18px] pb-[17px] pl-[75px] pr-[74px] bg-[transparent] rounded-18xl [background:linear-gradient(87.44deg,_#8b4c5e,_#863a7b_3%,_#802a91_13.5%,_#7d219e_13.51%,_#7125c5_49.5%,_#1b298f_73.5%,_#361064)] flex flex-row items-start justify-start whitespace-nowrap z-[2] mq450:pl-5 mq450:pr-5 mq450:box-border">
            <div className="relative text-5xl font-medium font-poppins text-white text-right">
              Register Now
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

FrameComponent.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent;

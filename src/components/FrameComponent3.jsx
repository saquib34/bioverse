import LongCard from "./LongCard";
import Card from "./Card";
import PropTypes from "prop-types";

const FrameComponent3 = ({ className = "" }) => {
  return (
    <section
      className={`self-stretch flex flex-row items-start justify-center pt-0 pb-[22.7px] pl-5 pr-[25px] box-border max-w-full text-left text-17xl text-white font-poppins ${className}`}
    >
      <div className="h-[1152.6px] w-[1363px] flex flex-col items-start justify-start pt-0 px-0 pb-[935.1px] box-border gap-[140.5px] max-w-full lg:pb-[395px] lg:box-border mq450:gap-[18px] mq825:gap-[35px] mq825:pb-[257px] mq825:box-border mq1425:gap-[70px] mq1425:pb-[608px] mq1425:box-border">
        <div className="w-[1289px] flex flex-col items-start justify-start gap-[67.5px] max-w-full shrink-0 mq450:gap-[17px] mq825:gap-[34px]">
          <h3 className="m-0 w-[450px] relative text-inherit leading-[99%] capitalize font-medium font-[inherit] inline-block max-w-full z-[1] mq450:text-3xl mq450:leading-[21px] mq825:text-10xl mq825:leading-[29px]">
            <p className="[margin-block-start:0] [margin-block-end:6px]">{`join a 36 hours verse of `}</p>
            <p className="m-0">infinite possibilities</p>
          </h3>
          <div className="self-stretch flex flex-row items-start justify-end max-w-full">
            <button className="cursor-pointer [border:none] py-[11px] pl-5 pr-[15px] bg-[transparent] rounded-18xl [background:linear-gradient(87.44deg,_#8b4c5e,_#863a7b_3%,_#802a91_13.5%,_#7d219e_13.51%,_#7125c5_49.5%,_#1b298f_73.5%,_#361064)] flex flex-row items-start justify-start box-border gap-[3px] max-w-full z-[1]">
              <div className="flex flex-col items-start justify-start pt-[7px] px-0 pb-0">
                <a
                  className="relative text-5xl font-medium font-poppins text-white text-right [text-decoration:none] mq450:text-lgi"
                  href={`https://www.figma.com/design/8c5RQyRQ8X91GtRDORQyxV/New-Bio-Verse?node-id=0-1&t=ipS0IujQHxvF61di-1`}
                  target="_blank"
                >
                  Download Brochure
                </a>
              </div>
              <img
                className="h-[50px] w-[50px] relative overflow-hidden shrink-0"
                alt=""
                src="/materialsymbolslightdownload.svg"
              />
            </button>
          </div>
        </div>
        <div className="self-stretch flex flex-col items-start justify-start gap-[50px] max-w-full shrink-0 text-justify text-5xl mq825:gap-[25px]">
          <LongCard />
          <div className="self-stretch flex flex-row items-start justify-start py-0 pl-1.5 pr-0 box-border max-w-full text-lg">
            <div className="flex-1 grid flex-row items-start justify-start gap-[50px] max-w-full grid-cols-[repeat(3,_minmax(314px,_1fr))] z-[1] lg:justify-center lg:grid-cols-[repeat(2,_minmax(314px,_545px))] mq825:gap-[25px] mq825:grid-cols-[minmax(314px,_1fr)]">
              <Card image13="/image-13@2x.png" />
              <Card image13="/image-13-1@2x.png" />
              <Card image13="/image-13-2@2x.png" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

FrameComponent3.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent3;

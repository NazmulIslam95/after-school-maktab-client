import TitleSec from "../../../Components/TitleSec/TitleSec";
import TutorCard from "./TutorCard";
import Slider from "react-slick";
import useAllTutors from "../../../CustomHooks/useAllTutors";

const OurTutors = () => {
  const { tutors } = useAllTutors();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
    ],
  };
  return (
    <div>
      <TitleSec subTitle="outTutors.subTitle" title="outTutors.title" />

      <div className=" gap-6 px-4 max-w-6xl mx-auto">
        <Slider {...settings}>
          {/* Slider for Tutor Cards */}
          {tutors.map((tutor) => (
            <div key={tutor.id} className="px-2">
              <TutorCard tutor={tutor} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default OurTutors;

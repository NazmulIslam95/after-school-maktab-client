import TitleSec from "../../../Components/TitleSec/TitleSec";
import teachers from "../../../../public/tutors.json";
import TutorCard from "./TutorCard";
import Slider from "react-slick";

const OurTutors = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };
  return (
    <div>
      <TitleSec
        subTitle="10 Experienced Islamic Teachers"
        title="Meet Our Teachers"
      ></TitleSec>
      <div className="gap-6 px-4 max-w-6xl mx-auto">
        <Slider {...settings}>
          {/* Slider for Tutor Cards */}
          {teachers.map((teacher) => (
            <div key={teacher.id} className="px-2">
              <TutorCard teacher={teacher} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default OurTutors;

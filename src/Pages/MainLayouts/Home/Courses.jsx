import { useEffect, useState } from "react";
import CourseCard from "../../../Components/CourseCard/CourseCard";
import coursesData from "../../../../public/courses.json";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Courses = () => {
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [showBg, setShowBg] = useState(false);

  useEffect(() => {
    const featured = coursesData.filter((course) => course.featured === true);
    setFeaturedCourses(featured);

    // Hide background image on small screens
    const handleResize = () => {
      setShowBg(window.innerWidth >= 768);
    };

    handleResize(); // Call initially
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
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
    <div
      className={`pb-12  ${showBg ? "bg-cover " : "bg-white"}`}
      style={{
        backgroundImage: showBg
          ? `url('https://naudummy.com/darsgah/wp-content/uploads/2024/04/background-img.jpg')`
          : "none",
      }}
    >
      {/* Top Section */}
      <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
        <img
          src="https://i.ibb.co/twsWp4Fd/logo-nameless.png"
          alt="Logo"
          className="w-16"
        />
        <p className="text-[#6a6a6a] text-base md:text-lg font-medium font-serif">
          Welcome To The After School Maktab
        </p>
        <h1 className="text-[#6a6a6a] text-3xl md:text-4xl font-bold font-serif leading-snug">
          Institute <span className="text-black">Focuses on Quality</span>
          <br className="hidden md:block" />
          Islamic Education
        </h1>
      </div>

      {/* Courses Section */}
      {/* <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featuredCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div> */}
      <div className="max-w-6xl mx-auto px-4">
        <Slider {...settings}>
          {featuredCourses.map((course) => (
            <div key={course.id} className="px-2">
              <CourseCard course={course} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Courses;

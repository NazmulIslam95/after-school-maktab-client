import { useEffect } from "react";
import { CgLaptop } from "react-icons/cg";
import { GiTeacher } from "react-icons/gi";
import TitleSec from "../../../Components/TitleSec/TitleSec";
import FeaturedCourses from "./FeaturedCourses";
import { useTranslation } from "react-i18next";
import useRecentStudents from "../../../CustomHooks/useRecentStudents";
import Marquee from "react-fast-marquee";

const IntroSec = () => {
  const { t } = useTranslation();
  const { recentStudents } = useRecentStudents();

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes float {
        0%, 100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-10px);
        }
      }
      .float {
        animation: float 3s ease-in-out infinite;
      }
      .float-delay {
        animation: float 3s ease-in-out infinite;
        animation-delay: 1.5s;
      }
      @keyframes slideOverlay {
        0% {
          width: 0;
        }
        100% {
          width: 100%;
        }
      }
      .green-overlay {
        position: relative;
        background-image: url('https://naudummy.com/darsgah/wp-content/uploads/2024/04/islamic-background.jpg');
        background-size: cover;
        background-position: center;
      }
      .green-overlay::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 0;
        background: rgba(5, 131, 73, 0.7); /* Semi-transparent green overlay */
        animation: slideOverlay 2s ease-in-out forwards;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div className="py-8 hind-siliguri-medium">
      {/* Top Section */}
      <TitleSec subTitle="afterSchool.subTitle" title="afterSchool.title" />

      {/* Main Section */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 items-center mb-12">
        {/* Left Column */}
        <div className="w-full md:w-1/2 px-8 md:px-0">
          <div className="mb-8 md:mb-12 space-y-4">
            <img
              src="https://naudummy.com/darsgah/wp-content/plugins/ingeniofy/assets/images/bismillah.png"
              alt={t("bismillah")}
              className="w-32 md:w-40"
            />

            {/* Bilingual Heading */}
            <h3 className="text-[#058349] font-bold text-lg md:text-xl">
              {t("since_operating")}
            </h3>

            {/* Bilingual Description */}
            <p className="text-[#6a6a6a] text-sm md:text-base max-w-md">
              {t("institute_description")}
            </p>
          </div>

          {/* Features - Bilingual */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Feature 1 */}
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <div className="bg-[#ffb606] hover:bg-[#058349] p-4 md:p-5 rounded-full transition-colors">
                  <CgLaptop className="text-white text-xl" />
                </div>
                <h4 className="text-xl font-semibold">{t("online_courses")}</h4>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <div className="bg-[#ffb606] hover:bg-[#058349] p-4 md:p-5 rounded-full transition-colors">
                  <GiTeacher className="text-white text-xl" />
                </div>
                <h4 className="text-xl font-semibold">{t("online_tutors")}</h4>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Floating Images */}
        <div className="w-fit flex justify-center gap-6 md:gap-12 px-8 md:px-0">
          <img
            src="https://naudummy.com/darsgah/wp-content/uploads/2024/04/islamic-education-1.jpg"
            alt="Islamic Education 1"
            className="w-1/2 rounded-full shadow-lg float"
          />
          <img
            src="https://naudummy.com/darsgah/wp-content/uploads/2024/04/islamic-education-2.jpg"
            alt="Islamic Education 2"
            className="w-1/2 rounded-full shadow-lg float float-delay"
          />
        </div>
      </div>

      <div className="md:mb-12">
        <TitleSec subTitle="rStudents.subTitle" title="rStudents.title" />
        <Marquee gradient={false} speed={50} className="overflow-hidden">
          {recentStudents.map((student) => (
            <div
              key={student.id}
              className="md:w-50 bg-white flex flex-col items-center mx-3"
            >
              <img
                src={
                  student.image ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjhPKN6RoQ0Aj4jNvz1FgHZIjNf6e7Jtb66K4g59fcpJayo84AGft3nftNvuonR4eZ35c&usqp=CAU"
                }
                alt={student.name}
                className="w-20 h-20 rounded-full mb-3 object-cover"
                loading="lazy"
              />
              <h3 className="text-lg font-semibold text-center">
                {student.name}
              </h3>
              <p className="text-sm text-gray-500 text-center">
                {student.address}
              </p>
            </div>
          ))}
        </Marquee>
      </div>

      <FeaturedCourses />
      {/* ---------------BG Section-------------------- */}
      <div
        className="w-full md:h-[500px] relative bg-cover bg-center my-12"
        style={{
          backgroundImage: `url('https://i.ibb.co/YFkgYgv2/mosque-4196145-1280.jpg')`,
        }}
      >
        <div className="absolute rounded-lg inset-0 bg-black opacity-80" />
        <div className="h-full max-w-6xl mx-auto relative rounded-lg text-white px-8 py-8 flex flex-col md:flex-row items-center justify-center gap-6">
          <div className="flex items-center justify-center">
            <img
              src="https://aalimlearning.com/assets/images/resources/img1.jpg"
              alt="Reached Over"
              className="md:w-96 md:h-72 w-64 h-48 rounded-full shadow-lg shadow-[#000000] mb-4 md:mb-0 object-cover"
            />
          </div>
          <div className="flex items-center justify-center text-center md:text-left w-full md:w-2/3">
            <h2 className="text-xl md:text-3xl font-bold text-white">
              {t("homeBanner.description")}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroSec;

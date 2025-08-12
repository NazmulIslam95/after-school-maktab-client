import { useEffect } from "react";
import { CgLaptop } from "react-icons/cg";
import { GiTeacher } from "react-icons/gi";
import { PiBookOpenTextDuotone } from "react-icons/pi";
import TitleSec from "../../../Components/TitleSec/TitleSec";
import FeaturedCourses from "./FeaturedCourses";

const IntroSec = () => {
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
    <div className="px-4 py-8">
      {/* Top Section */}
      <TitleSec subTitle="afterSchool.subTitle" title="afterSchool.title" />

      {/* Main Section */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 items-center mb-12">
        {/* Left Column */}
        <div className="w-full md:w-1/2">
          <div className="mb-8 md:mb-12 space-y-4">
            <img
              src="https://naudummy.com/darsgah/wp-content/plugins/ingeniofy/assets/images/bismillah.png"
              alt="Bismillah"
              className="w-32 md:w-40"
            />
            <h3 className="text-[#058349] font-serif font-bold text-lg md:text-xl">
              Since 2024 Operating In The World
            </h3>
            <p className="text-[#6a6a6a] text-sm md:text-base font-serif max-w-md">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation.
            </p>
          </div>

          {/* Features */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Feature 1 */}
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <div className="bg-[#ffb606] hover:bg-[#058349] p-4 md:p-5 rounded-full transition-colors">
                  <CgLaptop className="text-white text-xl" />
                </div>
                <h4 className="text-xl font-semibold font-serif">
                  Online Islamic Courses
                </h4>
              </div>
              <hr className="my-3 border-[#ffb606]" />
              <p className="text-sm text-gray-600">
                Learn Quran and Islamic studies at your own pace online.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <div className="bg-[#ffb606] hover:bg-[#058349] p-4 md:p-5 rounded-full transition-colors">
                  <GiTeacher className="text-white text-xl" />
                </div>
                <h4 className="text-xl font-semibold font-serif">
                  Online Quran Tutors
                </h4>
              </div>
              <hr className="my-3 border-[#ffb606]" />
              <p className="text-sm text-gray-600">
                Qualified tutors available for personalized Quran learning.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Floating Images */}
        <div className="w-fit flex justify-center gap-6 md:gap-12">
          <img
            src="https://naudummy.com/darsgah/wp-content/uploads/2024/04/islamic-education-1.jpg"
            alt="Islamic Education 1"
            className="w-1/3 rounded-full shadow-lg float"
          />
          <img
            src="https://naudummy.com/darsgah/wp-content/uploads/2024/04/islamic-education-2.jpg"
            alt="Islamic Education 2"
            className="w-1/3 rounded-full shadow-lg float float-delay"
          />
        </div>
      </div>

      <FeaturedCourses />
      {/* ---------------BG Section-------------------- */}
      <div
        className="max-w-6xl mx-auto  relative bg-cover bg-center rounded-lg mt-12"
        style={{
          backgroundImage: `url('https://i.ibb.co/YFkgYgv2/mosque-4196145-1280.jpg')`,
        }}
      >
        <div className="absolute rounded-lg inset-0 bg-black opacity-80" />
        <div className="relative rounded-lg  text-white px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <img
              src="https://naudummy.com/darsgah/wp-content/uploads/2024/04/reached-over.jpg"
              alt="Reached Over"
              className="w-96 rounded-full shadow-lg shadow-[#000000] mb-4 md:mb-0"
            />
          </div>
          <div className="text-center md:text-left space-y-8 w-full md:w-2/3">
            <h2 className="text-2xl md:text-5xl font-serif text-white">
              Alhamdulillah! Our numbers <br /> have surpassed 1 million.
            </h2>
            <p className="text-xs md:text-base text-white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroSec;

import { useEffect } from "react";
import { CgLaptop } from "react-icons/cg";
import { GiTeacher } from "react-icons/gi";
import { PiBookOpenTextDuotone } from "react-icons/pi";

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
    <div className="max-w-6xl mx-auto px-4 py-8">
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

      {/* Main Section */}
      <div className="flex flex-col md:flex-row gap-8 items-center">
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

      {/* -----------------Bottom Green BG Section-------------------- */}
      <div
        className="relative bg-cover bg-center rounded-lg mt-12"
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
          <div className="text-center md:text-left space-y-8 w-2/3">
            <h2 className="text-5xl font-serif text-white">
              Alhamdulillah! Our numbers <br /> have surpassed 1 million.
            </h2>
            <p className="text-sm md:text-base text-white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et.
            </p>
            <button className=" bg-[#0d3e93] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#082f72] transition">
              Explore Courses
            </button>
          </div>
        </div>
      </div>

      {/* ----------------Three Point section------------------ */}
      <div className="flex flex-col md:flex-row gap-4 my-12">
        <div className="flex gap-4 w-1/3">
          <div className="px-4 text-4xl bg-[#0d3e93] text-white  rounded-full flex items-center justify-center">
            <PiBookOpenTextDuotone />
          </div>
          <div className="flex gap-4 flex-col items-center justify-center text-left">
            <h1 className="text-2xl font-serif font-semibold">
              Learn quick Quran Classes
            </h1>
            <p>
              Lorem ipsum dolor sit amet, co nsectetur adipiscing elit, sed do
              eiusmod tempo.
            </p>
          </div>
        </div>
        <div className="flex gap-4 w-1/3">
          <div className="px-4 text-4xl bg-[#0d3e93] text-white  rounded-full flex items-center justify-center">
            <PiBookOpenTextDuotone />
          </div>
          <div className="flex gap-4 flex-col items-center justify-center text-left">
            <h1 className="text-2xl font-serif font-semibold">
              ISO certified islamic institution
            </h1>
            <p>
              Lorem ipsum dolor sit amet, co nsectetur adipiscing elit, sed do
              eiusmod tempo.
            </p>
          </div>
        </div>
        <div className="flex gap-4 w-1/3">
          <div className="px-4 text-4xl bg-[#0d3e93] text-white  rounded-full flex items-center justify-center">
            <PiBookOpenTextDuotone />
          </div>
          <div className="flex gap-4 flex-col items-center justify-center text-left">
            <h1 className="text-2xl font-serif font-semibold">
              Online Arabic Classes For Kids
            </h1>
            <p>
              Lorem ipsum dolor sit amet, co nsectetur adipiscing elit, sed do
              eiusmod tempo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroSec;

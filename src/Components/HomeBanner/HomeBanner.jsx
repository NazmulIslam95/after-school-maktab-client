import React from "react";
import { useTranslation } from "react-i18next";
import { FaArrowDownLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";

const HomeBanner = () => {
  const { t, i18n } = useTranslation();
  const fontClass =
    i18n.language === "BN" ? "hind-siliguri-medium" : "philosopher-regular";

  return (
    <div className={`relative h-screen w-full overflow-hidden ${fontClass}`}>
      {/* Background Image */}
      <img
        src="https://plus.unsplash.com/premium_photo-1677013623482-6d71ca2dc71a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt={t("homeBanner.backgroundAlt")}
        className="w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-50" />

      {/* Banner Content */}
      <div className="absolute inset-0 z-10 mt-32 flex items-center justify-center px-4">
        <div className="max-w-7xl w-full flex flex-col md:flex-row justify-between items-center text-white">
          {/* Left Content */}
          <div className="md:w-1/2 space-y-6 text-center md:text-left">
            <h1 className="text-xs md:text-xl font-bold">
              <TypeAnimation
                preRenderFirstString={true}
                sequence={[
                  500,
                  t("homeBanner.typeAnimation.first"),
                  1000,
                  t("homeBanner.typeAnimation.second"),
                ]}
                speed={25}
                style={{ fontSize: "2em" }}
                repeat={Infinity}
              />
            </h1>
            <p className="text-sm md:text-xl">{t("homeBanner.description")}</p>
            <Link to="/AllCourses">
              <button className="px-6 py-2 rounded-full my-4 bg-[#0d3e93] text-white font-semibold transition-colors duration-300 ease-in-out border border-transparent hover:bg-transparent hover:border-white">
                {t("homeBanner.exploreButton")}
              </button>
            </Link>
          </div>

          {/* Right Visual Section */}
          <div className="md:w-1/2 relative flex justify-center mt-12 md:mt-48">
            {/* Yellow Box in Bottom Left */}

            {/* Student Image overlapping box */}
            <div className="hidden md:block relative -mt-24 md:-mt-32 z-10">
              <img
                src="https://images.unsplash.com/photo-1629273229214-d96be4552b9a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Students"
                className="w-40 md:w-xl rounded-full shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <a
        href="#next-section"
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce text-2xl text-white transition z-20"
      >
        <FaArrowDownLong />
      </a>
    </div>
  );
};

export default HomeBanner;

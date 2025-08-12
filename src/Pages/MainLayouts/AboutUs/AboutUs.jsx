import React from "react";
import { useTranslation } from "react-i18next";
import Navbar from "../../../Components/Navbar/Navbar";
import Banner from "../../../Components/Banner/Banner";

const AboutUs = () => {
  const { t, i18n } = useTranslation();
  const fontClass =
    i18n.language === "BN" ? "hind-siliguri-medium" : "philosopher-regular";

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Banner title={t("aboutUs.title")} subTitle={t("aboutUs.subTitle")} />
      <div
        className={`container max-w-6xl mx-auto px-4 py-12 space-y-12 ${fontClass}`}
      >
        {/* Introduction Section - Aligned Right with Image */}
        <section className="flex flex-col md:flex-row justify-end items-center bg-[#eeee] rounded-lg p-8">
          <div className="md:w-1/2 mb-6 md:mb-0 md:pr-6 order-2 md:order-1">
            <img
              src="https://img.freepik.com/premium-vector/muslim-boys-group-studying-together-hand-drawn-art_175462-328.jpg?w=1480"
              alt="Islamic Education"
              className="w-full h-auto max-w-xl"
            />
          </div>
          <div className="md:w-1/2 order-1 md:order-2">
            <h2 className="text-2xl md:text-3xl font-bold text-indigo-800 mb-4">
              {t("aboutUs.article.introduction.title")}
            </h2>
            <div className="text-black leading-relaxed text-lg">
              <p
                dangerouslySetInnerHTML={{
                  __html: t("aboutUs.article.introduction.text"),
                }}
              />
            </div>
          </div>
        </section>

        {/* Goals Section - Aligned Left */}
        <section className="flex flex-col md:flex-row justify-start items-center bg-gradient-to-r from-indigo-50 to-gray-50 rounded-lg p-8 border-l-4 border-indigo-500">
          <div className="md:w-1/2">
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">
              {t("aboutUs.article.goals.title")}
            </h2>
            <div className="text-black leading-relaxed text-lg">
              <p
                dangerouslySetInnerHTML={{
                  __html: t("aboutUs.article.goals.text"),
                }}
              />
            </div>
          </div>
        </section>

        {/* Programs Section - Center */}
        <section className="flex flex-col md:flex-row justify-center items-center p-8">
          <div className="md:w-1/2 mb-6 md:mb-0 md:pr-6">
            <h2 className="text-2xl md:text-3xl font-bold text-indigo-800 mb-4">
              {t("aboutUs.article.programs.title")}
            </h2>
            <div className="text-black leading-relaxed text-lg">
              <p
                dangerouslySetInnerHTML={{
                  __html: t("aboutUs.article.programs.text"),
                }}
              />
              <ul className="list-disc pl-6 mt-4">
                {t("aboutUs.article.programs.courses", {
                  returnObjects: true,
                }).map((course, index) => (
                  <li key={index} className="mb-2">
                    {course}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section - Aligned Right with Image */}
        <section className="flex flex-col md:flex-row justify-end items-center bg-[#e9dea0] rounded-lg p-8">
          <div className="md:w-1/2 mb-6 md:mb-0 md:pr-6 order-2 md:order-1">
            <img
              src="https://img.freepik.com/premium-vector/muslim-men-group-studying-together-hand-drawn-art_175462-295.jpg?w=1480"
              alt="Qualified Teachers"
              className="w-full h-auto max-w-xl"
            />
          </div>
          <div className="md:w-1/2 order-1 md:order-2">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              {t("aboutUs.article.whyChooseUs.title")}
            </h2>
            <div className="text-gray-700 leading-relaxed text-lg">
              <ul className="list-disc pl-6">
                {t("aboutUs.article.whyChooseUs.points", {
                  returnObjects: true,
                }).map((point, index) => (
                  <li key={index} className="mb-2">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Vision Section - Aligned Left with Right-to-Left Gradient and Right-Aligned Text */}
        <section className="flex flex-col md:flex-row justify-start items-center bg-gradient-to-r from-indigo-50 to-gray-50 rounded-lg p-8 border-l-4 border-indigo-500">
          <div className="md:w-1/2">
            <h2 className="text-2xl md:text-3xl font-bold text-indigo-800 mb-4">
              {t("aboutUs.article.vision.title")}
            </h2>
            <div className="text-gray-700 leading-relaxed text-lg">
              <p
                dangerouslySetInnerHTML={{
                  __html: t("aboutUs.article.vision.text"),
                }}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;

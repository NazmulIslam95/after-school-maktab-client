import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

const CourseCard = ({ course }) => {
  const { t, i18n } = useTranslation();
  useEffect(() => {}, [i18n.language, i18n.languages, i18n.resolvedLanguage]);
  const language = ["BN"].includes(i18n.language) ? "bn" : "en";

  // Dynamically choose font class
  const fontClass =
    i18n.language === "BN" ? "hind-siliguri-medium" : "philosopher-bold";

  return (
    <div
      className={`bg-white ${fontClass} rounded-md shadow-md overflow-hidden hover:shadow-lg transition-colors duration-300 border border-transparent hover:border hover:border-[#0d3e93]`}
    >
      <img
        src={course.image}
        alt={course.name[language] || "Course Image"}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl h-12 font-semibold mb-4">
          {course.name[language] || "Name not available"}
        </h2>
        <p className="text-sm text-gray-600 line-clamp-3 h-12">
          {course.description[language] || "Description not available"}
        </p>

        <Link to={`/course/${course._id}`}>
          <button className="w-full bg-[#0d3e93] text-white px-6 py-2 rounded-md font-semibold transition-colors duration-300 ease-in-out border border-transparent hover:bg-white hover:text-[#0d3e93] hover:border-[#0d3e93]">
            {t("seeDetails")}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;

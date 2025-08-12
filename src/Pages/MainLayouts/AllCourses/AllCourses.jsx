import { useEffect, useState } from "react";
import Banner from "../../../Components/Banner/Banner";
import Footer from "../../../Components/Footer/Footer";
import Navbar from "../../../Components/Navbar/Navbar";
import useAllCourses from "../../../CustomHooks/useAllCourses";
import CourseCard from "../../../Components/CourseCard/CourseCard";
import { Trefoil } from "ldrs/react";
import "ldrs/react/Trefoil.css";
import { useTranslation } from "react-i18next";

const AllCourses = () => {
  const { allCourses, loading } = useAllCourses();
  const [showBg, setShowBg] = useState(window.innerWidth >= 768);
  const { t, i18n } = useTranslation();
  const fontClass =
    i18n.language === "BN" ? "hind-siliguri-medium" : "philosopher-regular";
  // Handle background visibility on resize
  useEffect(() => {
    const handleResize = () => {
      setShowBg(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Trefoil
          size="100"
          stroke="2"
          strokeLength="0.15"
          bgOpacity="0.1"
          speed="1.4"
          color="black"
        />
      </div>
    );
  }

  // Separate courses by type
  const oneToOneCourses = allCourses.filter((c) => c.type === "1-to-1");
  const batchCourses = allCourses.filter((c) => c.type === "batch");

  return (
    <div>
      <Navbar />
      <Banner title="allCourses.title" subTitle="allCourses.subTitle" />

      <div
        className={`pb-12 ${showBg ? "bg-cover" : "bg-white"} ${fontClass}`}
        style={{
          backgroundImage: showBg ? `url('')` : "none",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 py-10 space-y-12">
          {/* 1-to-1 Courses */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">{t("courseCategory1")}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {oneToOneCourses.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          </div>

          {/* Batch Courses */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">{t("courseCategory2")}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {batchCourses.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AllCourses;

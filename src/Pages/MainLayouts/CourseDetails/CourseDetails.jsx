import { useLoaderData, useNavigate } from "react-router-dom";
import Banner from "../../../Components/Banner/Banner";
import Navbar from "../../../Components/Navbar/Navbar";
import { useState } from "react";
import Footer from "../../../Components/Footer/Footer";

const CourseDetails = () => {
  const course = useLoaderData();
  const navigate = useNavigate();
  // console.log("Course Data:", course);
  const [duration, setDuration] = useState("30min");
  const [days, setDays] = useState("3days");

  const getSelectedPrice = () => {
    if (course?.price?.[duration]?.[days]) {
      return `$${course.price[duration][days]}`;
    }
    return "N/A";
  };

  const handleAdmitNow = () => {
    const selectedPrice =
      course?.type === "1-to-1"
        ? course?.price?.[duration]?.[days]
        : course?.price;

    navigate("/admissionPage", {
      state: {
        courseId: course._id,
        courseName: course?.name?.bn,
        type: course.type,
        price: selectedPrice,
        duration: duration,
        days: days,
      },
    });
  };

  const handleBookDemo = () => {
    navigate("/bookDemo", {
      state: {
        courseId: course._id,
        courseName: course?.name?.bn,
        type: course.type,
      },
    });
  };

  return (
    <div>
      <Navbar />
      <Banner title={course?.name?.en} subTitle="Course" />

      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-10">
        <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-8 philosopher-bold">
          {/* Course Image */}
          <div className="w-full sm:w-1/3 mb-4 sm:mb-0">
            <img
              src={course.image}
              alt={course?.name?.en}
              className="rounded-xl w-full object-cover h-48 sm:h-64 md:h-80 lg:h-full"
            />
          </div>

          {/* Course Info */}
          <div className="w-full sm:w-2/3 flex flex-col justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-900 mb-2 sm:mb-3 font-cute flex items-center justify-center sm:justify-start gap-2 hind-siliguri-bold">
                {course?.name?.bn}
              </h2>
              <p className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-4 text-center sm:text-left hind-siliguri-bold">
                {course?.description?.bn}
              </p>
              <p className="text-sm text-gray-600 mb-3 sm:mb-4 flex items-center justify-center sm:justify-start gap-2">
                <span className="text-blue-900 font-semibold">📋 Session:</span>{" "}
                {course?.type}
              </p>

              {/* Categories */}
              <div className="mb-3 sm:mb-4 flex flex-wrap justify-center sm:justify-start gap-2">
                {course.categories?.map((cat, index) => (
                  <span
                    key={index}
                    className="inline-block bg-blue-100 text-blue-900 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold hover:bg-blue-200 transition-all duration-200"
                  >
                    {cat}
                  </span>
                ))}
              </div>

              {/* Conditional Pricing */}
              {course.type === "1-to-1" ? (
                <>
                  <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center sm:justify-start gap-4 mb-4 sm:mb-6">
                    <div className="flex items-center gap-2">
                      <label className="text-sm text-gray-600 font-semibold">
                        ⏳ Duration:
                      </label>
                      <select
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="border border-blue-200 px-2 sm:px-3 py-1 rounded-full bg-white text-gray-600 focus:ring-2 focus:ring-blue-300 focus:outline-none transition-all duration-200 text-sm"
                      >
                        <option value="30min">30 Minutes</option>
                        <option value="60min">60 Minutes</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="text-sm text-gray-600 font-semibold">
                        🗓️ Days:
                      </label>
                      <select
                        value={days}
                        onChange={(e) => setDays(e.target.value)}
                        className="border border-blue-200 px-2 sm:px-3 py-1 rounded-full bg-white text-gray-600 focus:ring-2 focus:ring-blue-300 focus:outline-none transition-all duration-200 text-sm"
                      >
                        <option value="3days">3 Days</option>
                        <option value="4days">4 Days</option>
                        <option value="5days">5 Days</option>
                        <option value="6days">6 Days</option>
                      </select>
                    </div>
                  </div>
                  <p className="text-base sm:text-lg text-gray-800 font-semibold flex items-center justify-center sm:justify-start gap-2">
                    <span className="text-blue-900"> Course Fee::</span>{" "}
                    <span className="text-blue-900">{getSelectedPrice()}</span>
                  </p>
                </>
              ) : (
                <div className="mt-4 sm:mt-6">
                  <p className="text-base sm:text-lg font-semibold text-blue-900 flex items-center justify-center sm:justify-start gap-2">
                    <span className="text-blue-900"> Course Fee:</span> $
                    {course.price}
                  </p>
                </div>
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-4 sm:mt-6">
              <button
                onClick={handleBookDemo}
                className="w-full bg-blue-900 text-white px-4 sm:px-6 py-2 rounded-full font-semibold transition-all duration-300 ease-in-out border border-transparent hover:bg-white hover:text-blue-900 hover:border-blue-900 transform  shadow-md"
              >
                Book A Demo Class 📚
              </button>
              <button
                onClick={handleAdmitNow}
                className="w-full bg-blue-900 text-white px-4 sm:px-6 py-2 rounded-full font-semibold transition-all duration-300 ease-in-out border border-transparent hover:bg-white hover:text-blue-900 hover:border-blue-900 transform  shadow-md"
              >
                Admit Now 🚀
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CourseDetails;

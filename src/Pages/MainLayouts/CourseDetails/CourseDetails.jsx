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

  const handleAddToCart = () => {
    const selectedPrice =
      course?.type === "1-to-1"
        ? course?.price?.[duration]?.[days]
        : course?.price;

    navigate("/paymentPage", {
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

  return (
    <div>
      <Navbar />
      <Banner title={course?.name?.bn} subTitle="Course" />

      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="bg-white rounded-xl shadow-md p-6 md:flex gap-8">
          {/* Course Image */}
          <div className="md:w-1/3 mb-6 md:mb-0">
            <img
              src={course.image}
              alt={course?.name?.bn}
              className="rounded-xl w-full object-cover h-64 md:h-full"
            />
          </div>

          {/* Course Info */}
          <div className="md:w-2/3">
            <h2 className="text-3xl font-bold text-[#0d3e93] mb-2">
              {course?.name?.bn}
            </h2>
            <p className="text-gray-600 mb-4">{course?.description?.bn}</p>

            <p className="text-sm text-gray-700 mb-2">
              <span className="font-semibold">Tutor:</span> {course?.tutor}
            </p>
            <p className="text-sm text-gray-700 mb-4">
              <span className="font-semibold">Type:</span> {course?.type}
            </p>

            {/* Categories */}
            <div className="mb-4">
              {course.categories?.map((cat, index) => (
                <span
                  key={index}
                  className="inline-block bg-[#edf2ff] text-[#0d3e93] px-3 py-1 rounded-full text-sm mr-2 mb-2"
                >
                  {cat}
                </span>
              ))}
            </div>

            {/* Conditional Pricing */}
            {course.type === "1-to-1" ? (
              <>
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div>
                    <label className="text-sm text-gray-700 font-medium mr-2">
                      Select Duration:
                    </label>
                    <select
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="border px-3 py-1 rounded-md"
                    >
                      <option value="30min">30 Minutes</option>
                      <option value="60min">60 Minutes</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm text-gray-700 font-medium mr-2">
                      Select Days:
                    </label>
                    <select
                      value={days}
                      onChange={(e) => setDays(e.target.value)}
                      className="border px-3 py-1 rounded-md"
                    >
                      <option value="3days">3 Days</option>
                      <option value="4days">4 Days</option>
                      <option value="5days">5 Days</option>
                      <option value="6days">6 Days</option>
                    </select>
                  </div>
                </div>

                <p className="text-lg text-gray-800 font-semibold">
                  Selected Price:{" "}
                  <span className="text-[#0d3e93]">{getSelectedPrice()}</span>
                </p>
              </>
            ) : (
              <div className="mt-6">
                <p className="text-xl font-semibold text-[#0d3e93]">
                  Course Fee: ${course.price}
                </p>
              </div>
            )}
            <button
              onClick={handleAddToCart}
              className="my-4 w-full bg-[#0d3e93] text-white px-6 py-2 rounded-md font-semibold transition-colors duration-300 ease-in-out border border-transparent hover:bg-white hover:text-[#0d3e93] hover:border-[#0d3e93]"
            >
              Purchase The Course
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CourseDetails;

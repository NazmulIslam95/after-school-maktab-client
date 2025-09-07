import { useLoaderData, useNavigate } from "react-router-dom";
import Banner from "../../../Components/Banner/Banner";
import Navbar from "../../../Components/Navbar/Navbar";
import { useState } from "react";
import Footer from "../../../Components/Footer/Footer";

const CourseDetails = () => {
  const course = useLoaderData();
  const navigate = useNavigate();
  const [duration, setDuration] = useState("30min");
  const [days, setDays] = useState("3days");
  const [showScholarshipModal, setShowScholarshipModal] = useState(false);

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
              <p className="text-sm uppercase text-gray-600 mb-3 sm:mb-4 font-bold flex items-center justify-center sm:justify-start gap-2">
                <span className="text-blue-900 capitalize font-bold">
                  📋 Session:
                </span>{" "}
                {course?.type === "1-to-1" ? "One To One" : course?.type}
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

              {/* Scholarship Button */}
              <div className="mb-4 sm:mb-6 flex justify-center sm:justify-start">
                <button
                  onClick={() => setShowScholarshipModal(true)}
                  className="flex items-center gap-2 bg-green-100 text-green-800 hover:bg-green-200 px-4 py-2 rounded-full transition-colors duration-200 hind-siliguri-bold"
                >
                  <span className="text-lg">🎓</span>
                  ভর্তির ক্ষেত্রে স্কলারশিপ সুবিধা
                  <span className="text-lg">ℹ️</span>
                </button>
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

      {/* Scholarship Modal */}
      {showScholarshipModal && (
        <div className="fixed inset-0 bg-[#0000007d] flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-blue-900 hind-siliguri-bold">
                  🎓 ভর্তির ক্ষেত্রে স্কলারশিপ সুবিধা
                </h2>
                <button
                  onClick={() => setShowScholarshipModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  &times;
                </button>
              </div>

              <div className="space-y-6">
                <p className="text-gray-700 hind-siliguri-regular">
                  আমাদের প্রতিষ্ঠান শিক্ষার্থীদের পারিবারিক আর্থিক স্বচ্ছলতা ও
                  পারস্পরিক সামাজিক সংযোগ বৃদ্ধির লক্ষ্যে বিশেষ স্কলারশিপ
                  ব্যবস্থা চালু করেছে। এর মাধ্যমে দাওয়াহ্‌র আলো পরিবারে,
                  বন্ধুমহলে এবং সমাজে ছড়িয়ে পড়বে, ইনশাআল্লাহ।
                </p>

                <div>
                  <h3 className="text-lg font-semibold text-blue-800 mb-3 hind-siliguri-bold">
                    স্কলারশিপের ধরনসমূহ
                  </h3>

                  <div className="bg-blue-50 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold text-blue-700 mb-2 hind-siliguri-bold">
                      1. Waiver – ২০% ছাড়
                    </h4>
                    <p className="text-gray-600 hind-siliguri-regular">
                      একই পরিবারের একাধিক সদস্য ভর্তি হলে, প্রতিটি অতিরিক্ত
                      শিক্ষার্থী তার মাসিক বেতনে <span className="font-bold">২০%</span> ছাড় উপভোগ করবে। এ সুবিধা
                      নিয়মিত মাসিক ফি-এর ক্ষেত্রে প্রযোজ্য।
                    </p>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-700 mb-2 hind-siliguri-bold">
                      2. Referral Waiver – ১৫% ছাড় (উভয়ের জন্য)
                    </h4>
                    <p className="text-gray-600 hind-siliguri-regular">
                      আপনার পরিচয়ে কোনো নতুন শিক্ষার্থী ভর্তি হলে, আপনি এবং নতুন
                      শিক্ষার্থী উভয়েই মাসিক বেতনে <span className="font-bold">১৫%</span> ছাড় পাবেন। এ সুবিধা ভর্তি
                      প্রক্রিয়া সম্পন্ন হওয়ার পরবর্তী মাস থেকে কার্যকর হবে।
                    </p>
                  </div>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r">
                  <h4 className="font-semibold text-yellow-800 mb-2 hind-siliguri-bold">
                    📌 শর্তাবলি
                  </h4>
                  <ul className="text-yellow-700 space-y-2 hind-siliguri-regular">
                    <li>
                      • সকল ছাড় কেবল নিয়মিত মাসিক বেতনের ক্ষেত্রে প্রযোজ্য।
                    </li>
                    <li>
                      • একই পরিবারের সদস্য যতজন ভর্তি হোন না কেন—ভাই-বোন,
                      মা-বাবা কিংবা স্বামী-স্ত্রী—সকলেই এই সুবিধার আওতায় আসবেন।
                    </li>
                    <li>
                      • Referral Waiver স্কলারশিপেও যতজন আপনার মাধ্যমে
                      ভর্তি হবে, প্রত্যেকেই উক্ত ছাড়ের অন্তর্ভুক্ত হবে।
                    </li>
                    <li>
                      • ছাড় প্রাপ্তির জন্য প্রয়োজনীয় প্রমাণপত্র ও তথ্যাদি প্রদান
                      করা বাধ্যতামূলক।
                    </li>
                  </ul>
                </div>

                <div className="flex justify-end mt-6">
                  <button
                    onClick={() => setShowScholarshipModal(false)}
                    className="hind-siliguri-regular bg-blue-900 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-800 transition-colors"
                  >
                    বুঝেছি
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default CourseDetails;

import React, { useState, useEffect } from "react";
import DashboardBanner from "../../../Components/DashboardBanner/DashboardBanner";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import useAllTutors from "../../../CustomHooks/useAllTutors";
import { MdRateReview } from "react-icons/md";
import Swal from "sweetalert2";
import useAuth from "../../../CustomHooks/useAuth";

const AssignedCourses = () => {
  const { user } = useAuth();
  const { tutors } = useAllTutors();
  const [courses, setCourses] = useState([]);
  const [zoomLink, setZoomLink] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewData, setReviewData] = useState({
    attendance: "",
    preparation: "",
    attention: "",
    comments: "",
  });
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user?.email) return;

        // 1. Fetch assigned courses
        const res1 = await axiosSecure.get(
          `/assignedCourses?tutorEmail=${user.email}`
        );
        setCourses(res1.data);

        // 2. Get Zoom link from tutor info
        const meAsTutor = tutors.find((tutor) => tutor.email === user.email);
        setZoomLink(meAsTutor?.zoomLink || "");

        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch assigned courses or tutor info", err);
        setLoading(false);
      }
    };

    fetchData();
  }, [user, axiosSecure, tutors]);

  const handleReviewSubmit = async () => {
    try {
      const today = new Date().toISOString().split("T")[0];
      const hasReviewedToday = selectedCourse.reviews?.some(
        (r) => r.reviewerType === "tutor" && r.date.split("T")[0] === today
      );

      if (hasReviewedToday) {
        Swal.fire({
          icon: "warning",
          title: "Already Reviewed",
          text: "You have already submitted a review for today",
          confirmButtonColor: "#082f72",
        });
        return;
      }

      const res = await axiosSecure.patch(
        `/tutorReview/${selectedCourse._id}`,
        {
          reviewerType: "tutor",
          answers: {
            q1: reviewData.attendance,
            q2: reviewData.preparation,
            q3: reviewData.attention,
          },
          comments: reviewData.comments,
        }
      );

      if (res.data.success) {
        Swal.fire({
          icon: "success",
          title: "Review Submitted",
          text: "Your review has been recorded",
          confirmButtonColor: "#082f72",
        });
        setShowReviewModal(false);
        // Refresh data
        const updatedCourses = await axiosSecure.get(
          `/assignedCourses?tutorEmail=${user.email}`
        );
        setCourses(updatedCourses.data);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to Submit Review",
        text: error.response?.data?.message || "Something went wrong",
        confirmButtonColor: "#082f72",
      });
    }
  };

  return (
    <div>
      <DashboardBanner title="Assigned Courses" subTitle="Courses" />

      {loading && (
        <p className="text-center mt-6">Loading assigned courses...</p>
      )}

      {!loading && courses.length === 0 && (
        <p className="text-center mt-6">No assigned courses found.</p>
      )}

      {!loading && courses.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
          {courses.map((course) => {
            const today = new Date().toISOString().split("T")[0];
            const hasReviewedToday = course.reviews?.some(
              (r) =>
                r.reviewerType === "tutor" && r.date.split("T")[0] === today
            );

            return (
              <div
                key={course._id || course.id}
                className="relative bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg p-6 border border-blue-100 hover:shadow-xl transform transition-all duration-300 hover:bg-blue-50 philosopher-bold"
              >
                <h3 className="text-xl font-bold text-blue-900 mb-3 font-cute flex items-center justify-center gap-2 hind-siliguri-bold">
                  {course.courseName}{" "}
                </h3>
                <div className="text-sm text-gray-600 mb-2 bg-blue-50 py-2 px-4 rounded-lg inline-block space-y-2 w-full">
                  {/* <p className="flex items-center justify-center gap-2">
                    <span className="text-blue-700 font-semibold">
                      📋 Type:
                    </span>{" "}
                    {course.type}
                  </p> */}
                  {/* <p className="flex items-center justify-center gap-2">
                    <span className="text-blue-700 font-semibold">
                      💰 Price:
                    </span>{" "}
                    ${course.price}
                  </p> */}
                  <p className="flex items-center  gap-2">
                    <span className="text-blue-700 font-semibold">
                      ⏳ Duration:
                    </span>{" "}
                    {course.duration}
                  </p>
                  <p className="flex items-center  gap-2">
                    <span className="text-blue-700 font-semibold">
                      🗓️ Days:
                    </span>{" "}
                    {course.days}
                  </p>
                </div>
                <hr className="my-4 border-blue-100 border-dashed" />
                <div className="text-sm text-left text-gray-600 space-y-2">
                  <p className="  ">
                    <span className="text-blue-700 font-semibold">
                      👤 Student:
                    </span>{" "}
                    {course.studentName}
                  </p>
                  {/* <p className="">
                    <span className="text-blue-700 font-semibold">
                      📧 Email:
                    </span>{" "}
                    {course.studentEmail}
                  </p> */}
                  {/* <p className="">
                    <span className="text-blue-700 font-semibold">
                      📱 WhatsApp:
                    </span>{" "}
                    {course.whatsappNumber}
                  </p> */}
                  <p className="">
                    <span className="text-blue-700 font-semibold">
                      👨‍👩‍👧 Father:
                    </span>{" "}
                    {course.fatherName}
                  </p>
                  {/* <p className="">
                    <span className="text-blue-700 font-semibold">
                      🎂 Age | Gender:
                    </span>{" "}
                    {course.age} | {course.gender}
                  </p> */}
                  {/* <p className="">
                    <span className="text-blue-700 font-semibold">
                      🌍 Nationality:
                    </span>{" "}
                    {course.nationality}
                  </p> */}
                  {/* <p className="">
                    <span className="text-blue-700 font-semibold">
                      🏠 Present Address:
                    </span>{" "}
                    <span className="hind-siliguri-bold">
                      {course.presentAddress}
                    </span>
                  </p> */}
                  {/* <p className="">
                    <span className="text-blue-700 font-semibold">
                      🏡 Permanent Address:
                    </span>{" "}
                    <span className="hind-siliguri-bold">
                      {course.permanentAddress}
                    </span>
                  </p> */}
                </div>

                <div className="flex flex-col gap-2 mt-4">
                  <a
                    href={zoomLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-6 py-2 text-sm text-white bg-blue-700 hover:bg-blue-900 rounded-full transform hover:scale-105 transition-all duration-200 font-semibold text-center"
                  >
                    Join Zoom Class 🚀
                  </a>

                  <div className="mt-2">
                    {hasReviewedToday ? (
                      <p className="text-green-600 text-sm flex items-center justify-center gap-1">
                        <MdRateReview /> Review submitted for today
                      </p>
                    ) : (
                      <button
                        onClick={() => {
                          setSelectedCourse(course);
                          setReviewData({
                            attendance: "",
                            preparation: "",
                            attention: "",
                            comments: "",
                          });
                          setShowReviewModal(true);
                        }}
                        className="text-[#082f72] hover:underline text-sm flex items-center justify-center gap-1 w-full"
                      >
                        <MdRateReview /> Submit Daily Review
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tutor Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-[#000000a8] bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">
              Daily Review for {selectedCourse?.studentName}
            </h3>

            <div className="space-y-4">
              <div>
                <p className="font-medium mb-2">
                  ১. শিক্ষার্থী কি নির্ধারিত সময়ে ক্লাসে উপস্থিত ছিল?
                </p>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="attendance"
                      checked={reviewData.attendance === "Yes"}
                      onChange={() =>
                        setReviewData({ ...reviewData, attendance: "Yes" })
                      }
                    />
                    Yes
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="attendance"
                      checked={reviewData.attendance === "No"}
                      onChange={() =>
                        setReviewData({ ...reviewData, attendance: "No" })
                      }
                    />
                    No
                  </label>
                </div>
              </div>

              <div>
                <p className="font-medium mb-2">
                  ২. পূর্ববর্তী পাঠ কি সঠিকভাবে আয়ত্ত করেছে?
                </p>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="preparation"
                      checked={reviewData.preparation === "Yes"}
                      onChange={() =>
                        setReviewData({ ...reviewData, preparation: "Yes" })
                      }
                    />
                    Yes
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="preparation"
                      checked={reviewData.preparation === "No"}
                      onChange={() =>
                        setReviewData({ ...reviewData, preparation: "No" })
                      }
                    />
                    No
                  </label>
                </div>
              </div>

              <div>
                <p className="font-medium mb-2">
                  ৩. আজকের ক্লাসে শিক্ষার্থীর মনোযোগ কেমন ছিল?
                </p>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="attention"
                      checked={reviewData.attention === "Good"}
                      onChange={() =>
                        setReviewData({ ...reviewData, attention: "Good" })
                      }
                    />
                    Good
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="attention"
                      checked={reviewData.attention === "Bad"}
                      onChange={() =>
                        setReviewData({ ...reviewData, attention: "Bad" })
                      }
                    />
                    Bad
                  </label>
                </div>
              </div>

              <div>
                <label className="block font-medium mb-1">
                  Comments (optional)
                </label>
                <textarea
                  value={reviewData.comments}
                  onChange={(e) =>
                    setReviewData({ ...reviewData, comments: e.target.value })
                  }
                  className="w-full border rounded p-2 text-sm"
                  rows="3"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setShowReviewModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReviewSubmit}
                  disabled={
                    !reviewData.attendance ||
                    !reviewData.preparation ||
                    !reviewData.attention
                  }
                  className="px-4 py-2 bg-[#082f72] text-white rounded hover:bg-[#0a3a8a] transition disabled:opacity-50"
                >
                  Submit Review
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignedCourses;

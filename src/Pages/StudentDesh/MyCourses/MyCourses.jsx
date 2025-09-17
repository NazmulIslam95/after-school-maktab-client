import { useState } from "react";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import DashboardBanner from "../../../Components/DashboardBanner/DashboardBanner";
import Swal from "sweetalert2";
import useAllTutors from "../../../CustomHooks/useAllTutors";
import { MdRateReview } from "react-icons/md";
import useAuth from "../../../CustomHooks/useAuth";

const MyCourses = () => {
  const { user } = useAuth();
  const {
    tutors,
    isLoading: tutorsLoading,
    error: tutorsError,
  } = useAllTutors();
  const axiosSecure = useAxiosSecure();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewData, setReviewData] = useState({
    punctuality: "",
    teachingQuality: "",
    behavior: "",
    comments: "",
  });

  const {
    data: purchases = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["purchases", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/myPurchases?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
    retry: 3,
  });

  // Create a map of tutors by their _id for quick lookup
  const tutorsMap = tutors?.reduce((acc, tutor) => {
    acc[tutor._id] = tutor;
    return acc;
  }, {});

  const handleReviewSubmit = async () => {
    try {
      const res = await axiosSecure.patch(
        `/studentReview/${selectedCourse._id}`,
        {
          reviewerType: "student",
          answers: {
            q1: reviewData.punctuality,
            q2: reviewData.teachingQuality,
            q3: reviewData.behavior,
          },
          comments: reviewData.comments,
        }
      );

      if (res.data.success) {
        Swal.fire({
          icon: "success",
          title: "Review Submitted",
          text: "Thank you for your feedback!",
          confirmButtonColor: "#082f72",
        });
        setShowReviewModal(false);
        refetch();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to Submit Review",
        text: error.response?.data?.code || "Something went wrong",
        confirmButtonColor: "#082f72",
      });
    }
  };

  if (isLoading || tutorsLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center text-gray-600 text-lg">
          Loading your courses...
        </div>
      </div>
    );
  }

  if (error || tutorsError) {
    Swal.fire({
      icon: "error",
      title: "Failed to Load Data",
      text:
        error?.message ||
        tutorsError?.message ||
        "Unable to fetch data. Please try again.",
      confirmButtonColor: "#082f72",
    });
    return (
      <div className="text-center py-10 text-red-600">
        Failed to load data: {error?.message || tutorsError?.message}
      </div>
    );
  }

  return (
    <div className="px-4 max-w-7xl mx-auto">
      <DashboardBanner
        title="My Courses"
        subTitle="View Your Enrolled Courses"
        className="bg-gradient-to-r from-[#082f72] to-purple-600 text-white rounded-xl shadow-lg"
      />

      {purchases.length === 0 ? (
        <div className="text-center mt-10 text-gray-600 text-lg">
          You haven't purchased any course yet.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {purchases.map((course) => {
            const assignedTutor = course.assignedTutorId
              ? tutorsMap[course.assignedTutorId] ||
                tutors.find((tutor) => tutor._id === course.assignedTutorId)
              : null;

            return (
              <div
                key={course._id}
                className="rounded-xl shadow-md p-4 space-y-4 bg-white"
              >
                <div className="flex justify-between">
                  <h2 className="text-xl font-bold text-[#082f72] mb-2">
                    {course.courseName || "Unknown Course"}
                  </h2>
                  <p>
                    {course.confirmed ? (
                      <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded font-medium">
                        Confirmed
                      </span>
                    ) : course.denied ? (
                      <span className="inline-block px-3 py-1 bg-red-100 text-red-700 rounded font-medium">
                        Denied
                      </span>
                    ) : (
                      <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-700 rounded font-medium">
                        Pending
                      </span>
                    )}
                  </p>
                </div>
                <p>
                  <span className="font-medium text-[#082f72]">
                    Assigned Tutor:
                  </span>{" "}
                  {course.confirmed
                    ? assignedTutor?.name || "Tutor not found"
                    : "Not Assigned"}
                </p>
                <p>
                  <span className="font-medium text-[#082f72]">Duration:</span>{" "}
                  {course.duration || "N/A"}
                </p>
                <p>
                  <span className="font-medium text-[#082f72]">Days In a Weak:</span>{" "}
                  {course.days || "N/A"}
                </p>
                <p>
                  <span className="font-semibold text-[#082f72]">
                    Selected Days:
                  </span>{" "}
                  {Array.isArray(course.selectedDays)
                    ? course.selectedDays.join(", ")
                    : course.selectedDays || "N/A"}
                </p>
                <p>
                  <span className="font-medium text-[#082f72]">Price:</span> ৳
                  {course.price || "0"}
                </p>

                {course.confirmed && assignedTutor?.zoomLink ? (
                  <a
                    href={assignedTutor.zoomLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    <button className="btn btn-primary w-full">
                      Join Class
                    </button>
                  </a>
                ) : course.confirmed ? (
                  <button className="btn disabled w-full">
                    Zoom Link Not Available
                  </button>
                ) : (
                  <button className="btn disabled w-full">
                    Not Available (Pending or Denied)
                  </button>
                )}

                {course.confirmed && (
                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setSelectedCourse(course);
                        setReviewData({
                          punctuality: "",
                          teachingQuality: "",
                          behavior: "",
                          comments: "",
                        });
                        setShowReviewModal(true);
                      }}
                      className="text-[#082f72] hover:underline text-sm flex items-center gap-1"
                    >
                      <MdRateReview /> Submit Today's Review
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-[#000000a8] bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Daily Review</h3>

            <div className="space-y-4">
              <div>
                <p className="font-medium mb-2">
                  ১. শিক্ষক কি যথাসময়ে ক্লাসে উপস্থিত ছিলেন?
                </p>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="punctuality"
                      checked={reviewData.punctuality === "Yes"}
                      onChange={() =>
                        setReviewData({ ...reviewData, punctuality: "Yes" })
                      }
                    />
                    Yes
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="punctuality"
                      checked={reviewData.punctuality === "No"}
                      onChange={() =>
                        setReviewData({ ...reviewData, punctuality: "No" })
                      }
                    />
                    No
                  </label>
                </div>
              </div>

              <div>
                <p className="font-medium mb-2">২. আজকের পাঠদান কেমন লেগেছে?</p>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="teachingQuality"
                      checked={reviewData.teachingQuality === "Good"}
                      onChange={() =>
                        setReviewData({
                          ...reviewData,
                          teachingQuality: "Good",
                        })
                      }
                    />
                    Good
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="teachingQuality"
                      checked={reviewData.teachingQuality === "Bad"}
                      onChange={() =>
                        setReviewData({ ...reviewData, teachingQuality: "Bad" })
                      }
                    />
                    Bad
                  </label>
                </div>
              </div>

              <div>
                <p className="font-medium mb-2">
                  ৩. ক্লাস চলাকালে শিক্ষক শিক্ষার্থীর সাথে কেমন ব্যবহার করেছেন?
                </p>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="behavior"
                      checked={reviewData.behavior === "Well"}
                      onChange={() =>
                        setReviewData({ ...reviewData, behavior: "Well" })
                      }
                    />
                    Well
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="behavior"
                      checked={reviewData.behavior === "Rude"}
                      onChange={() =>
                        setReviewData({ ...reviewData, behavior: "Rude" })
                      }
                    />
                    Rude
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
                    !reviewData.punctuality ||
                    !reviewData.teachingQuality ||
                    !reviewData.behavior
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

export default MyCourses;

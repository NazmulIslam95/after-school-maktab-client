import { useContext, useEffect } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import DashboardBanner from "../../../Components/DashboardBanner/DashboardBanner";
import Swal from "sweetalert2";
import useAllTutors from "../../../CustomHooks/useAllTutors";

const MyCourses = () => {
  const { user } = useContext(AuthContext);
  const {
    tutors,
    isLoading: tutorsLoading,
    error: tutorsError,
  } = useAllTutors();
  const axiosSecure = useAxiosSecure();

  const {
    data: purchases = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["purchases", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/myPurchases?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
    retry: 3,
  });

  // Debug tutors and purchases
  useEffect(() => {
    // console.log("Purchases:", purchases);
    // console.log("Tutors:", tutors);
  }, [purchases, tutors]);

  // Create a map of tutors by their _id for quick lookup
  const tutorsMap = tutors?.reduce((acc, tutor) => {
    acc[tutor._id] = tutor;
    return acc;
  }, {});

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
            // Filter tutor by assignedTutorId
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
                    : "Not Assigned "}
                </p>
                <p>
                  <span className="font-medium text-[#082f72]">Duration:</span>{" "}
                  {course.duration || "N/A"}
                </p>
                <p>
                  <span className="font-medium text-[#082f72]">Days:</span>{" "}
                  {course.days || "N/A"}
                </p>
                <p>
                  <span className="font-medium text-[#082f72]">Price:</span> ৳
                  {course.price || "0"}
                </p>
                <>
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
                </>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyCourses;

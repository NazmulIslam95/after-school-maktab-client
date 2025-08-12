import React, { useEffect, useState, useContext } from "react";
import DashboardBanner from "../../../Components/DashboardBanner/DashboardBanner";
import { AuthContext } from "../../../Providers/AuthProvider";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import useAllTutors from "../../../CustomHooks/useAllTutors";

const AssignedCourses = () => {
  const { user } = useContext(AuthContext);
  const { tutors } = useAllTutors();
  const [courses, setCourses] = useState([]);
  const [zoomLink, setZoomLink] = useState("");
  const [loading, setLoading] = useState(true);
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
          {courses.map((course) => (
            <div
              key={course._id || course.id}
              className="relative bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg p-6 border border-blue-100 hover:shadow-xl transform transition-all duration-300 hover:bg-blue-50 philosopher-bold"
            >
              <h3 className="text-xl font-bold text-blue-900 mb-3 font-cute flex items-center justify-center gap-2 hind-siliguri-bold">
                {course.courseName}{" "}
              </h3>
              <div className="text-sm text-gray-600 mb-2 bg-blue-50 py-2 px-4 rounded-lg inline-block space-y-2 w-full">
                <p className="flex items-center justify-center gap-2">
                  <span className="text-blue-700 font-semibold">📋 Type:</span>{" "}
                  {course.type}
                </p>
                <p className="flex items-center justify-center gap-2">
                  <span className="text-blue-700 font-semibold">💰 Price:</span>{" "}
                  ${course.price}
                </p>
                <p className="flex items-center justify-center gap-2">
                  <span className="text-blue-700 font-semibold">
                    ⏳ Duration:
                  </span>{" "}
                  {course.duration}
                </p>
                <p className="flex items-center justify-center gap-2">
                  <span className="text-blue-700 font-semibold">🗓️ Days:</span>{" "}
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
                <p className="">
                  <span className="text-blue-700 font-semibold">📧 Email:</span>{" "}
                  {course.studentEmail}
                </p>
                <p className="">
                  <span className="text-blue-700 font-semibold">
                    📱 WhatsApp:
                  </span>{" "}
                  {course.whatsappNumber}
                </p>
                <p className="">
                  <span className="text-blue-700 font-semibold">
                    👨‍👩‍👧 Father:
                  </span>{" "}
                  {course.fatherName}
                </p>
                <p className="">
                  <span className="text-blue-700 font-semibold">
                    🎂 Age | Gender:
                  </span>{" "}
                  {course.age} | {course.gender}
                </p>
                <p className="">
                  <span className="text-blue-700 font-semibold">
                    🌍 Nationality:
                  </span>{" "}
                  {course.nationality}
                </p>
                <p className="">
                  <span className="text-blue-700 font-semibold">
                    🏠 Present Address:
                  </span>{" "}
                  <span className="hind-siliguri-bold">
                    {course.presentAddress}
                  </span>
                </p>
                <p className="">
                  <span className="text-blue-700 font-semibold">
                    🏡 Permanent Address:
                  </span>{" "}
                  <span className="hind-siliguri-bold">
                    {course.permanentAddress}
                  </span>
                </p>
              </div>
              <a
                href={zoomLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-6 px-6 py-2 text-sm text-white bg-blue-700 hover:bg-blue-900 rounded-full transform hover:scale-105 transition-all duration-200 font-semibold"
              >
                Join Zoom Class 🚀
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AssignedCourses;

import { useContext, useEffect, useState } from "react";
import DashboardBanner from "../../../Components/DashboardBanner/DashboardBanner";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import { AuthContext } from "../../../Providers/AuthProvider";
import useAllTutors from "../../../CustomHooks/useAllTutors";
import { Link } from "react-router-dom";

const MyDemoClass = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useContext(AuthContext);
  const { tutors } = useAllTutors();
  const [demoRequests, setDemoRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch demo requests for the current user
  useEffect(() => {
    if (user) {
      const fetchDemoRequests = async () => {
        try {
          setIsLoading(true);
          const response = await axiosSecure.get(
            `/demoBookings?email=${user.email}`
          );
          setDemoRequests(response.data);
          console.log("Demo Requests:", response.data);
        } catch (error) {
          console.error("Error fetching demo requests:", error);
          setDemoRequests([]);
        } finally {
          setIsLoading(false);
        }
      };
      fetchDemoRequests();
    }
  }, [user, axiosSecure]);

  // Helper function to get tutor name by ID
  const getTutorName = (tutorId) => {
    const tutor = tutors.find((t) => t._id === tutorId);
    return tutor ? tutor.name : "Not Assigned";
  };
  // Helper function to get tutor Zoom link by ID
  const getTutorZoomLink = (tutorId) => {
    const tutor = tutors.find((t) => t._id === tutorId);
    return tutor ? tutor.zoomLink : "No Zoom Link Available";
  };

  if (loading || isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-2xl text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardBanner
        title="My Demo Classes"
        subTitle="Demo Classes"
        className="bg-gradient-to-r from-[#082f72] to-purple-600 text-white rounded-xl shadow-lg"
      />
      <div className="max-w-6xl mx-auto p-6">
        {demoRequests.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">
            No demo classes found.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {demoRequests.map((req) => (
              <div
                key={req._id}
                className={`bg-white p-6 rounded-2xl shadow-lg ${
                  !req.confirmed && !req.denied
                    ? "border-4 border-yellow-400 bg-yellow-50"
                    : req.confirmed
                      ? "bg-green-50"
                      : "bg-red-50"
                } hover:shadow-xl transition-all duration-300 hind-siliguri-regular`}
              >
                <div className="flex justify-between">
                  <h3 className="font-bold text-xl text-gray-900 mb-3 h-12">
                    {req.courseName}
                  </h3>
                  <div>
                    <p className="bg-yellow-400 p-2 rounded-md ">
                      {req.confirmed
                        ? "Confirmed"
                        : req.denied
                          ? "Denied"
                          : "Pending"}
                    </p>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>
                    <span className="font-semibold text-[#082f72]">Type:</span>{" "}
                    {req.type}
                  </p>
                  <p>
                    <span className="font-semibold text-[#082f72]">
                      Demo Time:
                    </span>{" "}
                    {new Date(req.demoDateTime).toLocaleString("bn-BD", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                  {req.confirmed && req.assignedTutorId && (
                    <>
                      <p>
                        <span className="font-semibold text-[#082f72]">
                          Assigned Tutor:
                        </span>{" "}
                        {getTutorName(req.assignedTutorId)}
                      </p>

                      <a
                        href={`/${getTutorZoomLink(req.assignedTutorId)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <button className="btn btn-primary w-full text-white">
                          Join Class
                        </button>
                      </a>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyDemoClass;

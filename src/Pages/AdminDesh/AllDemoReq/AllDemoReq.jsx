import { useState } from "react";
import DashboardBanner from "../../../Components/DashboardBanner/DashboardBanner";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import useAllDemoReq from "../../../CustomHooks/useAllDemoReq";
import useAllTutors from "../../../CustomHooks/useAllTutors";
import Swal from "sweetalert2";

const AllDemoReq = () => {
  const axiosSecure = useAxiosSecure();
  const { allDemoReq, loading, refetch } = useAllDemoReq();
  const { tutors } = useAllTutors();
  const [selectedTutors, setSelectedTutors] = useState({});
  const [filter, setFilter] = useState("all");

  const handleTutorChange = (reqId, tutorId) => {
    setSelectedTutors((prev) => ({ ...prev, [reqId]: tutorId }));
  };

  const handleConfirm = async (reqId) => {
    const tutorId = selectedTutors[reqId];
    if (!tutorId) {
      Swal.fire("Error!", "No tutor selected for this demo.", "error");
      return;
    }

    try {
      Swal.fire({
        title: "Confirming...",
        text: "Please wait while the demo is confirmed.",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      // Confirm the demo booking
      const confirmResponse = await axiosSecure.patch(
        `/demoBookings/confirm/${reqId}`,
        { tutorId }
      );

      if (!confirmResponse?.data?.success) {
        throw new Error(
          confirmResponse?.data?.message || "Failed to confirm demo booking."
        );
      }

      // Assign the demo to the tutor
      const assignResponse = await axiosSecure.patch(
        `/tutors/assignDemo/${tutorId}`,
        { courseId: reqId }
      );

      // Check for success (adjust based on actual API response structure)
      if (
        !assignResponse?.data?.success &&
        !assignResponse?.data?.modifiedCount
      ) {
        console.log("assignResponse:", assignResponse); // Log for debugging
        throw new Error(
          assignResponse?.data?.message || "Failed to assign demo to tutor."
        );
      }

      Swal.fire(
        "Confirmed!",
        "The demo request has been confirmed.",
        "success"
      );
      refetch();
    } catch (err) {
      Swal.fire("Error!", err.message || "Something went wrong.", "error");
      console.error("Confirmation error:", err);
    }
  };

  const handleDeny = async (reqId) => {
    try {
      const response = await axiosSecure.patch(`/demoBookings/deny/${reqId}`);
      if (!response.data.success) {
        throw new Error(
          response.data.message || "Failed to deny demo booking."
        );
      }
      Swal.fire("Denied!", "The demo request has been denied.", "info");
      refetch();
    } catch (err) {
      Swal.fire("Error!", err.message || "Something went wrong.", "error");
      console.error(err);
    }
  };

  // Helper function to get tutor name by ID
  const getTutorName = (tutorId) => {
    const tutor = tutors.find((t) => t._id === tutorId);
    return tutor ? tutor.name : "Not Assigned";
  };

  // Filter demo requests based on selected filter
  const filteredDemoReq = allDemoReq.filter((req) => {
    if (filter === "all") return true;
    if (filter === "pending") return !req.confirmed && !req.denied;
    if (filter === "confirmed") return req.confirmed;
    if (filter === "denied") return req.denied;
    return true;
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <DashboardBanner
        title="All Demo Requests"
        subTitle="Demo Requests"
        className="bg-gradient-to-r from-[#082f72] to-purple-600 text-white rounded-xl shadow-lg"
      />

      {loading ? (
        <div className="text-center mt-10 text-gray-600 text-lg">
          Loading...
        </div>
      ) : (
        <>
          <div className="mt-6 flex justify-end">
            <div className="relative inline-block text-left">
              <label className="font-semibold text-[#082f72] mr-2">
                Filter:
              </label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#082f72] bg-white shadow-sm"
              >
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="denied">Denied</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {filteredDemoReq.length === 0 ? (
              <div className="col-span-full text-center text-gray-500 text-lg">
                No demo requests found for this filter.
              </div>
            ) : (
              filteredDemoReq.map((req) => (
                <div
                  key={req._id}
                  className={`bg-white p-6 rounded-2xl shadow-lg ${
                    !req.confirmed && !req.denied
                      ? "border-4 border-yellow-400 bg-yellow-50"
                      : req.confirmed
                        ? "bg-green-50"
                        : "bg-red-50"
                  } hover:shadow-xl transition-all duration-300`}
                >
                  <h3 className="font-bold text-xl text-gray-900 mb-3">
                    {req.name}
                  </h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p>
                      <span className="font-semibold text-[#082f72]">
                        Email:
                      </span>{" "}
                      {req.email}
                    </p>
                    <p>
                      <span className="font-semibold text-[#082f72]">
                        Course:
                      </span>{" "}
                      {req.courseName}
                    </p>
                    <p>
                      <span className="font-semibold text-[#082f72]">
                        Type:
                      </span>{" "}
                      {req.type}
                    </p>
                    <p>
                      <span className="font-semibold text-[#082f72]">Age:</span>{" "}
                      {req.age} &nbsp;
                      <span className="font-semibold text-[#082f72]">
                        Gender:
                      </span>{" "}
                      {req.gender}
                    </p>
                    <p>
                      <span className="font-semibold text-[#082f72]">
                        WhatsApp:
                      </span>{" "}
                      {req.whatsapp}
                    </p>
                    <p>
                      <span className="font-semibold text-[#082f72]">
                        Address:
                      </span>{" "}
                      {req.presentAddress}
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
                    <div className="mt-3">
                      <label className="font-semibold text-[#082f72] block mb-1">
                        Tutor:
                      </label>
                      {req.confirmed ? (
                        <p className="text-sm text-gray-700 font-medium">
                          {getTutorName(req.assignedTutorId)}
                        </p>
                      ) : req.denied ? (
                        <p className="text-sm text-gray-700 font-medium">
                          Not Assigned
                        </p>
                      ) : (
                        <select
                          onChange={(e) =>
                            handleTutorChange(req._id, e.target.value)
                          }
                          value={selectedTutors[req._id] || ""}
                          className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#082f72]"
                          disabled={req.confirmed || req.denied}
                        >
                          <option value="">Select Tutor</option>
                          {tutors.map((tutor) => (
                            <option key={tutor._id} value={tutor._id}>
                              {tutor.name}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  </div>
                  <div className="mt-4 flex gap-3">
                    {!req.confirmed && !req.denied && (
                      <>
                        <button
                          onClick={() => handleConfirm(req._id)}
                          className="flex-1 px-4 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition shadow-sm"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => handleDeny(req._id)}
                          className="flex-1 px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition shadow-sm"
                        >
                          Deny
                        </button>
                      </>
                    )}
                  </div>
                  <p className="mt-3 text-sm text-gray-500">
                    <span className="font-semibold text-[#082f72]">
                      Status:
                    </span>{" "}
                    {req.confirmed
                      ? "Confirmed"
                      : req.denied
                        ? "Denied"
                        : "Pending"}
                  </p>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AllDemoReq;

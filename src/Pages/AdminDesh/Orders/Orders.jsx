import { useState } from "react";
import DashboardBanner from "../../../Components/DashboardBanner/DashboardBanner";
import { MdPerson } from "react-icons/md";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import { toast } from "react-toastify";
import useAllPurchase from "../../../CustomHooks/useAllPurchase";
import useAllTutors from "../../../CustomHooks/useAllTutors";
import Swal from "sweetalert2";

const Orders = () => {
  const axiosSecure = useAxiosSecure();
  const { purchases, refetch, loading } = useAllPurchase();
  const { tutors } = useAllTutors();
  const [selectedTutors, setSelectedTutors] = useState({});
  const [filter, setFilter] = useState("all");

  const notifySuccess = () => toast.success("Course Purchase Is Confirmed!");
  const notifyError = () => toast.error("Failed to Confirm Course Purchase");

  const handleTutorChange = (purchaseId, tutorId) => {
    setSelectedTutors((prev) => ({ ...prev, [purchaseId]: tutorId }));
  };

  const handleConfirm = async (id) => {
    const tutorId = selectedTutors[id];
    try {
      const res = await axiosSecure.patch(`/purchases/confirm/${id}`, { tutorId });
      if (res.data.success) {
        notifySuccess();
        refetch();
      } else {
        notifyError();
      }
    } catch (error) {
      console.error(error);
      notifyError();
    }
  };

  const handleDeny = async (id) => {
    try {
      const res = await axiosSecure.patch(`/purchases/deny/${id}`);
      if (res.data.success) {
        Swal.fire("Denied!", "The purchase has been denied.", "info");
        refetch();
      } else {
        Swal.fire("Failed!", res.data.message || "Could not deny.", "error");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error!", "Something went wrong.", "error");
    }
  };

  // Helper function to get tutor name by ID
  const getTutorName = (tutorId) => {
    const tutor = tutors.find((t) => t._id === tutorId);
    return tutor ? tutor.name : "Not Assigned";
  };

  // Filter purchases based on selected filter
  const filteredPurchases = purchases.filter((purchase) => {
    if (filter === "all") return true;
    if (filter === "pending") return !purchase.confirmed && !purchase.denied;
    if (filter === "confirmed") return purchase.confirmed;
    if (filter === "denied") return purchase.denied;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardBanner
        title="All Admitted Students"
        subTitle="Admission"
        className="bg-gradient-to-r from-[#082f72] to-purple-600 text-white rounded-xl shadow-lg"
      />

      {loading ? (
        <div className="text-center py-12 font-semibold text-gray-600">
          Loading...
        </div>
      ) : (
        <>
          <div className="max-w-6xl mx-auto mt-6 flex justify-end">
            <div className="relative inline-block text-left">
              <label className="font-semibold text-[#082f72] mr-2">Filter:</label>
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
          <div className="max-w-6xl mx-auto my-8">
            {filteredPurchases.length === 0 ? (
              <div className="text-center text-gray-500 text-lg">
                No orders found for this filter.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPurchases.map((purchase) => (
                  <div
                    key={purchase._id}
                    className={`bg-white p-6 rounded-2xl shadow-lg ${
                      !purchase.confirmed && !purchase.denied
                        ? "border-4 border-yellow-400 bg-yellow-50"
                        : purchase.confirmed
                          ? "bg-green-50"
                          : "bg-red-50"
                    } hover:shadow-xl transition-all duration-300`}
                  >
                    <h3 className="font-bold text-xl text-gray-900 mb-3 flex items-center gap-1">
                      <MdPerson /> {purchase.studentName}
                    </h3>
                    <div className="space-y-2 text-sm text-gray-700">
                      <p>
                        <span className="font-semibold text-[#082f72]">Email:</span>{" "}
                        {purchase.studentEmail}
                      </p>
                      <p>
                        <span className="font-semibold text-[#082f72]">Course:</span>{" "}
                        {purchase.courseName}
                      </p>
                      <p>
                        <span className="font-semibold text-[#082f72]">Type:</span>{" "}
                        {purchase.type}
                      </p>
                      <p>
                        <span className="font-semibold text-[#082f72]">Price:</span>{" "}
                        <span className="text-green-600 font-bold">${purchase.price}</span>
                      </p>
                      <p>
                        <span className="font-semibold text-[#082f72]">Duration:</span>{" "}
                        {purchase.duration || "N/A"}
                      </p>
                      <p>
                        <span className="font-semibold text-[#082f72]">Days:</span>{" "}
                        {purchase.days || "N/A"}
                      </p>
                      <div className="mt-3">
                        <label className="font-semibold text-[#082f72] block mb-1">
                          Tutor:
                        </label>
                        {purchase.confirmed ? (
                          <p className="text-sm text-gray-700 font-medium">
                            {getTutorName(purchase.assignedTutorId)}
                          </p>
                        ) : purchase.denied ? (
                          <p className="text-sm text-gray-700 font-medium">Not Assigned</p>
                        ) : (
                          <select
                            onChange={(e) => handleTutorChange(purchase._id, e.target.value)}
                            value={selectedTutors[purchase._id] || ""}
                            className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#082f72]"
                            disabled={purchase.confirmed || purchase.denied}
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
                      <p>
                        <span className="font-semibold text-[#082f72]">Status:</span>{" "}
                        {purchase.confirmed ? (
                          <span className="text-green-600 font-semibold">Confirmed</span>
                        ) : purchase.denied ? (
                          <span className="text-red-600 font-semibold">Denied</span>
                        ) : (
                          <span className="text-yellow-600 font-semibold">Pending</span>
                        )}
                      </p>
                    </div>
                    {!purchase.confirmed && !purchase.denied && (
                      <div className="mt-4 flex gap-3">
                        <button
                          onClick={() => handleConfirm(purchase._id)}
                          className="flex-1 px-4 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition shadow-sm"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => handleDeny(purchase._id)}
                          className="flex-1 px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition shadow-sm"
                        >
                          Deny
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Orders;
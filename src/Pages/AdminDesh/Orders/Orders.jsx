import { useState } from "react";
import DashboardBanner from "../../../Components/DashboardBanner/DashboardBanner";
import { MdPerson, MdSearch } from "react-icons/md";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null); // 'student' or 'tutor'
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(7); // August (0-based: 7)
  const [currentYear, setCurrentYear] = useState(2025); // Set to 2025 to match data
  const [searchTerm, setSearchTerm] = useState(""); // Search term state

  const notifySuccess = () => toast.success("Course Purchase Is Confirmed!");
  const notifyError = () => toast.error("Failed to Confirm Course Purchase");

  const handleTutorChange = (purchaseId, tutorId) => {
    setSelectedTutors((prev) => ({ ...prev, [purchaseId]: tutorId }));
  };

  const handleConfirm = async (id) => {
    const tutorId = selectedTutors[id];
    try {
      const res = await axiosSecure.patch(`/purchases/confirm/${id}`, {
        tutorId,
      });
      if (res.data.success) {
        notifySuccess();
        refetch();
      } else {
        notifyError();
      }
    } catch (error) {
      console.error("Error confirming purchase:", error);
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
      console.error("Error denying purchase:", error);
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

  // Search function
  const searchedPurchases = filteredPurchases.filter((purchase) => {
    if (!searchTerm) return true;

    const searchLower = searchTerm.toLowerCase();
    return (
      purchase.studentName.toLowerCase().includes(searchLower) ||
      purchase.studentEmail.toLowerCase().includes(searchLower) ||
      purchase.courseName.toLowerCase().includes(searchLower) ||
      (purchase.confirmed && "confirmed".includes(searchLower)) ||
      (purchase.denied && "denied".includes(searchLower)) ||
      (!purchase.confirmed &&
        !purchase.denied &&
        "pending".includes(searchLower)) ||
      (purchase.siblings &&
        purchase.siblings.some(
          (sibling) =>
            sibling.name.toLowerCase().includes(searchLower) ||
            sibling.email.toLowerCase().includes(searchLower)
        ))
    );
  });

  // Calendar logic
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDayOfMonth }, () => null);

  // Question labels for reviews
  const studentReviewQuestions = {
    q1: "১. শিক্ষক কি যথাসময়ে ক্লাসে উপস্থিত ছিলেন?",
    q2: "২. আজকের পাঠদান কেমন লেগেছে?",
    q3: "৩. ক্লাস চলাকালে শিক্ষক শিক্ষার্থীর সাথে কেমন ব্যবহার করেছেন?",
  };

  const tutorReviewQuestions = {
    q1: "১. শিক্ষার্থী কি নির্ধারিত সময়ে ক্লাসে উপস্থিত ছিল?",
    q2: "২. পূর্ববর্তী পাঠ কি সঠিকভাবে আয়ত্ত করেছে?",
    q3: "৩. আজকের ক্লাসে শিক্ষার্থীর মনোযোগ কেমন ছিল?",
  };

  // Get dates with reviews
  const getReviewDates = (purchase, type) => {
    const dates = new Set();
    console.log(
      `Processing ${type} reviews for purchase:`,
      purchase._id,
      purchase[type + "Review"]
    );

    const reviews = purchase[type + "Review"] || [];
    reviews.forEach((review, index) => {
      try {
        if (!review.createdAt) {
          console.warn(
            `Missing createdAt in ${type} review at index ${index}`,
            review
          );
          return;
        }
        const dateStr = review.createdAt;
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) {
          console.warn(
            `Invalid date in ${type} review at index ${index}:`,
            dateStr
          );
          return;
        }
        const utcDay = date.getUTCDate();
        const utcMonth = date.getUTCMonth();
        const utcYear = date.getUTCFullYear();
        console.log(
          `Review ${index} date: ${dateStr} -> UTC ${utcDay}/${utcMonth + 1}/${utcYear}`
        );
        if (utcMonth === currentMonth && utcYear === currentYear) {
          dates.add(utcDay);
        }
      } catch (error) {
        console.error(
          `Error parsing ${type} review date at index ${index}:`,
          error,
          review
        );
      }
    });

    const result = Array.from(dates);
    console.log(
      `Review dates for ${type} in ${currentMonth + 1}/${currentYear}:`,
      result
    );
    return result;
  };

  // Get reviews for a specific date
  const getReviewsForDate = (purchase, date, type) => {
    const reviews = [];
    console.log(
      `Fetching ${type} reviews for ${date}/${currentMonth + 1}/${currentYear}`
    );

    const reviewArray = purchase[type + "Review"] || [];
    reviewArray.forEach((review, index) => {
      try {
        if (!review.createdAt) {
          console.warn(
            `Missing createdAt in ${type} review at index ${index}`,
            review
          );
          return;
        }
        const dateStr = review.createdAt;
        const reviewDate = new Date(dateStr);
        if (isNaN(reviewDate.getTime())) {
          console.warn(
            `Invalid date in ${type} review at index ${index}:`,
            dateStr
          );
          return;
        }
        const utcDay = reviewDate.getUTCDate();
        const utcMonth = reviewDate.getUTCMonth();
        const utcYear = reviewDate.getUTCFullYear();
        if (
          utcDay === date &&
          utcMonth === currentMonth &&
          utcYear === currentYear
        ) {
          reviews.push(review);
        } else {
          console.log(
            `Review ${index} skipped for ${type}: ${dateStr} (UTC ${utcDay}/${utcMonth + 1}/${utcYear}) does not match ${date}/${currentMonth + 1}/${currentYear}`
          );
        }
      } catch (error) {
        console.error(
          `Error parsing ${type} review date at index ${index}:`,
          error,
          review
        );
      }
    });

    console.log(
      `Found ${reviews.length} ${type} reviews for ${date}/${currentMonth + 1}/${currentYear}:`,
      reviews
    );
    return reviews;
  };

  // Handle month navigation
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setSelectedDate(null);
    console.log(`Navigated to previous month: ${currentMonth}/${currentYear}`);
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setSelectedDate(null);
    console.log(`Navigated to next month: ${currentMonth + 2}/${currentYear}`);
  };

  // Open modal for reviews
  const openReviewModal = (purchase, type) => {
    console.log(
      `Opening modal for ${type} reviews, purchase ID: ${purchase._id}`,
      {
        studentReview: purchase.studentReview,
        tutorReview: purchase.tutorReview,
      }
    );
    setSelectedPurchase(purchase);
    setModalType(type);
    setIsModalOpen(true);
    setSelectedDate(null);
    setCurrentMonth(7); // August 2025 (0-based)
    setCurrentYear(2025); // Match data year
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
    setSelectedPurchase(null);
    setSelectedDate(null);
    console.log("Modal closed");
  };

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
          {/* Search and Filter Section */}
          <div className="max-w-6xl mx-auto mt-6 flex flex-col md:flex-row gap-4 justify-between items-center px-4">
            {/* Search Bar */}
            <div className="relative w-full md:w-1/2">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <MdSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by name, email, course, or status..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#082f72] bg-white shadow-sm"
              />
            </div>

            {/* Filter Dropdown */}
            <div className="relative inline-block text-left">
              <label className="font-semibold text-[#082f72] mr-2">
                Filter:
              </label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#082f72] bg-white shadow-sm"
              >
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="denied">Denied</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="max-w-6xl mx-auto mt-4 px-4">
            <p className="text-sm text-gray-600">
              Showing {searchedPurchases.length} of {purchases.length} orders
              {searchTerm && ` for "${searchTerm}"`}
            </p>
          </div>

          <div className="max-w-6xl mx-auto my-8">
            {searchedPurchases.length === 0 ? (
              <div className="text-center text-gray-500 text-lg py-12">
                {searchTerm
                  ? `No orders found for "${searchTerm}"`
                  : "No orders found for this filter."}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
                {searchedPurchases.map((purchase) => (
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
                    <h3 className="font-bold text-xl text-gray-900 mb-3 flex items-center gap-1 capitalize">
                      <MdPerson /> {purchase.studentName}
                    </h3>
                    <div className="space-y-2 text-sm text-gray-700">
                      <p>
                        <span className="font-semibold text-[#082f72]">
                          Email:
                        </span>{" "}
                        {purchase.studentEmail}
                      </p>
                      <p>
                        <span className="font-semibold text-[#082f72]">
                          Whatsapp Number:
                        </span>{" "}
                        {purchase.whatsappNumber}
                      </p>

                      {/* Sibling Information */}
                      {purchase.siblings && purchase.siblings.length > 0 && (
                        <div className="mt-2">
                          <p className="font-semibold text-[#082f72]">
                            Siblings:
                          </p>
                          {purchase.siblings.map((sibling, index) => (
                            <div key={index} className="ml-4">
                              <p>
                                <span className="font-medium">Name:</span>{" "}
                                {sibling.name}
                              </p>
                              <p>
                                <span className="font-medium">Email:</span>{" "}
                                {sibling.email}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      <p>
                        <span className="font-semibold text-[#082f72]">
                          Course:
                        </span>{" "}
                        {purchase.courseName}
                      </p>
                      <p>
                        <span className="font-semibold text-[#082f72]">
                          Type:
                        </span>{" "}
                        {purchase.type}
                      </p>
                      <p>
                        <span className="font-semibold text-[#082f72]">
                          Price:
                        </span>{" "}
                        <span className="text-green-600 font-bold">
                          ${purchase.price} USD
                        </span>
                      </p>
                      <p>
                        <span className="font-semibold text-[#082f72]">
                          Duration:
                        </span>{" "}
                        {purchase.duration || "N/A"}
                      </p>
                      <p>
                        <span className="font-semibold text-[#082f72]">
                          How Many Days:
                        </span>{" "}
                        {purchase.days || "N/A"}
                      </p>
                      <p>
                        <span className="font-semibold text-[#082f72]">
                          Class Time In BD:
                        </span>{" "}
                        {purchase.time || "N/A"}
                      </p>
                      <p>
                        <span className="font-semibold text-[#082f72]">
                          Selected Days:
                        </span>{" "}
                        {Array.isArray(purchase.selectedDays)
                          ? purchase.selectedDays.join(", ")
                          : purchase.selectedDays || "N/A"}
                      </p>

                      <p>
                        <span className="font-semibold text-[#082f72]">
                          Present Address:
                        </span>{" "}
                        {purchase.presentAddress || "N/A"}
                      </p>
                      <p>
                        <span className="font-semibold text-[#082f72]">
                          Permanent Address:
                        </span>{" "}
                        {purchase.permanentAddress || "N/A"}
                      </p>

                      <div className="mt-3 flex gap-1">
                        <label className="font-semibold text-[#082f72] block mb-1">
                          Tutor:
                        </label>
                        {purchase.confirmed ? (
                          <p className="text-sm text-gray-700 font-medium">
                            {getTutorName(purchase.assignedTutorId)}
                          </p>
                        ) : purchase.denied ? (
                          <p className="text-sm text-gray-700 font-medium">
                            Not Assigned
                          </p>
                        ) : (
                          <select
                            onChange={(e) =>
                              handleTutorChange(purchase._id, e.target.value)
                            }
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
                        <span className="font-semibold text-[#082f72]">
                          Status:
                        </span>{" "}
                        {purchase.confirmed ? (
                          <span className="text-green-600 font-semibold">
                            Confirmed
                          </span>
                        ) : purchase.denied ? (
                          <span className="text-red-600 font-semibold">
                            Denied
                          </span>
                        ) : (
                          <span className="text-yellow-600 font-semibold">
                            Pending
                          </span>
                        )}
                      </p>

                      {/* Review Buttons */}
                      <div className="mt-4 flex gap-3">
                        <button
                          onClick={() => openReviewModal(purchase, "student")}
                          className="flex-1 px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition shadow-sm"
                        >
                          Student's Review
                        </button>
                        <button
                          onClick={() => openReviewModal(purchase, "tutor")}
                          className="flex-1 px-4 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition shadow-sm"
                        >
                          Tutor's Review
                        </button>
                      </div>
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

          {/* Review Modal */}
          {isModalOpen && selectedPurchase && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-2xl shadow-xl max-w-lg w-full">
                <h4 className="font-semibold text-[#082f72] mb-4 text-lg">
                  {modalType === "student"
                    ? "Student's Reviews"
                    : "Tutor's Reviews"}{" "}
                  for {selectedPurchase.studentName}
                </h4>

                {/* Check for Missing Reviews */}
                {(!selectedPurchase[modalType + "Review"] ||
                  selectedPurchase[modalType + "Review"].length === 0) && (
                  <p className="text-red-500 mb-4">
                    No {modalType} reviews available for this purchase.
                  </p>
                )}

                {/* Calendar */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <button
                      onClick={handlePrevMonth}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      Prev
                    </button>
                    <span className="font-medium">
                      {new Date(currentYear, currentMonth).toLocaleString(
                        "default",
                        { month: "long", year: "numeric" }
                      )}
                    </span>
                    <button
                      onClick={handleNextMonth}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      Next
                    </button>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                      (day) => (
                        <div key={day} className="font-semibold text-gray-600">
                          {day}
                        </div>
                      )
                    )}
                    {emptyDays.map((_, index) => (
                      <div key={`empty-${index}`} className="h-10"></div>
                    ))}
                    {daysArray.map((day) => {
                      const reviewDates = getReviewDates(
                        selectedPurchase,
                        modalType
                      );
                      return (
                        <button
                          key={day}
                          onClick={() => {
                            setSelectedDate(day);
                            console.log(
                              `Clicked date: ${day}/${currentMonth + 1}/${currentYear}`
                            );
                          }}
                          className={`h-10 rounded-full text-sm ${
                            reviewDates.includes(day)
                              ? "bg-[#082f72] text-white font-semibold"
                              : "bg-gray-100 text-gray-600"
                          } ${
                            selectedDate === day ? "ring-2 ring-[#082f72]" : ""
                          } hover:bg-[#082f72] hover:text-white transition`}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Display Reviews for Selected Date */}
                {selectedDate && (
                  <div className="mt-4">
                    <h4 className="font-semibold text-[#082f72] mb-2">
                      Reviews for {selectedDate}/{currentMonth + 1}/
                      {currentYear}
                    </h4>
                    {getReviewsForDate(
                      selectedPurchase,
                      selectedDate,
                      modalType
                    ).length === 0 ? (
                      <p className="text-gray-500">No reviews for this date.</p>
                    ) : (
                      getReviewsForDate(
                        selectedPurchase,
                        selectedDate,
                        modalType
                      ).map((review, index) => (
                        <div key={index} className="mb-3">
                          <p className="font-medium text-[#082f72]">
                            {modalType === "student"
                              ? "Student Review"
                              : "Tutor Review"}
                          </p>
                          <p>
                            {modalType === "student"
                              ? studentReviewQuestions.q1
                              : tutorReviewQuestions.q1}
                            : {review.answers.q1}
                          </p>
                          <p>
                            {modalType === "student"
                              ? studentReviewQuestions.q2
                              : tutorReviewQuestions.q2}
                            : {review.answers.q2}
                          </p>
                          <p>
                            {modalType === "student"
                              ? studentReviewQuestions.q3
                              : tutorReviewQuestions.q3}
                            : {review.answers.q3}
                          </p>
                          {review.comments && (
                            <p>Comments: {review.comments}</p>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                )}

                <button
                  onClick={closeModal}
                  className="mt-4 px-4 py-1.5 bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium rounded-lg transition shadow-sm"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Orders;

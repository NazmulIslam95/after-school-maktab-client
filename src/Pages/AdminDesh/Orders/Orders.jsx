import { useState } from "react";
import DashboardBanner from "../../../Components/DashboardBanner/DashboardBanner";
import { MdPerson, MdSearch, MdEdit, MdAssignment } from "react-icons/md";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import { toast } from "react-toastify";
import useAllPurchase from "../../../CustomHooks/useAllPurchase";
import useAllTutors from "../../../CustomHooks/useAllTutors";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { FaDeleteLeft } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";

const Orders = () => {
  const axiosSecure = useAxiosSecure();
  const { purchases, refetch, loading } = useAllPurchase();
  const { tutors } = useAllTutors();
  const [selectedTutors, setSelectedTutors] = useState({});
  const [filter, setFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(7);
  const [currentYear, setCurrentYear] = useState(2025);
  const [searchTerm, setSearchTerm] = useState("");

  // Edit system states
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingPurchase, setEditingPurchase] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    q3: "৩. क्लাস চলাকালে শিক্ষক শিক্ষার্থীর সাথে কেমন ব্যবহার করেছেন?",
  };

  const tutorReviewQuestions = {
    q1: "১. শিক্ষার্থী কি নির্ধারিত সময়ে ক্লাসে উপস্থিত ছিল?",
    q2: "২. পূর্ববর্তী পাঠ কি সঠিকভাবে আয়ত্ত করেছে?",
    q3: "৩. আজকের ক্লাসে শিক্ষার্থীর মনোযোগ কেমন ছিল?",
  };

  // Get dates with reviews
  const getReviewDates = (purchase, type) => {
    const dates = new Set();
    const reviews = purchase[type + "Review"] || [];
    reviews.forEach((review) => {
      try {
        if (!review.createdAt) return;
        const dateStr = review.createdAt;
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return;
        const utcDay = date.getUTCDate();
        const utcMonth = date.getUTCMonth();
        const utcYear = date.getUTCFullYear();
        if (utcMonth === currentMonth && utcYear === currentYear) {
          dates.add(utcDay);
        }
      } catch (error) {
        console.error(`Error parsing ${type} review date:`, error);
      }
    });

    return Array.from(dates);
  };

  // Get reviews for a specific date
  const getReviewsForDate = (purchase, date, type) => {
    const reviews = [];
    const reviewArray = purchase[type + "Review"] || [];
    reviewArray.forEach((review) => {
      try {
        if (!review.createdAt) return;
        const dateStr = review.createdAt;
        const reviewDate = new Date(dateStr);
        if (isNaN(reviewDate.getTime())) return;
        const utcDay = reviewDate.getUTCDate();
        const utcMonth = reviewDate.getUTCMonth();
        const utcYear = reviewDate.getUTCFullYear();
        if (
          utcDay === date &&
          utcMonth === currentMonth &&
          utcYear === currentYear
        ) {
          reviews.push(review);
        }
      } catch (error) {
        console.error(`Error parsing ${type} review date:`, error);
      }
    });

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
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setSelectedDate(null);
  };

  // Open modal for reviews
  const openReviewModal = (purchase, type) => {
    setSelectedPurchase(purchase);
    setModalType(type);
    setIsModalOpen(true);
    setSelectedDate(null);
    setCurrentMonth(7);
    setCurrentYear(2025);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
    setSelectedPurchase(null);
    setSelectedDate(null);
  };

  // Format time for display
  const formatTimeForDisplay = (purchase) => {
    if (purchase.time) {
      return purchase.time;
    }

    if (purchase.selectedHour && purchase.selectedMinute && purchase.ampm) {
      return `${purchase.selectedHour}:${purchase.selectedMinute} ${purchase.ampm}`;
    }

    return "N/A";
  };

  // Open edit modal and initialize form data
  const handleEdit = (purchase) => {
    setEditingPurchase(purchase);
    setEditFormData({
      studentName: purchase.studentName || "",
      studentEmail: purchase.studentEmail || "",
      whatsappNumber: purchase.whatsappNumber || "",
      fatherName: purchase.fatherName || "",
      presentAddress: purchase.presentAddress || "",
      permanentAddress: purchase.permanentAddress || "",
      nationality: purchase.nationality || "",
      age: purchase.age || "",
      gender: purchase.gender || "",
      courseName: purchase.courseName || "",
      type: purchase.type || "",
      price: purchase.price || 0,
      originalPrice: purchase.originalPrice || 0,
      duration: purchase.duration || "",
      days: purchase.days || "",
      time: purchase.time || "",
      selectedDays: purchase.selectedDays || [],
      selectedHour: purchase.selectedHour || "7",
      selectedMinute: purchase.selectedMinute || "00",
      ampm: purchase.ampm || "AM",
      referralCode: purchase.referralCode || "",
      discountApplied: purchase.discountApplied || false,
      discountType: purchase.discountType || null,
      discountAmount: purchase.discountAmount || 0,
      siblings: purchase.siblings || [],
      assignedTutorId: purchase.assignedTutorId || "",
    });
    setIsEditModalOpen(true);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle sibling input changes
  const handleSiblingChange = (index, field, value) => {
    const updatedSiblings = [...editFormData.siblings];
    updatedSiblings[index] = {
      ...updatedSiblings[index],
      [field]: value,
    };
    setEditFormData({
      ...editFormData,
      siblings: updatedSiblings,
    });
  };

  // Add new sibling field
  const addSibling = () => {
    setEditFormData({
      ...editFormData,
      siblings: [...editFormData.siblings, { name: "", email: "" }],
    });
  };

  // Remove sibling field
  const removeSibling = (index) => {
    const updatedSiblings = [...editFormData.siblings];
    updatedSiblings.splice(index, 1);
    setEditFormData({
      ...editFormData,
      siblings: updatedSiblings,
    });
  };

  // Handle day selection
  const handleDaySelection = (day) => {
    const updatedDays = [...editFormData.selectedDays];
    const dayIndex = updatedDays.indexOf(day);

    if (dayIndex > -1) {
      updatedDays.splice(dayIndex, 1);
    } else {
      updatedDays.push(day);
    }

    setEditFormData({
      ...editFormData,
      selectedDays: updatedDays,
    });
  };

  // Submit updated purchase data
  const handleUpdatePurchase = async () => {
    setIsSubmitting(true);
    try {
      // Format the time before sending
      const formattedData = {
        ...editFormData,
        time: `${editFormData.selectedHour}:${editFormData.selectedMinute} ${editFormData.ampm}`,
      };

      const res = await axiosSecure.patch(
        `/purchase/${editingPurchase._id}`,
        formattedData
      );

      if (res.data.success) {
        toast.success(res.data.message || "Purchase updated successfully!");
        refetch();
        setIsEditModalOpen(false);
      } else {
        toast.error(res.data.message || "Failed to update purchase");
      }
    } catch (error) {
      console.error("Error updating purchase:", error);
      toast.error(error.response?.data?.message || "Error updating purchase");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Assign tutor directly from edit modal
  const handleAssignTutor = async () => {
    if (!editFormData.assignedTutorId) {
      toast.error("Please select a tutor first");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await axiosSecure.patch(
        `/purchases/confirm/${editingPurchase._id}`,
        {
          tutorId: editFormData.assignedTutorId,
        }
      );

      if (res.data.success) {
        toast.success("Tutor assigned successfully!");
        refetch();
        setIsEditModalOpen(false);
      } else {
        toast.error(res.data.message || "Failed to assign tutor");
      }
    } catch (error) {
      console.error("Error assigning tutor:", error);
      toast.error("Error assigning tutor");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/purchase/delete/${id}`);
          if (res.data.success === true) {
            console.log(res);
            Swal.fire("Deleted!", "The order has been deleted.", "success");
            refetch();
          } else {
            Swal.fire("Failed!", "Failed to delete the order.", "error");
          }
        } catch (error) {
          console.error(error);
          Swal.fire("Error!", "Something went wrong.", "error");
        }
      }
    });
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
                    {/* Edit Button */}
                    <div className="flex justify-between items-start mb-3">
                      <button>
                        <Link
                          to={`/admin/users/${purchase.studentEmail}`}
                          className="font-bold text-xl text-gray-900 flex items-center gap-1 capitalize"
                        >
                          <MdPerson /> {purchase.studentName}
                        </Link>
                      </button>
                      <div>
                        <button
                          onClick={() => handleEdit(purchase)}
                          className="p-1.5 text-[#082f72] hover:bg-[#082f72] hover:text-white rounded-full transition"
                          title="Edit purchase"
                        >
                          <MdEdit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(purchase._id)}
                          className="p-1.5 text-red-500 hover:bg-red-500 hover:text-white rounded-full transition"
                          title="Delete purchase"
                        >
                          <FaTrash size={18} />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm text-gray-700">
                      {/* <p>
                        <span className="font-semibold text-[#082f72]">
                          Email:
                        </span>{" "}
                        {purchase.studentEmail}
                      </p> */}
                      {/* <p>
                        <span className="font-semibold text-[#082f72]">
                          Whatsapp Number:
                        </span>{" "}
                        {purchase.whatsappNumber}
                      </p> */}

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
                        {formatTimeForDisplay(purchase)}
                      </p>
                      <p>
                        <span className="font-semibold text-[#082f72]">
                          Selected Days:
                        </span>{" "}
                        {Array.isArray(purchase.selectedDays)
                          ? purchase.selectedDays.join(", ")
                          : purchase.selectedDays || "N/A"}
                      </p>

                      {/* <p>
                        <span className="font-semibold text-[#082f72]">
                          Present Address:
                        </span>{" "}
                        {purchase.presentAddress || "N/A"}
                      </p> */}
                      {/* <p>
                        <span className="font-semibold text-[#082f72]">
                          Permanent Address:
                        </span>{" "}
                        {purchase.permanentAddress || "N/A"}
                      </p> */}

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

          {/* Edit Modal */}
          {isEditModalOpen && editingPurchase && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
              <div className="bg-white p-6 rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <h4 className="font-semibold text-[#082f72] mb-4 text-lg border-b pb-2">
                  Edit Purchase: {editingPurchase.studentName}
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {/* Student Information */}
                  <div className="md:col-span-2">
                    <h5 className="font-medium text-[#082f72] mb-2 border-b pb-1">
                      Student Information
                    </h5>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Student Name
                    </label>
                    <input
                      type="text"
                      name="studentName"
                      value={editFormData.studentName}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#082f72]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Student Email
                    </label>
                    <input
                      type="email"
                      name="studentEmail"
                      value={editFormData.studentEmail}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#082f72]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      WhatsApp Number
                    </label>
                    <input
                      type="text"
                      name="whatsappNumber"
                      value={editFormData.whatsappNumber}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#082f72]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Father's Name
                    </label>
                    <input
                      type="text"
                      name="fatherName"
                      value={editFormData.fatherName}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#082f72]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Present Address
                    </label>
                    <input
                      type="text"
                      name="presentAddress"
                      value={editFormData.presentAddress}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#082f72]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Permanent Address
                    </label>
                    <input
                      type="text"
                      name="permanentAddress"
                      value={editFormData.permanentAddress}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#082f72]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nationality
                    </label>
                    <input
                      type="text"
                      name="nationality"
                      value={editFormData.nationality}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#082f72]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Age
                    </label>
                    <input
                      type="text"
                      name="age"
                      value={editFormData.age}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#082f72]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Gender
                    </label>
                    <select
                      name="gender"
                      value={editFormData.gender}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#082f72]"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Tutor Assignment Section */}
                  <div className="md:col-span-2 mt-4">
                    <h5 className="font-medium text-[#082f72] mb-2 border-b pb-1 flex items-center gap-2">
                      <MdAssignment className="text-[#082f72]" /> Tutor
                      Assignment
                    </h5>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Assign Tutor
                    </label>
                    <select
                      name="assignedTutorId"
                      value={editFormData.assignedTutorId}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#082f72]"
                    >
                      <option value="">Select Tutor</option>
                      {tutors.map((tutor) => (
                        <option key={tutor._id} value={tutor._id}>
                          {tutor.name} - {tutor.expertise || "General"}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Course Information */}
                  <div className="md:col-span-2 mt-4">
                    <h5 className="font-medium text-[#082f72] mb-2 border-b pb-1">
                      Course Information
                    </h5>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Course Name
                    </label>
                    <input
                      type="text"
                      name="courseName"
                      value={editFormData.courseName}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#082f72]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Type
                    </label>
                    <select
                      name="type"
                      value={editFormData.type}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#082f72]"
                    >
                      <option value="1-to-1">1-to-1</option>
                      <option value="group">Group</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price (USD)
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={editFormData.price}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#082f72]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Original Price (USD)
                    </label>
                    <input
                      type="number"
                      name="originalPrice"
                      value={editFormData.originalPrice}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#082f72]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Duration
                    </label>
                    <input
                      type="text"
                      name="duration"
                      value={editFormData.duration}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#082f72]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Days
                    </label>
                    <input
                      type="text"
                      name="days"
                      value={editFormData.days}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#082f72]"
                    />
                  </div>

                  {/* Time Selection */}
                  <div className="md:col-span-2 space-y-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Preferred Class Time{" "}
                      <span className="text-red-500">(Bangladeshi Time) *</span>
                    </label>
                    <div className="flex flex-wrap items-center gap-3">
                      <select
                        name="selectedHour"
                        value={editFormData.selectedHour}
                        onChange={handleInputChange}
                        required
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#082f72] focus:border-[#082f72]"
                      >
                        {Array.from({ length: 12 }, (_, i) => i + 1).map(
                          (hour) => (
                            <option key={hour} value={hour}>
                              {hour}
                            </option>
                          )
                        )}
                      </select>
                      <span className="text-gray-700">:</span>
                      <select
                        name="selectedMinute"
                        value={editFormData.selectedMinute}
                        onChange={handleInputChange}
                        required
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#082f72] focus:border-[#082f72]"
                      >
                        <option value="00">00</option>
                        <option value="15">15</option>
                        <option value="30">30</option>
                        <option value="45">45</option>
                      </select>
                      <select
                        name="ampm"
                        value={editFormData.ampm}
                        onChange={handleInputChange}
                        required
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#082f72] focus:border-[#082f72]"
                      >
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                      </select>
                    </div>
                    <p className="text-sm text-gray-500">
                      Selected time: {editFormData.selectedHour}:
                      {editFormData.selectedMinute} {editFormData.ampm}
                    </p>
                  </div>

                  {/* Day Selection */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Selected Days
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Sunday",
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday",
                      ].map((day) => (
                        <button
                          key={day}
                          type="button"
                          onClick={() => handleDaySelection(day)}
                          className={`px-3 py-1 rounded-full text-sm ${
                            editFormData.selectedDays.includes(day)
                              ? "bg-[#082f72] text-white"
                              : "bg-gray-200 text-gray-700"
                          }`}
                        >
                          {day}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Discount Information */}
                  <div className="md:col-span-2 mt-4">
                    <h5 className="font-medium text-[#082f72] mb-2 border-b pb-1">
                      Discount Information
                    </h5>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Referral Code
                    </label>
                    <input
                      type="text"
                      name="referralCode"
                      value={editFormData.referralCode}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#082f72]"
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="discountApplied"
                      checked={editFormData.discountApplied}
                      onChange={handleInputChange}
                      className="mr-2 h-4 w-4 text-[#082f72] focus:ring-[#082f72] border-gray-300 rounded"
                    />
                    <label className="block text-sm font-medium text-gray-700">
                      Discount Applied
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Discount Type
                    </label>
                    <input
                      type="text"
                      name="discountType"
                      value={editFormData.discountType || ""}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#082f72]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Discount Amount
                    </label>
                    <input
                      type="number"
                      name="discountAmount"
                      value={editFormData.discountAmount}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#082f72]"
                    />
                  </div>

                  {/* Siblings Section */}
                  <div className="md:col-span-2 mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <h5 className="font-medium text-[#082f72] border-b pb-1">
                        Siblings
                      </h5>
                      <button
                        type="button"
                        onClick={addSibling}
                        className="px-3 py-1 bg-green-600 text-white text-sm rounded-lg"
                      >
                        Add Sibling
                      </button>
                    </div>

                    {editFormData.siblings.map((sibling, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3 p-3 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Sibling Name
                          </label>
                          <input
                            type="text"
                            value={sibling.name || ""}
                            onChange={(e) =>
                              handleSiblingChange(index, "name", e.target.value)
                            }
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#082f72]"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Sibling Email
                          </label>
                          <div className="flex">
                            <input
                              type="email"
                              value={sibling.email || ""}
                              onChange={(e) =>
                                handleSiblingChange(
                                  index,
                                  "email",
                                  e.target.value
                                )
                              }
                              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#082f72]"
                            />
                            <button
                              type="button"
                              onClick={() => removeSibling(index)}
                              className="ml-2 px-3 py-2 bg-red-600 text-white text-sm rounded-lg"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between gap-3 mt-6 pt-4 border-t">
                  <div>
                    <button
                      onClick={handleAssignTutor}
                      disabled={isSubmitting || !editFormData.assignedTutorId}
                      className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg flex items-center disabled:bg-green-400 disabled:cursor-not-allowed"
                    >
                      <MdAssignment className="mr-2" />
                      Assign Tutor
                    </button>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setIsEditModalOpen(false)}
                      className="px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-lg"
                      disabled={isSubmitting}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleUpdatePurchase}
                      className="px-4 py-2 bg-[#082f72] text-white text-sm font-medium rounded-lg flex items-center"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Saving...
                        </>
                      ) : (
                        "Save Changes"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

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

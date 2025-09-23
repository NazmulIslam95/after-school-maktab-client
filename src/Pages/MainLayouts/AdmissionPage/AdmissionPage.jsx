import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Navbar from "../../../Components/Navbar/Navbar";
import Banner from "../../../Components/Banner/Banner";
import { Trefoil } from "ldrs/react";
import useCurrentUser from "../../../CustomHooks/useCurrentUser";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import useAxiosPublic from "../../../CustomHooks/useAxiosPublic";
import useAuth from "../../../CustomHooks/useAuth";

const AdmissionPage = () => {
  const { state } = useLocation();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const { currentUser, loading: userLoading } = useCurrentUser();

  const [formData, setFormData] = useState({
    studentName: "",
    studentEmail: "",
    whatsappNumber: "",
    fatherName: "",
    presentAddress: "",
    permanentAddress: "",
    nationality: "",
    age: "",
    gender: "",
    referralCode: "",
    selectedDays: [],
    selectedHour: "12",
    selectedMinute: "00",
    ampm: "PM",
  });

  const [setDiscountedPrice] = useState(state.price);
  const [isValidatingCode, setIsValidatingCode] = useState(false);
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [originalPrice] = useState(state.price);

  // Sibling feature state
  const [hasSiblings, setHasSiblings] = useState(false);
  const [siblings, setSiblings] = useState([{ name: "", email: "" }]);

  // Days of the week
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Hours and minutes options
  const hours = Array.from({ length: 12 }, (_, i) =>
    (i + 1).toString().padStart(2, "0")
  );
  const minutes = Array.from({ length: 12 }, (_, i) =>
    (i * 5).toString().padStart(2, "0")
  );

  // Redirect to login if no user
  useEffect(() => {
    if (!user && !loading) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  // Pre-populate form with user data
  useEffect(() => {
    if (user && currentUser) {
      setFormData({
        studentName: user.displayName || currentUser.name || "",
        studentEmail: user.email || currentUser.email || "",
        whatsappNumber: currentUser.PhoneNo || currentUser.whatsappNumber || "",
        fatherName: currentUser.fatherName || "",
        presentAddress: currentUser.presentAddress || "",
        permanentAddress: currentUser.permanentAddress || "",
        nationality: currentUser.nationality || "",
        age: currentUser.age || "",
        gender: currentUser.gender || "",
        referralCode: "",
        selectedDays: [],
        selectedHour: "12",
        selectedMinute: "00",
        ampm: "PM",
      });
    } else if (user) {
      setFormData((prev) => ({
        ...prev,
        studentName: user.displayName || "",
        studentEmail: user.email || "",
      }));
    }
  }, [user, currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle day selection
  const handleDaySelection = (day) => {
    if (formData.selectedDays.includes(day)) {
      // Remove day if already selected
      setFormData((prev) => ({
        ...prev,
        selectedDays: prev.selectedDays.filter((d) => d !== day),
      }));
    } else {
      // Add day if not selected and within the limit
      if (formData.selectedDays.length < parseInt(state.days)) {
        setFormData((prev) => ({
          ...prev,
          selectedDays: [...prev.selectedDays, day],
        }));
      } else {
        Swal.fire({
          icon: "warning",
          title: "Day Limit Exceeded",
          text: `You can only select ${state.days} days. Please deselect a day first.`,
          confirmButtonColor: "#082f72",
        });
      }
    }
  };

  // Sibling functions
  const addSibling = () => {
    setSiblings([...siblings, { name: "", email: "" }]);
  };

  const removeSibling = (index) => {
    const updated = [...siblings];
    updated.splice(index, 1);
    setSiblings(updated);
  };

  const handleSiblingChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...siblings];
    updated[index][name] = value;
    setSiblings(updated);
  };

  // Calculate sibling discount
  const siblingDiscount = hasSiblings
    ? originalPrice * 0.2 * siblings.filter((s) => s.name && s.email).length
    : 0;

  // Calculate final price (combines referral and sibling discounts)
  const finalPrice = isCodeValid
    ? originalPrice * 0.85 - siblingDiscount
    : originalPrice - siblingDiscount;

  const validateReferralCode = async () => {
    if (!formData.referralCode) {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Please enter a referral code first",
        confirmButtonColor: "#082f72",
      });
      return;
    }

    if (currentUser?.referralCode === formData.referralCode) {
      Swal.fire({
        icon: "error",
        title: "Invalid Code",
        text: "You cannot use your own referral code",
        confirmButtonColor: "#082f72",
      });
      return;
    }

    setIsValidatingCode(true);
    try {
      const response = await axiosPublic.get(
        `/users/validateReferral?code=${formData.referralCode}&userId=${user?.email}`
      );

      if (response.data.success) {
        setIsCodeValid(true);
        const discount = originalPrice * 0.15;
        setDiscountedPrice(originalPrice - discount);
        Swal.fire({
          icon: "success",
          title: "Discount Applied!",
          text: `Your 15% discount has been applied. New price: $${(originalPrice - discount).toFixed(2)}`,
          confirmButtonColor: "#082f72",
        });
      } else {
        setIsCodeValid(false);
        setDiscountedPrice(originalPrice);
        Swal.fire({
          icon: "error",
          title: "Invalid Code",
          text: response.data.message || "The referral code is not valid",
          confirmButtonColor: "#082f72",
        });
      }
    } catch (error) {
      console.error("Error validating referral code:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to validate referral code. Please try again.",
        confirmButtonColor: "#082f72",
      });
    } finally {
      setIsValidatingCode(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate day selection
    if (formData.selectedDays.length !== parseInt(state.days)) {
      Swal.fire({
        icon: "error",
        title: "Day Selection Error",
        text: `Please select exactly ${state.days} days for your classes.`,
        confirmButtonColor: "#082f72",
      });
      return;
    }

    const purchaseData = {
      courseId: state.courseId,
      courseName: state.courseName,
      type: state.type,
      price: finalPrice,
      originalPrice: originalPrice,
      duration: state.duration,
      days: state.days,
      time: `${formData.selectedHour}:${formData.selectedMinute} ${formData.ampm}`,
      confirmed: false,
      referralCode: isCodeValid ? formData.referralCode : null,
      discountApplied: isCodeValid || hasSiblings,
      discountType: isCodeValid ? "referral" : hasSiblings ? "sibling" : null,
      discountAmount: isCodeValid
        ? originalPrice * 0.15 + siblingDiscount
        : siblingDiscount,
      siblings: hasSiblings ? siblings.filter((s) => s.name && s.email) : [],
      ...formData,
    };

    try {
      // Update user information
      const userUpdateData = {
        fatherName: formData.fatherName,
        whatsappNumber: formData.whatsappNumber,
        presentAddress: formData.presentAddress,
        permanentAddress: formData.permanentAddress,
        nationality: formData.nationality,
        age: formData.age,
        gender: formData.gender,
      };

      const userResponse = await axiosSecure.patch(
        `/users/${user.email}`,
        userUpdateData
      );
      if (!userResponse.data.success) {
        throw new Error(
          userResponse.data.message || "Failed to update user information"
        );
      }

      // Submit admission request
      const purchaseResponse = await axiosSecure.post(
        "/purchase",
        purchaseData
      );
      if (!purchaseResponse.data.success) {
        throw new Error(
          purchaseResponse.data.message || "Failed to submit admission request"
        );
      }

      Swal.fire({
        icon: "success",
        title: "Request Submitted!",
        text: hasSiblings
          ? `You and ${siblings.filter((s) => s.name && s.email).length} sibling(s) enrolled successfully!`
          : "Your Admission Request Has Been Successfully Submitted.",
        confirmButtonColor: "#082f72",
      }).then(() => {
        navigate("/");
      });
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: error.message || "Something went wrong. Please try again.",
        confirmButtonColor: "#082f72",
      });
    }
  };

  if (loading || userLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Trefoil
          size="100"
          stroke="2"
          strokeLength="0.15"
          bgOpacity="0.1"
          speed="1.4"
          color="black"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      <Banner
        title="Admission Form"
        subTitle="Complete your enrollment process"
        className="bg-gradient-to-r from-[#082f72] to-blue-600 text-white rounded-xl shadow-lg"
      />

      <div className="max-w-5xl mx-auto px-4 py-8 hind-siliguri-regular">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Course Summary */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b">
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              Course Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500">Course Name</p>
                <p className="font-semibold text-gray-800">
                  {state.courseName}
                </p>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500">Session</p>
                <p className="font-semibold text-gray-800">
                  {state.type === "1-to-1" ? "One To One" : state.type}
                </p>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500">Price</p>
                <p className="font-semibold text-gray-800">
                  ${finalPrice.toFixed(2)}
                  {(isCodeValid || siblingDiscount > 0) && (
                    <span className="ml-2 text-sm text-green-600 line-through">
                      ${originalPrice}
                    </span>
                  )}
                  {siblingDiscount > 0 && (
                    <span className="block text-xs text-blue-600 mt-1">
                      {siblings.filter((s) => s.name && s.email).length}{" "}
                      sibling(s) × 20% discount
                    </span>
                  )} USD
                </p>
              </div>
              {state.type === "1-to-1" && (
                <>
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="font-semibold text-gray-800">
                      {state.duration}
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-500">Days per week</p>
                    <p className="font-semibold text-gray-800">{state.days}</p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Admission Form */}
          <div className="p-6 md:p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              Personal Information
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Student Name */}
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="studentName"
                    value={formData.studentName}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                  />
                </div>

                {/* Student Email */}
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="studentEmail"
                    value={formData.studentEmail}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                  />
                </div>

                {/* Father's Name */}
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Father's Name
                  </label>
                  <input
                    type="text"
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* WhatsApp Number */}
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    name="whatsappNumber"
                    value={formData.whatsappNumber}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Gender */}
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Nationality */}
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Nationality
                  </label>
                  <input
                    type="text"
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Age */}
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Age
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Present Address */}
                <div className="space-y-1 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Present Address
                  </label>
                  <textarea
                    name="presentAddress"
                    value={formData.presentAddress}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  ></textarea>
                </div>

                {/* Permanent Address */}
                <div className="space-y-1 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Permanent Address
                  </label>
                  <textarea
                    name="permanentAddress"
                    value={formData.permanentAddress}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  ></textarea>
                </div>
              </div>

              {/* Class Schedule Section */}
              <div className="border-t pt-6 mt-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Class Schedule
                </h3>

                {/* Day Selection */}
                <div className="space-y-3 mb-6">
                  <label className="block text-sm font-medium text-gray-700">
                    Which days of the week would you like to attend classes? *
                    <span className="text-gray-500 ml-2">
                      (Select {state.days} days)
                    </span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {daysOfWeek.map((day) => (
                      <button
                        type="button"
                        key={day}
                        onClick={() => handleDaySelection(day)}
                        className={`p-3 border rounded-lg text-center transition-colors ${
                          formData.selectedDays.includes(day)
                            ? "bg-blue-100 border-blue-500 text-blue-700 font-medium"
                            : "border-gray-300 hover:border-blue-300"
                        } ${
                          formData.selectedDays.length >=
                            parseInt(state.days) &&
                          !formData.selectedDays.includes(day)
                            ? "opacity-50 cursor-not-allowed"
                            : "cursor-pointer"
                        }`}
                        disabled={
                          formData.selectedDays.length >=
                            parseInt(state.days) &&
                          !formData.selectedDays.includes(day)
                        }
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                  {formData.selectedDays.length > 0 && (
                    <p className="text-sm text-gray-600">
                      Selected days: {formData.selectedDays.join(", ")}
                    </p>
                  )}
                </div>

                {/* Time Selection */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Preferred Class Time{" "}
                    <span className="text-red-500">
                      (Submit Bangladeshi Time) *
                    </span>
                  </label>
                  <div className="flex flex-wrap items-center gap-3">
                    <select
                      name="selectedHour"
                      value={formData.selectedHour}
                      onChange={handleChange}
                      required
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {hours.map((hour) => (
                        <option key={hour} value={hour}>
                          {hour}
                        </option>
                      ))}
                    </select>
                    <span className="text-gray-700">:</span>
                    <select
                      name="selectedMinute"
                      value={formData.selectedMinute}
                      onChange={handleChange}
                      required
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {minutes.map((minute) => (
                        <option key={minute} value={minute}>
                          {minute}
                        </option>
                      ))}
                    </select>
                    <select
                      name="ampm"
                      value={formData.ampm}
                      onChange={handleChange}
                      required
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="AM">AM</option>
                      <option value="PM">PM</option>
                    </select>
                  </div>
                  <p className="text-sm text-gray-500">
                    Selected time: {formData.selectedHour}:
                    {formData.selectedMinute} {formData.ampm}
                  </p>
                </div>
              </div>

              {/* Discounts Section */}
              <div className="border-t pt-6 mt-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Discount Options
                </h3>

                {/* Sibling Enrollment Section */}
                <div className="space-y-4 mb-6">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasSiblings}
                      onChange={() => setHasSiblings(!hasSiblings)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    Enroll with siblings (Get 20% discount for each sibling)
                  </label>

                  {hasSiblings && (
                    <div className="mt-2 space-y-3">
                      {siblings.map((sibling, index) => (
                        <div
                          key={index}
                          className="grid grid-cols-1 md:grid-cols-2 gap-3"
                        >
                          <div>
                            <label className="block text-xs text-gray-500">
                              Sibling {index + 1} Name
                            </label>
                            <input
                              type="text"
                              name="name"
                              value={sibling.name}
                              onChange={(e) => handleSiblingChange(index, e)}
                              className="w-full px-3 py-2 border rounded"
                              required={hasSiblings}
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-500">
                              Sibling {index + 1} Email
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={sibling.email}
                              onChange={(e) => handleSiblingChange(index, e)}
                              className="w-full px-3 py-2 border rounded"
                              required={hasSiblings}
                            />
                          </div>
                          {index > 0 && (
                            <button
                              type="button"
                              onClick={() => removeSibling(index)}
                              className="text-red-500 text-xs md:col-span-2"
                            >
                              Remove sibling
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={addSibling}
                        className="text-blue-500 text-sm flex items-center gap-1 mt-2"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                        Add another sibling
                      </button>
                    </div>
                  )}
                </div>

                {/* Referral Code */}
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Referral Code{" "}
                    <span className="text-gray-400">(optional)</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      name="referralCode"
                      value={formData.referralCode}
                      onChange={handleChange}
                      disabled={isCodeValid}
                      placeholder="Enter referral code"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button
                      type="button"
                      onClick={validateReferralCode}
                      disabled={isValidatingCode || isCodeValid}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isValidatingCode
                        ? "Validating..."
                        : isCodeValid
                          ? "✓ Applied"
                          : "Apply"}
                    </button>
                  </div>
                  {isCodeValid && (
                    <p className="mt-1 text-sm text-green-600">
                      15% discount applied successfully!
                    </p>
                  )}
                </div>
              </div>

              {/* Terms and Conditions Section */}
              <div className="border-t pt-6 mt-6">
                <h4 className="text-lg font-bold text-gray-800 mb-3">
                  Terms and Conditions
                </h4>

                <div className="prose prose-sm text-gray-700">
                  <h5 className="font-semibold text-gray-800">
                    ক্লাস সংক্রান্ত নির্দেশিকা
                  </h5>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>
                      শিক্ষার্থীদের অবশ্যই যথাসময়ে ক্লাসে উপস্থিত হতে হবে।
                    </li>
                    <li>
                      ক্লাস শুরু হওয়ার 10 মিনিট পর আর প্রবেশ করা যাবে না এবং
                      সেই ক্লাস আর দেওয়া হবে না।
                    </li>
                    <li>
                      কোনো কারণে ক্লাস করতে না পারলে অন্তত ১ ঘণ্টা আগে জানাতে
                      হবে। জানালে পরবর্তীতে সেই ক্লাস পুনরায় নেওয়া হবে।
                    </li>
                    <li>
                      শিক্ষক উপস্থিত না হলে অথবা প্রাতিষ্ঠানিক কোন কারণে ক্লাস
                      অনুষ্ঠিত না হলে, সেটি পরবর্তীতে সেই ক্লাস নেওয়া হবে।
                    </li>
                  </ol>
                </div>

                {/* Terms Agreement Checkbox */}
                <div className="flex items-start mt-4">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      required
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="terms"
                      className="font-medium text-gray-700"
                    >
                      I have read and agree to the terms and conditions
                    </label>
                    <p className="text-gray-500">
                      By submitting this form, you agree to abide by all the
                      policies mentioned above.
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full md:w-full px-8 py-3 bg-gradient-to-r from-[#082f72] to-blue-600 hover:from-blue-600 hover:to-[#082f72] text-white font-medium rounded-lg shadow-md hover:shadow-lg transition duration-300"
                >
                  Submit Admission Request
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmissionPage;

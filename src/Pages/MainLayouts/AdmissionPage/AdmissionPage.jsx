import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import Swal from "sweetalert2";
import Navbar from "../../../Components/Navbar/Navbar";
import Banner from "../../../Components/Banner/Banner";
import { Trefoil } from "ldrs/react";
import useCurrentUser from "../../../CustomHooks/useCurrentUser";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import useAxiosPublic from "../../../CustomHooks/useAxiosPublic";

const AdmissionPage = () => {
  const { state } = useLocation();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { user, loading } = useContext(AuthContext);
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
  });

  const [discountedPrice, setDiscountedPrice] = useState(state.price);
  const [isValidatingCode, setIsValidatingCode] = useState(false);
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [originalPrice] = useState(state.price);

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

    // Check if user is trying to use their own code (frontend check)
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

    const purchaseData = {
      courseId: state.courseId,
      courseName: state.courseName,
      type: state.type,
      price: isCodeValid ? discountedPrice : originalPrice,
      originalPrice: originalPrice,
      duration: state.duration,
      days: state.days,
      confirmed: false,
      referralCode: isCodeValid ? formData.referralCode : null,
      discountApplied: isCodeValid,
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
        text: "Your Admission Request Has Been Successfully Submitted.",
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
                  ${isCodeValid ? discountedPrice.toFixed(2) : originalPrice}
                  {isCodeValid && (
                    <span className="ml-2 text-sm text-green-600 line-through">
                      ${originalPrice}
                    </span>
                  )}
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
                    <p className="text-sm text-gray-500">Days</p>
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
                    min="10"
                    max="99"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
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

              {/* Present Address */}
              <div className="space-y-1">
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
              <div className="space-y-1">
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

              {/* Terms and Conditions */}
              <div className="flex items-start">
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
                  <label htmlFor="terms" className="font-medium text-gray-700">
                    I agree to the terms and conditions
                  </label>
                  <p className="text-gray-500">
                    By submitting this form, you agree to our enrollment
                    policies.
                  </p>
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

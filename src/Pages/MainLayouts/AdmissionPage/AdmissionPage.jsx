// AdmissionPage.jsx
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import Swal from "sweetalert2";
import Navbar from "../../../Components/Navbar/Navbar";
import Banner from "../../../Components/Banner/Banner";
import { Trefoil } from "ldrs/react";
// import useAxiosPublic from "../../../CustomHooks/useAxiosPublic";
import useCurrentUser from "../../../CustomHooks/useCurrentUser";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";

const AdmissionPage = () => {
  const { state } = useLocation();
  // const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
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
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const purchaseData = {
      courseId: state.courseId,
      courseName: state.courseName,
      type: state.type,
      price: state.price,
      duration: state.duration,
      days: state.days,
      confirmed: false,
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
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Banner
        title="Admission Form"
        subTitle="Enroll in Your Course"
        className="bg-gradient-to-r from-[#082f72] to-purple-600 text-white rounded-xl shadow-lg"
      />
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-8">
        <h2 className="text-2xl font-bold text-[#082f72] mb-6">
          Get Admission
        </h2>
        <div className="mb-6 space-y-2 text-sm text-gray-700">
          <p>
            <span className="font-semibold text-[#082f72]">Course:</span>{" "}
            {state.courseName}
          </p>
          <p>
            <span className="font-semibold text-[#082f72]">Type:</span>{" "}
            {state.type}
          </p>
          {state.type === "1-to-1" && (
            <>
              <p>
                <span className="font-semibold text-[#082f72]">Duration:</span>{" "}
                {state.duration}
              </p>
              <p>
                <span className="font-semibold text-[#082f72]">Days:</span>{" "}
                {state.days}
              </p>
            </>
          )}
          <p>
            <span className="font-semibold text-[#082f72]">Price:</span> $
            {state.price}
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div>
            <label className="block mb-1 font-semibold text-[#082f72]">
              Name
            </label>
            <input
              type="text"
              name="studentName"
              value={formData.studentName}
              readOnly
              className="border w-full px-3 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#082f72]"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-[#082f72]">
              E-mail
            </label>
            <input
              type="text"
              name="studentEmail"
              value={formData.studentEmail}
              readOnly
              className="border w-full px-3 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#082f72]"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-[#082f72]">
              Father's Name
            </label>
            <input
              type="text"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleChange}
              required
              className="border w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#082f72]"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-[#082f72]">
              WhatsApp Number
            </label>
            <input
              type="text"
              name="whatsappNumber"
              value={formData.whatsappNumber}
              onChange={handleChange}
              required
              className="border w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#082f72]"
            />
          </div>
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-1 font-semibold text-[#082f72]">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="border w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#082f72]"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 font-semibold text-[#082f72]">
                Nationality
              </label>
              <input
                type="text"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                required
                className="border w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#082f72]"
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold text-[#082f72]">
                Age
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
                className="border w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#082f72]"
              />
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="block mb-1 font-semibold text-[#082f72]">
              Present Address
            </label>
            <textarea
              name="presentAddress"
              value={formData.presentAddress}
              onChange={handleChange}
              required
              rows={3}
              className="border w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#082f72]"
            ></textarea>
          </div>
          <div className="md:col-span-2">
            <label className="block mb-1 font-semibold text-[#082f72]">
              Permanent Address
            </label>
            <textarea
              name="permanentAddress"
              value={formData.permanentAddress}
              onChange={handleChange}
              required
              rows={3}
              className="border w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#082f72]"
            ></textarea>
          </div>
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-[#082f72] text-white px-6 py-2 rounded-lg font-semibold hover:bg-white hover:text-[#082f72] border hover:border-[#082f72] transition shadow-sm"
            >
              Request Admission
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdmissionPage;

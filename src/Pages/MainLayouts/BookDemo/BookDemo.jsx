import { useState } from "react";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import Navbar from "../../../Components/Navbar/Navbar";
import Banner from "../../../Components/Banner/Banner";
import useAuth from "../../../CustomHooks/useAuth";

const BookDemo = () => {
  const { user } = useAuth();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const { courseId, courseName, type } = location.state || {};

  const [formData, setFormData] = useState({
    presentAddress: "",
    gender: "",
    age: "",
    demoDateTime: "",
    whatsapp: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const demoInfo = {
      courseId,
      courseName,
      type,
      name: user?.displayName || "",
      email: user?.email || "",
      ...formData,
    };

    try {
      const res = await axiosSecure.post("/demoBookings", demoInfo);
      if (res.data.success && res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Booked!",
          text: "Your demo class has been successfully booked.",
          confirmButtonColor: "#3085d6",
        });

        setFormData({
          presentAddress: "",
          gender: "",
          age: "",
          demoDateTime: "",
          whatsapp: "",
        });
      }
    } catch (error) {
      console.error("Booking failed:", error);
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Something went wrong. Please try again later.",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <div>
      <Navbar />
      <Banner title="Book Demo Class" subTitle="Book Demo" />
      <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-8">
        <h2 className="text-2xl font-semibold mb-4">Book Demo Class</h2>

        <div className="mb-6">
          <p>
            <strong>Course Name:</strong> {courseName}
          </p>
          <p>
            <strong>Type:</strong> {type}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div>
            <label className="block font-medium">Your Name</label>
            <input
              type="text"
              value={user?.displayName || ""}
              readOnly
              className="w-full border rounded px-3 py-2 bg-gray-100"
            />
          </div>

          <div>
            <label className="block font-medium">Your Email</label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="w-full border rounded px-3 py-2 bg-gray-100"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block font-medium">Present Address</label>
            <textarea
              name="presentAddress"
              value={formData.presentAddress}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </div>

          <div>
            <label className="block font-medium">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium">Preferred Date & Time</label>
            <input
              type="datetime-local"
              name="demoDateTime"
              value={formData.demoDateTime}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium">WhatsApp Number</label>
            <input
              type="tel"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
              placeholder="e.g. +8801XXXXXXXXX"
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
            >
              Submit Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookDemo;

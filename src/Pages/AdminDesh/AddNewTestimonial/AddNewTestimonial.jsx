import { useState } from "react";
import DashboardBanner from "../../../Components/DashboardBanner/DashboardBanner";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";

const AddNewTestimonial = () => {
  const axiosSecure = useAxiosSecure();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    message: "",
    gender: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.gender) newErrors.gender = "Please select gender";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    if (formData.message.length > 500)
      newErrors.message = "Message must be less than 500 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const res = await axiosSecure.post("/testimonials", {
        ...formData,
        createdAt: new Date().toISOString(), // Add timestamp
      });

      if (res.data?.insertedId) {
        Swal.fire({
          title: "Success!",
          text: "Testimonial added successfully",
          icon: "success",
          confirmButtonText: "OK",
        });
        // Reset form
        setFormData({
          name: "",
          address: "",
          message: "",
          gender: "",
          rating: 5,
        });
      }
    } catch (err) {
      console.error("Error adding testimonial:", err);
      Swal.fire({
        title: "Error!",
        text: err.response?.data?.message || "Failed to add testimonial",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-5">
      <DashboardBanner title="Add New Testimonial" subTitle="New Testimonial" />

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow rounded-lg max-w-lg mt-6 mx-auto"
      >
        {/* Name Field */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter full name"
            className={`input input-bordered w-full ${errors.name ? "input-error" : ""}`}
            value={formData.name}
            onChange={handleChange}
            disabled={isSubmitting}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        {/* address Field */}
        <div className="mb-4">
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Address <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="address"
            name="address"
            placeholder="Enter Address"
            className={`input input-bordered w-full ${errors.address ? "input-error" : ""}`}
            value={formData.address}
            onChange={handleChange}
            disabled={isSubmitting}
          />
          {errors.address && (
            <p className="mt-1 text-sm text-red-600">{errors.address}</p>
          )}
        </div>

        {/* Gender Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gender <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-4">
            {["Male", "Female", "Other"].map((gender) => (
              <label key={gender} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="gender"
                  value={gender}
                  checked={formData.gender === gender}
                  onChange={handleChange}
                  className="radio radio-primary"
                  disabled={isSubmitting}
                />
                <span>{gender}</span>
              </label>
            ))}
          </div>
          {errors.gender && (
            <p className="mt-1 text-sm text-red-600">{errors.gender}</p>
          )}
        </div>

        {/* Rating Field
        <div className="mb-4">
          <label
            htmlFor="rating"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Rating
          </label>
          <div className="rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <input
                key={star}
                type="radio"
                name="rating"
                value={star}
                checked={formData.rating === star}
                onChange={handleChange}
                className="mask mask-star-2 bg-orange-400"
                disabled={isSubmitting}
              />
            ))}
          </div>
        </div> */}

        {/* Message Field */}
        <div className="mb-6">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Enter your testimonial message"
            className={`textarea textarea-bordered w-full ${errors.message ? "textarea-error" : ""}`}
            rows="4"
            value={formData.message}
            onChange={handleChange}
            disabled={isSubmitting}
          />
          <div className="flex justify-between mt-1">
            {errors.message ? (
              <p className="text-sm text-red-600">{errors.message}</p>
            ) : (
              <p className="text-sm text-gray-500">
                {500 - formData.message.length} characters remaining
              </p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`btn btn-primary w-full ${isSubmitting ? "loading" : ""}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Testimonial"}
        </button>
      </form>
    </div>
  );
};

export default AddNewTestimonial;

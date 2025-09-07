import Swal from "sweetalert2";
import DashboardBanner from "../../../Components/DashboardBanner/DashboardBanner";
import { useState } from "react";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";

const AddRecentStudent = () => {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const axiosSecure = useAxiosSecure();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image upload to ImageBB
  const handleImageUpload = async (e) => {
    const imageFile = e.target.files[0];
    if (!imageFile) return;

    setImageUploading(true);

    try {
      const formData = new FormData();
      formData.append("image", imageFile);
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imageBB_API}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (data.success) {
        setFormData((prev) => ({
          ...prev,
          image: data.data.url,
        }));
        // Swal.fire("Success!", "Image uploaded successfully", "success");
      } else {
        throw new Error("Image upload failed");
      }
    } catch (error) {
      console.error("Image upload error:", error);
      // Swal.fire("Error", "Image upload failed!", "error");
    } finally {
      setImageUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if image is uploaded
    if (!formData.image) {
      Swal.fire("Warning", "Please upload an image first", "warning");
      return;
    }

    setLoading(true);

    try {
      const res = await axiosSecure.post("/newRecentStudent", formData);
      if (res.data.insertedId) {
        Swal.fire("Success!", "Student added successfully", "success");
        setFormData({
          name: "",
          image: "",
          address: "",
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Something went wrong!", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <DashboardBanner
        title="Add Recent Student"
        subTitle="New Recent Student"
      />

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
            onChange={handleChange}
            required
            type="text"
            id="name"
            name="name"
            placeholder="Enter full name"
            className="input input-bordered w-full"
          />
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
            onChange={handleChange}
            required
            type="text"
            id="address"
            name="address"
            placeholder="Enter Address"
            className="input input-bordered w-full"
          />
        </div>
        {/* Image Field */}
        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Image <span className="text-red-500">*</span>
          </label>
          <input
            required
            onChange={handleImageUpload}
            type="file"
            id="image"
            name="image"
            className="w-full file-input h-[42px] border border-black rounded"
            accept="image/*"
          />
        </div>
        <button
          type="submit"
          disabled={loading || imageUploading}
          className="bg-blue-600 w-full text-white font-semibold px-6 py-2 rounded hover:bg-blue-700 disabled:bg-blue-400"
        >
          {loading
            ? "Submitting..."
            : imageUploading
              ? "Uploading Image..."
              : "Add Student"}
        </button>
      </form>
    </div>
  );
};

export default AddRecentStudent;

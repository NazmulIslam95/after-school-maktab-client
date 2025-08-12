import { useState } from "react";
import DashboardBanner from "../../../Components/DashboardBanner/DashboardBanner";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import Swal from "sweetalert2";

const AddATutor = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    education: "",
    experience: "",
    zoomLink: "",
    image: "",
    details: "",
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
      const res = await axiosSecure.post("/newTutor", formData);
      if (res.data.insertedId) {
        Swal.fire("Success!", "Tutor added successfully", "success");
        setFormData({
          name: "",
          email: "",
          education: "",
          experience: "",
          zoomLink: "",
          image: "",
          details: "",
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
    <div className="px-4 md:px-10">
      <DashboardBanner title="Add A Tutor" subTitle="Add Tutor" />

      <form
        onSubmit={handleSubmit}
        className="max-w-5xl mx-auto bg-white p-8 rounded shadow-md space-y-6"
      >
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">Tutor's Name</label>
            <input
              type="text"
              name="name"
              className="w-full border px-4 py-2 rounded"
              value={formData.name}
              onChange={handleChange}
              placeholder="Tutor's Name"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Tutor's Email</label>
            <input
              type="text"
              name="email"
              className="w-full border px-4 py-2 rounded"
              value={formData.email}
              onChange={handleChange}
              placeholder="Tutor's Email"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Tutor's Education</label>
            <input
              type="text"
              name="education"
              className="w-full border px-4 py-2 rounded"
              value={formData.education}
              onChange={handleChange}
              placeholder="Educational Qualification In Short"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Tutor's Zoom Link</label>
            <input
              type=""
              name="zoomLink"
              className="w-full border px-4 py-2 rounded"
              value={formData.zoomLink}
              onChange={handleChange}
              placeholder="Tutor's Zoom Link"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Tutor's Image</label>
            <input
              type="file"
              name="image"
              className="w-full file-input h-[42px] border border-black rounded"
              onChange={handleImageUpload}
              accept="image/*"
              required
            />
            {imageUploading && (
              <p className="text-sm text-blue-600">Uploading image...</p>
            )}
            {formData.image && !imageUploading && (
              <p className="text-sm text-green-600">
                Image uploaded successfully!
              </p>
            )}
          </div>
          <div>
            <label className="block font-medium mb-1">Tutor's Experience</label>
            <input
              type="text"
              name="experience"
              className="w-full border px-4 py-2 rounded"
              value={formData.experience}
              onChange={handleChange}
              required
              placeholder="Tutor's Experience In Years"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block font-medium mb-1">Tutor's Details</label>
            <textarea
              name="details"
              className="w-full border px-4 py-2 rounded"
              rows="4"
              value={formData.details}
              onChange={handleChange}
              required
              placeholder="Tutor's Detail Info"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={loading || imageUploading}
            className="bg-blue-600 w-full text-white font-semibold px-6 py-2 rounded hover:bg-blue-700 disabled:bg-blue-400"
          >
            {loading
              ? "Submitting..."
              : imageUploading
                ? "Uploading Image..."
                : "Add Tutor"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddATutor;

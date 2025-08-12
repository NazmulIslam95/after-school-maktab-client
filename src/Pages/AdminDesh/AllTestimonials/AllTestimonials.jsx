/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import DashboardBanner from "../../../Components/DashboardBanner/DashboardBanner";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaEdit, FaTrash, FaTimes, FaCheck } from "react-icons/fa";
import { Trefoil } from "ldrs/react";

const AllTestimonials = () => {
  const axiosSecure = useAxiosSecure();
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentlyEditing, setCurrentlyEditing] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    address: "",
    message: "",
    gender: "",
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axiosSecure.get("/testimonials");
      setTestimonials(res.data);
    } catch (err) {
      console.error("Error fetching testimonials:", err);
      setError("Failed to load testimonials. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await axiosSecure.delete(`/testimonials/${id}`);
        setTestimonials(testimonials.filter((item) => item._id !== id));
        Swal.fire("Deleted!", "The testimonial has been deleted.", "success");
      }
    } catch (err) {
      console.error("Error deleting testimonial:", err);
      Swal.fire("Error", "Failed to delete testimonial", "error");
    }
  };

  // const handleEdit = (testimonial) => {
  //   setCurrentlyEditing(testimonial._id);
  //   setEditFormData({
  //     name: testimonial.name,
  //     address: testimonial.address,
  //     message: testimonial.message,
  //     gender: testimonial.gender,
  //   });
  // };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e, testimonialId) => {
    e.preventDefault();
    try {
      await axiosSecure.patch(`/testimonials/${testimonialId}`, editFormData);
      fetchTestimonials();
      setCurrentlyEditing(null);
      Swal.fire("Success", "Testimonial updated successfully", "success");
    } catch (err) {
      console.error("Error updating testimonial:", err);
      Swal.fire("Error", "Failed to update testimonial", "error");
    }
  };

  const handleCancelEdit = () => {
    setCurrentlyEditing(null);
  };

  if (loading) {
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
  if (error) return <div className="text-center text-red-500 p-8">{error}</div>;

  return (
    <div className="p-5 hind-siliguri-medium">
      <DashboardBanner
        title="All Testimonials"
        subTitle="Manage Testimonials"
      />

      {testimonials.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No testimonials found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial._id}
              className="bg-white rounded-md p-6 shadow hover:shadow-md transition-shadow relative"
            >
              {/* Edit/Delete Buttons */}
              <div className="absolute top-3 right-3 flex gap-2">
                <button
                  // onClick={() => handleEdit(testimonial)}
                  className="text-blue-500 hover:text-blue-700"
                  aria-label="Edit"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(testimonial._id)}
                  className="text-red-500 hover:text-red-700"
                  aria-label="Delete"
                >
                  <FaTrash />
                </button>
              </div>

              {currentlyEditing === testimonial._id ? (
                <form
                  onSubmit={(e) => handleEditSubmit(e, testimonial._id)}
                  className="space-y-3"
                >
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={editFormData.name}
                    onChange={handleEditChange}
                    className="input input-bordered w-full"
                    required
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={editFormData.address}
                    onChange={handleEditChange}
                    className="input input-bordered w-full"
                    required
                  />
                  <select
                    name="gender"
                    value={editFormData.gender}
                    onChange={handleEditChange}
                    className="select select-bordered w-full"
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  <textarea
                    name="message"
                    placeholder="Testimonial Message"
                    value={editFormData.message}
                    onChange={handleEditChange}
                    className="textarea textarea-bordered w-full"
                    rows="3"
                    required
                  />
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="btn btn-ghost"
                    >
                      <FaTimes /> Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      <FaCheck /> Save
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  {/* Testimonial Content */}
                  <div className="flex flex-col items-center justify-center">
                    {testimonial.gender.toLowerCase() === "female" ? (
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjhPKN6RoQ0Aj4jNvz1FgHZIjNf6e7Jtb66K4g59fcpJayo84AGft3nftNvuonR4eZ35c&usqp=CAU"
                        alt="Female avatar"
                        className="w-24 mt-2 rounded-full"
                      />
                    ) : (
                      <img
                        src="https://img.freepik.com/premium-vector/man-traditional-muslim-clothing-arab-icon-islamic-person-avatar_53562-14231.jpg"
                        alt="Male avatar"
                        className="w-24 mt-2 rounded-full"
                      />
                    )}
                    <p className="text-gray-700 mb-4  mt-4">
                      "{testimonial.message}"
                    </p>
                    <div className="text-sm text-gray-600">
                      — <strong>{testimonial.name}</strong>,{" "}
                      {testimonial.address}
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllTestimonials;

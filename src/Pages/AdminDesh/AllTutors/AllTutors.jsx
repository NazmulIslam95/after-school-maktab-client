import DashboardBanner from "../../../Components/DashboardBanner/DashboardBanner";
import useAllTutors from "../../../CustomHooks/useAllTutors";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import {
  FaEdit,
  FaTrash,
  FaSearch,
  FaEnvelope,
  FaBriefcase,
  FaLink,
} from "react-icons/fa";
import { Trefoil } from "ldrs/react";

const AllTutors = () => {
  const { tutors, loading, refetch } = useAllTutors();
  const axiosSecure = useAxiosSecure();

  // Delete tutor handler
  const handleDeleteTutor = async (tutor) => {
    const confirm = await Swal.fire({
      title: `Delete ${tutor.name}?`,
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e3342f",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/tutors/delete/${tutor._id}`);
        if (res.data.success) {
          Swal.fire("Deleted!", "Tutor has been removed.", "success");
          refetch();
        }
      } catch (error) {
        Swal.fire("Error", error.message || "Server error occurred.", "error");
      }
    }
  };

  // Edit tutor handler
  const handleEditTutor = async (tutor) => {
    const { value: formValues } = await Swal.fire({
      title: `Edit Tutor ${tutor.name}`,
      html: `
        <div class="text-left">
          <div class="">
            <label class="block text-gray-700 ">Name</label>
            <input 
              id="name" 
              class="swal2-input w-full" 
              value="${tutor.name}" 
              required
            >
          </div>
          <div class="">
            <label class="block text-gray-700 ">Email</label>
            <input 
              id="email" 
              type="email" 
              class="swal2-input w-full" 
              value="${tutor.email}" 
              required
            >
          </div>
          <div class="">
            <label class="block text-gray-700 ">Education</label>
            <input 
              id="education" 
              class="swal2-input w-full" 
              value="${tutor.education}" 
              required
            >
          </div>
          <div class="">
            <label class="block text-gray-700 ">Experience</label>
            <input 
              id="experience" 
              class="swal2-input w-full" 
              value="${tutor.experience}" 
              required
            >
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 mb-2">Zoom Link</label>
            <input 
              id="zoomLink" 
              class="swal2-input w-full" 
              value="${tutor.zoomLink || ""}"
            >
          </div>
        </div>
      `,
      focusConfirm: false,
      preConfirm: () => {
        return {
          name: document.getElementById("name").value,
          email: document.getElementById("email").value,
          education: document.getElementById("education").value,
          experience: document.getElementById("experience").value,
          zoomLink: document.getElementById("zoomLink").value,
        };
      },
      showCancelButton: true,
      confirmButtonText: "Save Changes",
      confirmButtonColor: "#082f72",
    });

    if (formValues) {
      try {
        const res = await axiosSecure.patch(`/tutors/${tutor._id}`, formValues);
        if (res.data.success) {
          Swal.fire("Updated!", "Tutor details have been updated.", "success");
          refetch();
        }
      } catch (error) {
        Swal.fire("Error!", error.message || "Server error occurred.", "error");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-b from-gray-50 to-gray-200">
        <Trefoil
          size="120"
          stroke="4"
          strokeLength="0.2"
          bgOpacity="0.3"
          speed="1.2"
          color="#082f72"
        />
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <DashboardBanner
        title="All Tutors"
        subTitle="Manage all tutors in the system"
        className="bg-gradient-to-r from-[#082f72] to-[#1e5bb5] text-white rounded-xl shadow-lg"
      />

      {/* Tutors Cards Display */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {tutors.length > 0 ? (
          tutors.map((tutor) => (
            <div
              key={tutor._id}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-blue-100 hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48 bg-blue-50">
                <img
                  src={tutor.image}
                  alt={tutor.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-white font-bold text-lg">{tutor.name}</h3>
                  <p className="text-blue-200 text-sm">{tutor.education}</p>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <FaEnvelope className="text-blue-500" />
                  <span className="truncate text-sm">{tutor.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <FaBriefcase className="text-blue-500" />
                  <span className="text-sm">{tutor.experience} experience</span>
                </div>
                {tutor.zoomLink && (
                  <div className="flex items-center gap-2 text-gray-600 mb-4">
                    <FaLink className="text-blue-500" />
                    <a
                      href={tutor.zoomLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline truncate"
                    >
                      Zoom Link
                    </a>
                  </div>
                )}
                <div className="flex justify-between border-t pt-3">
                  <button
                    onClick={() => handleEditTutor(tutor)}
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
                  >
                    <FaEdit size={14} /> Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTutor(tutor)}
                    className="flex items-center gap-1 text-red-600 hover:text-red-800 text-sm"
                  >
                    <FaTrash size={14} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 bg-white rounded-xl shadow-sm">
            <div className="text-gray-500 mb-4">
              <FaSearch className="inline-block text-4xl opacity-50" />
            </div>
            <h3 className="text-lg font-medium text-gray-700">
              No tutors found
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllTutors;

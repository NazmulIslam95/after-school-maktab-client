import { useState } from "react";
import { FaEdit, FaTrash, FaEye, FaEyeSlash } from "react-icons/fa";
import DashboardBanner from "../../../Components/DashboardBanner/DashboardBanner";
import useAllCourses from "../../../CustomHooks/useAllCourses";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Courses = () => {
  const { allCourses, refetch } = useAllCourses();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [hiddenCourses, setHiddenCourses] = useState([]);

  const notifySuccess = () => toast.success("Featured status updated!");
  const notifyError = () => toast.error("Failed to update featured status");

  const toggleHide = (index) => {
    setHiddenCourses((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleToggleFeatured = (courseId, newStatus) => {
    axiosSecure
      .patch(`/courses/featured/${courseId}`, { featured: newStatus })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          // Optional: refetch or update UI
          notifySuccess();
          refetch();
        }
      })
      .catch((err) => {
        console.error("Toggle failed", err);
        notifyError();
      });
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
          const res = await axiosSecure.delete(`/courses/delete/${id}`);
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "The course has been deleted.", "success");
            refetch();
          } else {
            Swal.fire("Failed!", "Failed to delete the course.", "error");
          }
        } catch (error) {
          console.error(error);
          Swal.fire("Error!", "Something went wrong.", "error");
        }
      }
    });
  };

  return (
    <div>
      <DashboardBanner title="All Our Courses" subTitle="Courses" />
      <div className="overflow-x-auto p-4 ">
        <table className="min-w-full bg-white  rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 text-left text-sm text-gray-600 mozilla-headline-medium">
              <th className="pl-4">SN</th>
              <th className="p-3">Name</th>
              <th className="p-3">Type</th>
              <th className="p-3">Featured</th>
              <th className="p-3">Categories</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allCourses.map((course, index) => {
              const isHidden = hiddenCourses.includes(index);

              return (
                <tr
                  key={index}
                  className={` ${isHidden ? "opacity-40 bg-gray-50" : ""}`}
                >
                  <td className="pl-4 philosopher-regular">({index + 1})</td>
                  <td className="p-3 font-semibold hind-siliguri-semibold">{course.name.bn}</td>
                  <td className="p-3 capitalize philosopher-regular">{course.type}</td>
                  <td className="p-3">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={course.featured}
                        onChange={() =>
                          handleToggleFeatured(course._id, !course.featured)
                        }
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-checked:bg-green-500 rounded-full peer peer-focus:ring-2 peer-focus:ring-green-400 transition duration-300 relative">
                        <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition-transform"></span>
                      </div>
                    </label>
                  </td>
                  <td className="p-3 ">
                    <ul className="flex flex-wrap gap-1 text-xs">
                      {course.categories.map((cat, i) => (
                        <li
                          key={i}
                          className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full philosopher-regular"
                        >
                          {cat}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="p-3 text-center">
                    <div className="flex gap-2 justify-center text-lg text-gray-600">
                      <button
                        onClick={() =>
                          navigate(`/admin/editCourse/${course._id}`)
                        }
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(course._id)}
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                      <button
                        onClick={() => toggleHide(index)}
                        title={isHidden ? "Show" : "Hide"}
                      >
                        {isHidden ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Courses;

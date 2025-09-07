import { useState } from "react";
import DashboardBanner from "../../../Components/DashboardBanner/DashboardBanner";
import useRecentStudents from "../../../CustomHooks/useRecentStudents";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import Swal from "sweetalert2";

const AllRecentStudents = () => {
  const axiosSecure = useAxiosSecure();
  const { recentStudents, refetch } = useRecentStudents();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = (student) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete ${student.name}. This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsDeleting(true);
        try {
          const res = await axiosSecure.delete(
            `/recentStudents/delete/${student._id}`
          );
          console.log(res);
          if (res.data.success === true) {
            Swal.fire(
              "Deleted!",
              `${student.name} has been deleted.`,
              "success"
            );
            refetch(); // Refresh the student list
          }
        } catch (error) {
          console.error("Error deleting student:", error);
          Swal.fire(
            "Error!",
            "There was a problem deleting the student.",
            "error"
          );
        } finally {
          setIsDeleting(false);
        }
      }
    });
  };

  return (
    <div>
      <DashboardBanner title="All Recent Students" subTitle="Recent Students" />
      <div className="md:flex md:flex-wrap md:justify-center mt-6 gap-4">
        {recentStudents.map((student) => (
          <div
            key={student._id}
            className="md:w-50 bg-white flex flex-col items-center mx-3 p-4 rounded-lg shadow-lg relative"
          >
            {/* Delete button */}
            <button
              onClick={() => handleDelete(student)}
              disabled={isDeleting}
              className="absolute top-2 right-2 p-1 bg-red-100 rounded-full hover:bg-red-200 transition-colors"
              aria-label="Delete student"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>

            <img
              src={
                student.image ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjhPKN6RoQ0Aj4jNvz1FgHZIjNf6e7Jtb66K4g59fcpJayo84AGft3nftNvuonR4eZ35c&usqp=CAU"
              }
              alt={student.name}
              className="w-20 h-20 rounded-full mb-3 object-cover"
              loading="lazy"
            />
            <h3 className="text-lg font-semibold text-center">
              {student.name}
            </h3>
            <p className="text-sm text-gray-500 text-center">
              {student.address}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllRecentStudents;

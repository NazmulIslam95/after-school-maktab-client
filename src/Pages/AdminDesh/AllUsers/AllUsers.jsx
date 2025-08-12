import { FaChalkboardTeacher, FaTrashAlt } from "react-icons/fa";
import DashboardBanner from "../../../Components/DashboardBanner/DashboardBanner";
import useAllUsers from "../../../CustomHooks/useAllUsers";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import Swal from "sweetalert2";

const AllUsers = () => {
  const { users, loading, refetch } = useAllUsers();
  const axiosSecure = useAxiosSecure(); // ✅ use secure axios instance with token

  const handleChangeRole = async (userId, newRole) => {
    const confirmResult = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to change the role to "${newRole}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change it!",
    });

    if (confirmResult.isConfirmed) {
      try {
        const res = await axiosSecure.patch(`/users/role/${userId}`, {
          role: newRole,
        });
        if (res.data.success) {
          Swal.fire(
            "Updated!",
            `User role changed to "${newRole}".`,
            "success"
          );
          refetch();
        } else {
          Swal.fire(
            "Failed!",
            res.data.message || "Role update failed.",
            "error"
          );
        }
      } catch (err) {
        Swal.fire("Error!", err.message || "Server error occurred.", "error");
        console.error("Error updating role:", err);
      }
    }
  };

  const handleDeleteUser = async (user) => {
    const confirm = await Swal.fire({
      title: `Delete ${user.name}?`,
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e3342f",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/users/delete/${user._id}`);
        if (res.data.success) {
          Swal.fire("Deleted!", "User has been removed.", "success");
          refetch();
        } else {
          Swal.fire(
            "Failed",
            res.data.message || "Unable to delete user.",
            "error"
          );
        }
      } catch (error) {
        Swal.fire("Error", error.message || "Server error occurred.", "error");
        console.error("Delete user error:", error);
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <DashboardBanner title="All Users" subTitle="Users" />
      <div className="overflow-x-auto libertinus-sans-regular">
        <table className="min-w-5xl mx-auto bg-white rounded-t-xl shadow-md ">
          <thead className="bg-gradient-to-r from-blue-700 to-blue-500 text-white">
            <tr className="text-left text-sm font-semibold rounded-t-xl">
              <th className="pl-4 rounded-tl-xl">SN</th>
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Phone</th>
              <th className="p-2">Role</th>
              <th className="p-2 text-center rounded-tr-xl">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user._id}
                className="border-b border-blue-100 hover:bg-blue-50 transition-all duration-300 ease-in-out transform "
              >
                <td className="pl-4 text-gray-600">{index + 1}</td>
                <td className="p-2 font-medium flex items-center gap-3 text-gray-700">
                  {user.name}
                  {user.role === "admin" && (
                    <MdOutlineAdminPanelSettings className="text-blue-700 text-2xl" />
                  )}
                  {user.role === "tutor" && (
                    // <MdOutlineAdminPanelSettings className="text-blue-700 text-2xl animate-pulse" />
                    <FaChalkboardTeacher className="text-blue-700 text-2xl " />
                  )}
                </td>
                <td className="p-2 text-gray-500">{user.email}</td>
                <td className="p-2 text-gray-500">{user.PhoneNo}</td>
                <td className="p-2">
                  <select
                    value={user.role}
                    onChange={(e) => handleChangeRole(user._id, e.target.value)}
                    className="border border-blue-200 px-4 rounded-md bg-white text-gray-600 focus:ring-2 focus:ring-blue-300 focus:outline-none transition-all duration-200 hover:bg-blue-50"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="tutor">Tutor</option>
                  </select>
                </td>
                <td className="p-2 text-center">
                  <div className="flex gap-4 justify-center text-lg">
                    <button
                      onClick={() => handleDeleteUser(user)}
                      title="Delete User"
                      disabled={user.role === "admin" || user.role === "tutor"}
                      className={`${
                        user.role === "admin" || user.role === "tutor"
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-red-400 hover:text-red-600 transform hover:scale-125 transition-all duration-200"
                      }`}
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;

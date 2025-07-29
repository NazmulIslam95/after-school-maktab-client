import { FaUserShield, FaTrashAlt, FaUserAlt } from "react-icons/fa";
import DashboardBanner from "../../../Components/DashboardBanner/DashboardBanner";
import useAllUsers from "../../../CustomHooks/useAllUsers";
import {
  MdAdminPanelSettings,
  MdOutlineAdminPanelSettings,
} from "react-icons/md";

const AllUsers = () => {
  const { users, loading, refetch } = useAllUsers();
  const handleMakeAdmin = (user) => {
    console.log("Make admin:", user);
    // send PATCH or PUT to backend
  };

  const handleDeleteUser = (user) => {
    console.log("Delete user:", user);
    // send DELETE to backend
    refetch();
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <DashboardBanner title="All Users" subTitle="users" />
      <div className="overflow-x-auto p-4">
        <h2 className="text-2xl font-bold mb-4">All Users</h2>
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead className="rounded-lg">
            <tr className="bg-gray-300 text-left text-sm rounded-lg text-black">
              <th className="p-3">SN</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Role</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="border-t">
                <td className="p-3">{index + 1}</td>
                <td className="p-3 font-medium flex items-center gap-1">
                  {user.name}
                  {user.role === "admin" && (
                    <MdOutlineAdminPanelSettings className="text-green-500" />
                  )}
                </td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.PhoneNo}</td>
                <td className="p-3 capitalize">
                  {user.role === "admin" ? (
                    <button
                      className=" p-1 rounded text-white bg-green-600"
                      disabled={user.role === "user"}
                    >
                      <MdAdminPanelSettings />
                    </button>
                  ) : (
                    <button
                      className="p-1 rounded text-white bg-green-500 hover:bg-green-600"
                      onClick={() => handleMakeAdmin(user)}
                    >
                      <FaUserAlt />
                    </button>
                  )}
                </td>
                <td className="p-3 text-center">
                  <div className="flex gap-3 justify-center text-lg text-gray-700">
                    <button
                      onClick={() => handleDeleteUser(user)}
                      title="Delete User"
                      className="hover:text-red-600"
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

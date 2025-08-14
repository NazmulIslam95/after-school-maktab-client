import { Trefoil } from "ldrs/react";
import DashboardBanner from "../../../Components/DashboardBanner/DashboardBanner";
import useCurrentUser from "../../../CustomHooks/useCurrentUser";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaLink,
  FaPhone,
  FaRegCopy,
  FaUserPlus,
  FaWhatsapp,
} from "react-icons/fa";
import { CiLocationOn, CiUser } from "react-icons/ci";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";

const MyProfile = () => {
  const { currentUser, loading, refetch } = useCurrentUser();
  const axiosSecure = useAxiosSecure();
  const [copied, setCopied] = useState(false);
  const [groupIdCopied, setGroupIdCopied] = useState(false);
  const [joinCode, setJoinCode] = useState("");
  const [isJoining, setIsJoining] = useState(false);

  // 1. Handle Family Group Creation
  const handleCreateFamilyGroup = async () => {
    try {
      const response = await axiosSecure.post("/family/createGroup", {
        userId: currentUser._id,
      });
      if (response.data.success) {
        refetch();
        Swal.fire({
          icon: "success",
          title: "Family Group Created!",
          html: `Your Group ID: <strong>${response.data.groupId}</strong><br>Share this with your sibling.`,
          confirmButtonColor: "#082f72",
        });
        refetch();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: error.response?.data?.message || "Error creating group",
      });
    }
  };

  // 2. Handle Joining Family Group
  const handleJoinFamilyGroup = async () => {
    if (!joinCode.trim()) {
      Swal.fire("Error", "Please enter a group ID", "error");
      return;
    }

    setIsJoining(true);
    try {
      const response = await axiosSecure.post("/family/joinGroup", {
        groupId: joinCode,
        userId: currentUser._id, // এখানে ইউজারের আইডি পাঠাচ্ছি
      });

      if (response.data.success) {
        await refetch();
        Swal.fire(
          "Success!",
          "Your join request has been sent to the group admin",
          "success"
        );
        setJoinCode("");
      }
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message || "Invalid group ID",
        "error"
      );
    } finally {
      setIsJoining(false);
    }
  };

  // Approve a join request
  const handleApproveRequest = async (userId) => {
    try {
      const response = await axiosSecure.post("/family/approveRequest", {
        userId,
        groupId: currentUser.familyGroup.groupId,
      });

      if (response.data.success) {
        Swal.fire(
          "Success!",
          "User has been added to your family group",
          "success"
        );
        refetch();
      }
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message || "Failed to approve request",
        "error"
      );
    }
  };

  // Reject a join request
  const handleRejectRequest = async (userIdToReject) => {
    try {
      const response = await axiosSecure.post("/family/rejectRequest", {
        userIdToReject,
        groupId: currentUser.familyGroup.groupId,
      });

      if (response.data.success) {
        Swal.fire("Rejected", "User's join request has been rejected", "info");
        refetch();
      }
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message || "Failed to reject request",
        "error"
      );
    }
  };

  const handleCopy = () => {
    if (currentUser?.referralCode) {
      navigator.clipboard.writeText(currentUser.referralCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Hide after 2s
    }
  };

  const handleGroupIdCopy = () => {
    if (currentUser?.familyGroup?.groupId) {
      navigator.clipboard.writeText(currentUser.familyGroup.groupId);
      setGroupIdCopied(true);
      setTimeout(() => setGroupIdCopied(false), 2000); // Hide after 2s
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Trefoil
          size="200"
          stroke="2"
          strokeLength="0.15"
          bgOpacity="0.1"
          speed="1.4"
          color="#082f72"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <DashboardBanner title="My Profile" subTitle="Profile" />

      {currentUser ? (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-blue-100"
              >
                <div className="bg-[#082f72] p-5 text-center">
                  <div className="relative mx-auto w-24 h-24 rounded-full border-2 border-white shadow-md overflow-hidden">
                    <img
                      src={
                        currentUser.image ||
                        "https://www.alaska.edu/_resources/images/placeholders/profile.png"
                      }
                      alt={currentUser.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h2 className="mt-3 text-xl font-bold text-white">
                    {currentUser.name}
                  </h2>
                  <p className="text-blue-200 text-sm capitalize">
                    {currentUser.role}
                  </p>
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-500 text-sm">Status</span>
                    <span className="px-4 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      Active
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="p-1.5 rounded-full bg-blue-50 text-[#082f72] mr-2 text-sm">
                        <FaEnvelope />
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Email</p>
                        <p className="font-medium text-sm">
                          {currentUser.email}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="p-1.5 rounded-full bg-blue-50 text-[#082f72] mr-2 text-sm">
                        <FaPhone />
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Phone</p>
                        <p className="font-medium text-sm">
                          {currentUser.PhoneNo}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="p-1.5 rounded-full bg-blue-50 text-[#082f72] mr-2 text-sm">
                        <FaWhatsapp />
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">WhatsApp</p>
                        <p className="font-medium text-sm">
                          {currentUser.whatsappNumber || "N/A"}
                        </p>
                      </div>
                    </div>

                    {(currentUser.role !== "admin" ||
                      currentUser.role !== "tutor") && (
                      <div className="flex items-center">
                        <div className="p-1.5 rounded-full bg-blue-50 text-[#082f72] mr-2 text-sm">
                          <FaLink />
                        </div>
                        <div>
                          <p className="text-gray-500 text-sm">
                            My Referral Code
                          </p>
                          <div className="flex items-center space-x-1">
                            <span className="font-medium text-sm">
                              {currentUser?.referralCode || "N/A"}
                            </span>
                            <FaRegCopy
                              onClick={handleCopy}
                              className="cursor-pointer text-gray-500 hover:text-blue-600 transition"
                              title="Copy to clipboard"
                            />
                            {copied && (
                              <span className="text-xs text-green-500">
                                Copied!
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Details Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Info */}
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="bg-[#082f72] p-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <CiUser className="text-lg" />
                    <span>Personal Information</span>
                  </h3>
                </div>

                <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: "Father's Name", value: currentUser.fatherName },
                    { label: "Age", value: currentUser.age },
                    { label: "Gender", value: currentUser.gender },
                    { label: "Nationality", value: currentUser.nationality },
                  ].map((item, index) => (
                    <div key={index} className="space-y-1">
                      <p className="text-gray-500 text-sm">{item.label}</p>
                      <p className="font-medium text-sm text-gray-800">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Address Section */}
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="bg-[#082f72] p-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <CiLocationOn className="text-lg" />
                    <span>Address Information</span>
                  </h3>
                </div>

                <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      label: "Present Address",
                      value: currentUser.presentAddress,
                    },
                    {
                      label: "Permanent Address",
                      value: currentUser.permanentAddress,
                    },
                  ].map((item, index) => (
                    <div key={index} className="space-y-1">
                      <p className="text-gray-500 text-sm">{item.label}</p>
                      <p className="font-medium text-sm text-gray-800">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Family Group Section */}
              {currentUser.role === "user" ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden border border-purple-100"
                >
                  <div className="bg-[#082f72] p-4">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <FaUserPlus />
                      <span>Family Group</span>
                    </h3>
                  </div>

                  <div className="p-4 space-y-4">
                    {currentUser?.familyGroup ? (
                      <>
                        <div className="bg-purple-50 p-3 rounded-lg">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-xs text-gray-500">Group ID</p>
                              <p className="font-medium text-black">
                                {currentUser.familyGroup.groupId}
                              </p>
                            </div>
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${
                                currentUser.familyGroup.status === "approved"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {currentUser.familyGroup.status}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={handleGroupIdCopy}
                          className="w-full bg-gray-100 text-gray-800 py-2 rounded-lg text-sm flex items-center justify-center gap-2"
                        >
                          <FaRegCopy /> Copy Group ID
                          {groupIdCopied && (
                            <span className="text-xs text-green-500 ml-1">
                              Copied!
                            </span>
                          )}
                        </button>
                        <h1>{currentUser.familyGroup.members.length}</h1>
                        <h1>
                          {currentUser.familyGroup.members.map((member) => (
                            <h1>{member.name || "null"}</h1>
                          ))}
                        </h1>
                        {/* Pending Join Requests for Owner */}
                        {currentUser.familyGroup.members.includes(
                          currentUser._id
                        ) &&
                          currentUser.familyGroup.requests?.length > 0 && (
                            <div className="mt-4 bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                              <p className="font-medium text-gray-700 mb-2">
                                Pending Join Requests
                              </p>
                              {currentUser.familyGroup.requests.map((req) => (
                                <div
                                  key={req.userId}
                                  className="flex justify-between items-center py-2 border-b border-yellow-200"
                                >
                                  <div>
                                    <p className="text-sm font-medium text-gray-800">
                                      {req.name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      Email: {req.email} | Father:{" "}
                                      {req.fatherName}
                                    </p>
                                    <p className="text-xs text-gray-400">
                                      Requested at:{" "}
                                      {new Date(
                                        req.requestedAt
                                      ).toLocaleString()}
                                    </p>
                                  </div>
                                  <div className="flex space-x-2">
                                    <button
                                      onClick={() =>
                                        handleApproveRequest(req.userId)
                                      }
                                      className="px-2 py-1 bg-green-600 text-white rounded text-xs"
                                    >
                                      Approve
                                    </button>
                                    <button
                                      onClick={() =>
                                        handleRejectRequest(req.userId)
                                      }
                                      className="px-2 py-1 bg-red-600 text-white rounded text-xs"
                                    >
                                      Reject
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                      </>
                    ) : (
                      <>
                        <div className="space-y-3">
                          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                            <p className="text-sm font-medium text-gray-700 mb-2">
                              Create New Family Group
                            </p>
                            <button
                              onClick={handleCreateFamilyGroup}
                              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg text-sm font-medium"
                            >
                              Create Group
                            </button>
                          </div>

                          <div className="relative flex items-center py-2">
                            <div className="flex-grow border-t border-gray-200"></div>
                            <span className="flex-shrink mx-2 text-gray-400 text-sm">
                              OR
                            </span>
                            <div className="flex-grow border-t border-gray-200"></div>
                          </div>

                          <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                            <p className="text-sm font-medium text-gray-700 mb-2">
                              Join Existing Group
                            </p>
                            <input
                              type="text"
                              value={joinCode}
                              onChange={(e) => setJoinCode(e.target.value)}
                              placeholder="Enter Family Group ID"
                              className="w-full px-3 py-2 border border-gray-200 rounded-lg mb-2 text-sm"
                            />
                            <button
                              onClick={handleJoinFamilyGroup}
                              disabled={isJoining}
                              className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-2 rounded-lg text-sm font-medium disabled:opacity-50"
                            >
                              {isJoining ? "Joining..." : "Join Group"}
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </motion.div>
              ) : (
                <></>
              )}
            </div>
          </motion.div>
        </div>
      ) : (
        <div className="text-center text-gray-600 py-16">
          No user data available
        </div>
      )}
    </div>
  );
};

export default MyProfile;

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
  FaWhatsapp,
} from "react-icons/fa";
import { CiLocationOn, CiUser } from "react-icons/ci";
import { useState } from "react";

const MyProfile = () => {
  const { currentUser, loading } = useCurrentUser();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (currentUser?.referralCode) {
      navigator.clipboard.writeText(currentUser.referralCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Hide after 2s
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

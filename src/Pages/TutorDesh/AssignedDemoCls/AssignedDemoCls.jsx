import { useContext, useEffect, useState } from "react";
import DashboardBanner from "../../../Components/DashboardBanner/DashboardBanner";
import { AuthContext } from "../../../Providers/AuthProvider";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import useAllTutors from "../../../CustomHooks/useAllTutors";

const AssignedDemoCls = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [demoClasses, setDemoClasses] = useState([]);
  const [zoomLink, setZoomLink] = useState("");
  const [loading, setLoading] = useState(true);
  const { tutors } = useAllTutors();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user?.email) return;

        // 1. Fetch assigned courses
        const res1 = await axiosSecure.get(
          `/assignedDemoClasses?tutorEmail=${user.email}`
        );
        setDemoClasses(res1.data);

        // 2. Get Zoom link from tutor info
        const meAsTutor = tutors.find((tutor) => tutor.email === user.email);
        setZoomLink(meAsTutor?.zoomLink || "");

        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch assigned courses or tutor info", err);
        setLoading(false);
      }
    };

    fetchData();
  }, [user, axiosSecure, tutors]);

  return (
    <div className="space-y-6">
      <DashboardBanner title="Assigned Demo Classes" subTitle="Demo Classes" />

      {!loading && demoClasses.length === 0 && (
        <p className="text-center text-gray-500">No assigned demo classes.</p>
      )}

      {!loading && demoClasses.length > 0 && (
        <div className="grid gap-4 md:grid-cols-3">
          {demoClasses.map((demo) => (
            <div
              key={demo._id}
              className="relative bg-white rounded-2xl shadow-lg p-6 border border-blue-100 hover:shadow-xl transform  transition-all duration-300 hover:bg-blue-50 philosopher-bold"
            >
              <div className=" text-center">
                <h3 className="text-xl font-bold text-blue-900 mb-3 font-cute flex items-center justify-center gap-2 hind-siliguri-bold">
                  {demo.courseName}
                </h3>
                <div className="text-sm text-gray-600 mb-4">
                  <p className="flex items-center justify-center gap-2">
                    <span className="text-blue-700 font-semibold">
                      🕒 Date & Time:
                    </span>
                    {new Date(demo.demoDateTime).toLocaleString("en-BD", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                </div>
                <hr className="my-4 border-blue-100" />
                <div className="text-sm text-gray-600 space-y-2">
                  <p className="flex items-center gap-2">
                    <span className="text-blue-700 font-semibold">
                      👤 Student:
                    </span>{" "}
                    {demo.name}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-blue-700 font-semibold">
                      📧 Email:
                    </span>{" "}
                    {demo.email}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-blue-700 font-semibold">
                      📱 WhatsApp:
                    </span>{" "}
                    {demo.whatsapp}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-blue-700 font-semibold">
                      🎂 Age | Gender:
                    </span>{" "}
                    {demo.age} | {demo.gender}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-blue-700 font-semibold">
                      🏠 Address:
                    </span>{" "}
                    {demo.presentAddress}
                  </p>
                </div>
                <a
                  href={zoomLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-6 px-6 py-2 text-sm text-white bg-blue-700 hover:bg-blue-900 rounded-full transform hover:scale-105 transition-all duration-200 font-semibold"
                >
                  Join Class
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AssignedDemoCls;

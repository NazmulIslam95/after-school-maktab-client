import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import DashboardBanner from "../../../Components/DashboardBanner/DashboardBanner";


const MyCourses = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: purchases = [], isLoading } = useQuery({
    queryKey: ["purchases", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/myPurchases?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) {
    return <div className="text-center py-10">Loading your courses...</div>;
  }

  return (
    <div className="px-4">
      <DashboardBanner
        title="My Courses"
        subTitle="My Courses"
      />

      {purchases.length === 0 ? (
        <div className="text-center mt-10 text-gray-600 text-lg">
          You haven't purchased any course yet.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {purchases.map((course) => (
            <div
              key={course._id}
              className="border rounded-xl shadow-md p-4 bg-white"
            >
              <h2 className="text-xl font-bold mb-2">{course.courseName}</h2>
              <p>
                <span className="font-medium">Type:</span> {course.type}
              </p>
              <p>
                <span className="font-medium">Duration:</span> {course.duration}
              </p>
              <p>
                <span className="font-medium">Days:</span> {course.days}
              </p>
              <p>
                <span className="font-medium">Price:</span> ৳{course.price}
              </p>
              <p>
                <span className="font-medium">Payment:</span>{" "}
                {course.paymentMethod}
              </p>
              <p>
                <span className="font-medium">Transaction ID:</span>{" "}
                {course.transactionId}
              </p>

              {course.confirmed ? (
                <span className="mt-3 inline-block px-3 py-1 bg-green-100 text-green-700 rounded font-medium">
                  Confirmed
                </span>
              ) : course.denied ? (
                <span className="mt-3 inline-block px-3 py-1 bg-red-100 text-red-700 rounded font-medium">
                  Denied
                </span>
              ) : (
                <span className="mt-3 inline-block px-3 py-1 bg-yellow-100 text-yellow-700 rounded font-medium">
                  Pending
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCourses;

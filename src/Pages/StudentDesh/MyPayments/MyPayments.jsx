import { useEffect, useState } from "react";
import DashboardBanner from "../../../Components/DashboardBanner/DashboardBanner";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import useStudentPurchases from "../../../CustomHooks/useStudentPurchases";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import useAuth from "../../../CustomHooks/useAuth";

const MyPayments = () => {
  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    purchases,
    loading: purchasesLoading,
    // refetch: refetchPurchases,
  } = useStudentPurchases();
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    courseId: "",
    month: "",
    year: new Date().getFullYear().toString(),
    transactionId: "",
    paymentMethod: "",
    senderInfo: "",
    amount: "",
  });

  // Payment method details
  const paymentMethods = {
    bKash: {
      name: "bKash",
      number: "01787110752",
      type: "Personal",
      instructions:
        "Send money to this number and include your student ID in the reference.",
    },
    Nagad: {
      name: "Nagad",
      number: "01787110752",
      type: "Personal",
      instructions:
        "Send money to this number and include your student ID in the reference.",
    },
    Rocket: {
      name: "Rocket",
      number: "01787110752",
      type: "Personal",
      instructions:
        "Send money to this number and include your student ID in the reference.",
    },
    Bank: {
      name: "Bank Transfer",
      accountName: "MD Eyasin Arafat",
      accountNumber: "20502036700174016",
      bankName: "IBBL",
      branch: "Cantonment Branch Dhaka",
      routingNumber: "125260738",
      swiftCode: "IBBLBDDH",
      instructions: "Include your student ID in the transfer reference.",
    },
  };

  // Fetch student's payment history
  useEffect(() => {
    if (user) {
      const fetchPayments = async () => {
        try {
          setIsLoading(true);
          const response = await axiosSecure.get(
            `/payments/student/${user.email}`
          );
          setPayments(response.data);
        } catch (error) {
          console.error("Error fetching payments:", error);
          if (
            error.response?.status === 401 ||
            error.response?.status === 403
          ) {
            toast.error(
              "Unauthorized access to payment history. Please log in again."
            );
          } else {
            toast.error("Failed to fetch payment history.");
          }
          setPayments([]);
        } finally {
          setIsLoading(false);
        }
      };
      fetchPayments();
    }
  }, [user, axiosSecure]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updatedFormData = { ...prev, [name]: value };

      // If course is selected, auto-fill the amount
      if (name === "courseId" && value) {
        const selectedCourse = purchases.find((p) => p._id === value);
        if (selectedCourse) {
          updatedFormData.amount = selectedCourse.price || "";
        }
      }

      return updatedFormData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.courseId ||
      !formData.month ||
      !formData.year ||
      !formData.paymentMethod ||
      !formData.senderInfo ||
      !formData.amount
    ) {
      Swal.fire({
        icon: "error",
        title: "Incomplete Form",
        text: "Please fill in all required fields.",
        confirmButtonColor: "#082f72",
      });
      return;
    }
    try {
      const response = await axiosSecure.post("/payments/submit", {
        ...formData,
        courseName:
          purchases.find((p) => p._id === formData.courseId)?.courseName || "",
      });
      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Payment Submitted",
          text: "Your payment details have been submitted for verification.",
          confirmButtonColor: "#082f72",
        });
        setPayments((prev) => [
          {
            ...formData,
            _id: response.data.insertedId,
            studentEmail: user.email,
            studentName: user.displayName,
            status: "submitted",
            createdAt: new Date(),
            courseName:
              purchases.find((p) => p._id === formData.courseId)?.courseName ||
              "",
          },
          ...prev,
        ]);
        setFormData({
          courseId: "",
          month: "",
          year: new Date().getFullYear().toString(),
          transactionId: "",
          paymentMethod: "",
          senderInfo: "",
          amount: "",
        });
      }
    } catch (error) {
      console.error("Error submitting payment:", error);
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "Failed to submit payment details.",
        confirmButtonColor: "#082f72",
      });
    }
  };

  if (authLoading || purchasesLoading || isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-2xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardBanner
        title="My Payments"
        subTitle="Manage Your Payments"
        className="bg-gradient-to-r from-[#082f72] to-purple-600 text-white rounded-xl shadow-lg"
      />
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-[#082f72] mb-6">New Payment</h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-2xl shadow-lg mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 font-semibold text-[#082f72]">
                Course
              </label>
              <select
                name="courseId"
                value={formData.courseId}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#082f72]"
                required
              >
                <option value="">Select Course</option>
                {purchases.map((purchase) => (
                  <option key={purchase._id} value={purchase._id}>
                    {purchase.courseName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1 font-semibold text-[#082f72]">
                Month
              </label>
              <select
                name="month"
                value={formData.month}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#082f72]"
                required
              >
                <option value="">Select Month</option>
                {[
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ].map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1 font-semibold text-[#082f72]">
                Year
              </label>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#082f72]"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold text-[#082f72]">
                Amount ($)
              </label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#082f72] bg-gray-100"
                required
                readOnly
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold text-[#082f72]">
                Payment Method
              </label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#082f72]"
                required
              >
                <option value="">Select Method</option>
                <option value="bKash">Bkash</option>
                <option value="Nagad">Nagad</option>
                <option value="Rocket">Rocket</option>
                <option value="Bank">Bank Transfer</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 font-semibold text-[#082f72]">
                Transaction ID
              </label>
              <input
                type="text"
                name="transactionId"
                value={formData.transactionId}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#082f72]"
                placeholder="Enter transaction ID"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block mb-1 font-semibold text-[#082f72]">
                Sender Info (Mobile/Bank Account)
              </label>
              <input
                type="text"
                name="senderInfo"
                value={formData.senderInfo}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#082f72]"
                required
                placeholder="Your mobile number or account number"
              />
            </div>

            {/* Payment Method Details */}
            {formData.paymentMethod && (
              <div className="md:col-span-2 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-800 mb-2">
                  {paymentMethods[formData.paymentMethod].name} Payment Details:
                </h3>

                {formData.paymentMethod !== "Bank" ? (
                  <div className="text-sm text-gray-700">
                    <p className="mb-1">
                      <span className="font-medium">Number: </span>
                      {paymentMethods[formData.paymentMethod].number}
                    </p>
                    <p className="mb-1">
                      <span className="font-medium">Type: </span>
                      {paymentMethods[formData.paymentMethod].type}
                    </p>
                    <p className="mb-1 text-blue-600">
                      <span className="font-medium">Instructions: </span>
                      {paymentMethods[formData.paymentMethod].instructions}
                    </p>
                  </div>
                ) : (
                  <div className="text-sm text-gray-700">
                    <p className="mb-1">
                      <span className="font-medium">Account Name: </span>
                      {paymentMethods[formData.paymentMethod].accountName}
                    </p>
                    <p className="mb-1">
                      <span className="font-medium">Bank Name: </span>
                      {paymentMethods[formData.paymentMethod].bankName}
                    </p>
                    <p className="mb-1">
                      <span className="font-medium">Branch: </span>
                      {paymentMethods[formData.paymentMethod].branch}
                    </p>
                    <p className="mb-1">
                      <span className="font-medium">Account Number: </span>
                      {paymentMethods[formData.paymentMethod].accountNumber}
                    </p>
                    <p className="mb-1">
                      <span className="font-medium">Routing Number: </span>
                      {paymentMethods[formData.paymentMethod].routingNumber}
                    </p>
                    <p className="mb-1">
                      <span className="font-medium">SWIFT Code: </span>
                      {paymentMethods[formData.paymentMethod].swiftCode}
                    </p>
                    <p className="mb-1 text-blue-600">
                      <span className="font-medium">Instructions: </span>
                      {paymentMethods[formData.paymentMethod].instructions}
                    </p>
                  </div>
                )}
              </div>
            )}

            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full px-4 py-2 bg-[#082f72] text-white text-sm font-medium rounded-lg hover:bg-white hover:text-[#082f72] hover:border-[#082f72] border transition shadow-sm"
              >
                Submit Payment
              </button>
            </div>
          </div>
        </form>

        <h2 className="text-2xl font-bold text-[#082f72] mb-6">
          Payment History
        </h2>
        {payments.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">
            No payments found.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {payments.map((payment) => (
              <div
                key={payment._id}
                className={`bg-white p-6 rounded-2xl shadow-lg ${
                  payment.status === "pending"
                    ? "border-4 border-yellow-400 bg-yellow-50"
                    : payment.status === "submitted"
                      ? "border-4 border-blue-400 bg-blue-50"
                      : payment.status === "paid"
                        ? "bg-green-50"
                        : "bg-red-50"
                } hover:shadow-xl transition-all duration-300`}
              >
                <h3 className="font-bold text-xl text-gray-900 mb-3">
                  {payment.courseName}
                </h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>
                    <span className="font-semibold text-[#082f72]">Month:</span>{" "}
                    {payment.month} {payment.year}
                  </p>
                  <p>
                    <span className="font-semibold text-[#082f72]">
                      Amount:
                    </span>{" "}
                    <span className="text-green-600 font-bold">
                      ${payment.amount}
                    </span>
                  </p>
                  <p>
                    <span className="font-semibold text-[#082f72]">
                      Payment Method:
                    </span>{" "}
                    {payment.paymentMethod || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold text-[#082f72]">
                      Transaction ID:
                    </span>{" "}
                    {payment.transactionId || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold text-[#082f72]">
                      Sender Info:
                    </span>{" "}
                    {payment.senderInfo || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold text-[#082f72]">
                      Payment Date:
                    </span>{" "}
                    {payment.createdAt
                      ? new Date(payment.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                          }
                        )
                      : "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold text-[#082f72]">
                      Confirm Date:
                    </span>{" "}
                    {payment.updatedAt
                      ? new Date(payment.updatedAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                          }
                        )
                      : "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold text-[#082f72]">
                      Status:
                    </span>{" "}
                    <span
                      className={
                        payment.status === "pending"
                          ? "text-yellow-600 font-semibold"
                          : payment.status === "submitted"
                            ? "text-blue-600 font-semibold"
                            : payment.status === "paid"
                              ? "text-green-600 font-semibold"
                              : "text-red-600 font-semibold"
                      }
                    >
                      {payment.status.charAt(0).toUpperCase() +
                        payment.status.slice(1)}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPayments;

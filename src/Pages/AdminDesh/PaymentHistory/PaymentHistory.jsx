import { useState } from "react";
import DashboardBanner from "../../../Components/DashboardBanner/DashboardBanner";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import usePaymentHistory from "../../../CustomHooks/usePaymentHistory";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { payments, loading, refetch } = usePaymentHistory();
  const [filter, setFilter] = useState("all");

  const handleConfirmPayment = async (id) => {
    Swal.fire({
      title: "Confirm Payment?",
      text: "This will mark the payment as paid.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, confirm",
      confirmButtonColor: "#082f72",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(`/payments/confirm/${id}`);
          if (res.data.success) {
            toast.success("Payment confirmed successfully");
            refetch();
          } else {
            toast.error("Failed to confirm payment");
          }
        } catch (error) {
          console.error("Error confirming payment:", error);
          toast.error("Something went wrong");
        }
      }
    });
  };

  const handleMarkDenied = async (id) => {
    Swal.fire({
      title: "Mark Payment as Denied?",
      text: "This will mark the payment as Denied.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, mark Denied",
      confirmButtonColor: "#082f72",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(`/payments/denied/${id}`);
          if (res.data.success) {
            toast.success("Payment marked as denied");
            refetch();
          } else {
            toast.error("Failed to mark payment denied");
          }
        } catch (error) {
          console.error("Error marking payment denied:", error);
          toast.error("Something went wrong");
        }
      }
    });
  };

  // Filter payments based on selected filter
  const filteredPayments = payments.filter((payment) => {
    if (filter === "all") return true;
    return payment.status === filter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardBanner
        title="Payment History"
        subTitle="Monthly Payments"
        className="bg-gradient-to-r from-[#082f72] to-purple-600 text-white rounded-xl shadow-lg"
      />

      {loading ? (
        <div className="text-center py-12 font-semibold text-gray-600">
          Loading...
        </div>
      ) : (
        <>
          <div className="max-w-6xl mx-auto mt-6 flex justify-end">
            <div className="relative inline-block text-left">
              <label className="font-semibold text-[#082f72] mr-2">
                Filter:
              </label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#082f72] bg-white shadow-sm"
              >
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="submitted">Submitted</option>
                <option value="paid">Paid</option>
                <option value="denied">Denied</option>
              </select>
            </div>
          </div>
          <div className="max-w-6xl mx-auto my-8">
            {filteredPayments.length === 0 ? (
              <div className="text-center text-gray-500 text-lg">
                No payments found for this filter.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPayments.map((payment) => (
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
                      {payment.studentName}
                    </h3>
                    <div className="space-y-2 text-sm text-gray-700">
                      <p>
                        <span className="font-semibold text-[#082f72]">
                          Email:
                        </span>{" "}
                        {payment.studentEmail}
                      </p>
                      <p>
                        <span className="font-semibold text-[#082f72]">
                          Course:
                        </span>{" "}
                        {payment.courseName}
                      </p>
                      <p>
                        <span className="font-semibold text-[#082f72]">
                          Month:
                        </span>{" "}
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
                    {payment.status === "submitted" && (
                      <div className="mt-4 flex gap-3">
                        <button
                          onClick={() => handleConfirmPayment(payment._id)}
                          className="flex-1 px-4 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition shadow-sm"
                        >
                          Confirm Payment
                        </button>
                        <button
                          onClick={() => handleMarkDenied(payment._id)}
                          className="flex-1 px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition shadow-sm"
                        >
                          Payment Denied
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PaymentHistory;

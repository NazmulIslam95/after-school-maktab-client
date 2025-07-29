import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import Swal from "sweetalert2";

const PaymentPage = () => {
  const { state } = useLocation();
  const [paymentMethod, setPaymentMethod] = useState("bkash");
  const [transactionId, setTransactionId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [senderInfo, setSenderInfo] = useState("");
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setStudentName(user.displayName || "");
      setStudentEmail(user.email || "");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const purchaseData = {
      courseId: state.courseId,
      courseName: state.courseName,
      type: state.type,
      price: state.price,
      duration: state.duration,
      days: state.days,
      confirmed: false,
      studentName,
      studentEmail,
      paymentMethod,
      transactionId,
      senderInfo,
    };

    try {
      const res = await axiosSecure.post("/purchase", purchaseData);

      if (res.data?.success) {
        Swal.fire({
          icon: "success",
          title: "Request Submitted!",
          text: "Your Course Request Has Been Successfully Submitted.",
          confirmButtonColor: "#0d3e93",
        }).then(() => {
          navigate("/");
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      console.error("Purchase error:", error);
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Unable to process the request right now.",
      });
    }
  };

  const paymentAccounts = {
    bkash: "01312345678 (Personal)",
    nagad: "01412345678 (Personal)",
    rocket: "01512345678 (DBBL)",
    bank: "Bank Name: Islami Bank\nAccount No: 123456789\nBranch: Motijheel",
  };

  const renderAccountInfo = () => {
    const info = paymentAccounts[paymentMethod];
    if (!info) return null;

    return (
      <div className="bg-gray-100 p-3 rounded text-sm text-gray-700 border border-dashed border-gray-400 mb-4 whitespace-pre-wrap">
        <strong>{paymentMethod.toUpperCase()} Payment Info:</strong>
        <br />
        {info}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-2xl text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 mt-10 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold text-[#0d3e93] mb-4">
        Get Admission
      </h2>

      <div className="mb-4">
        <p>
          <strong>Course:</strong> {state.courseName}
        </p>
        <p>
          <strong>Type:</strong> {state.type}
        </p>
        {state.type === "1-to-1" && (
          <>
            <p>
              <strong>Duration:</strong> {state.duration}
            </p>
            <p>
              <strong>Days:</strong> {state.days}
            </p>
          </>
        )}
        <p>
          <strong>Price:</strong> ${state.price}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Your Name</label>
          <input
            type="text"
            readOnly
            value={studentName}
            className="border w-full px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Your Email</label>
          <input
            type="text"
            readOnly
            value={studentEmail}
            className="border w-full px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Payment Method</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="border w-full px-3 py-2 rounded"
          >
            <option value="bkash">bKash</option>
            <option value="nagad">Nagad</option>
            <option value="rocket">Rocket</option>
            <option value="bank">Bank Transfer</option>
          </select>
        </div>

        {renderAccountInfo()}

        <div>
          <label className="block mb-1 font-medium">Transaction ID</label>
          <input
            type="text"
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
            required
            className="border w-full px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Sender Mobile Number / Account No.
          </label>
          <input
            type="text"
            value={senderInfo}
            onChange={(e) => setSenderInfo(e.target.value)}
            required
            className="border w-full px-3 py-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#0d3e93] text-white px-6 py-2 rounded-md font-semibold hover:bg-white hover:text-[#0d3e93] border hover:border-[#0d3e93]"
        >
          Request Admission
        </button>
      </form>
    </div>
  );
};

export default PaymentPage;

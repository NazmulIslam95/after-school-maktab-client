import DashboardBanner from "../../../Components/DashboardBanner/DashboardBanner";
import { MdPerson } from "react-icons/md";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import { toast } from "react-toastify";
import useAllPurchase from "../../../CustomHooks/useAllPurchase";
import Swal from "sweetalert2";

const Orders = () => {
  const axiosSecure = useAxiosSecure();
  const { purchases, refetch, loading } = useAllPurchase();

  const notifySuccess = () => toast.success("Course Purchase Is Confirmed!");
  const notifyError = () => toast.error("Failed to Confirm Course Purchase");

  const handleConfirm = async (id) => {
    try {
      const res = await axiosSecure.patch(`/purchases/confirm/${id}`);
      if (res.data.success) {
        notifySuccess();
        refetch();
      } else {
        notifyError();
      }
    } catch (error) {
      console.error(error);
      notifyError();
    }
  };

  const handleDeny = async (id) => {
    try {
      const res = await axiosSecure.patch(`/purchases/deny/${id}`);
      if (res.data.success) {
        Swal.fire("Denied!", "The purchase has been denied.", "info");
        refetch();
      } else {
        Swal.fire("Failed!", res.data.message || "Could not deny.", "error");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error!", "Something went wrong.", "error");
    }
  };

  return (
    <div>
      <DashboardBanner title="All Orders" subTitle="orders" />

      {loading ? (
        <div className="text-center py-12 font-semibold text-gray-600">
          Loading...
        </div>
      ) : (
        <div className="overflow-x-auto shadow rounded-lg mx-4 my-8">
          <table className="min-w-full bg-white text-sm table-zebra">
            <thead className="bg-gray-800 text-white text-left">
              <tr>
                <th className="px-3 py-2">No.</th>
                <th className="px-3 py-2">Student</th>
                <th className="px-3 py-2">Course</th>
                <th className="px-3 py-2">Type</th>
                <th className="px-3 py-2">Price</th>
                <th className="px-3 py-2">Duration</th>
                <th className="px-3 py-2">Days</th>
                <th className="px-3 py-2">Payment Info</th>
                <th className="px-3 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {purchases.length > 0 ? (
                purchases.map((purchase, index) => (
                  <tr
                    key={purchase._id}
                    className="even:bg-gray-50 hover:bg-gray-100"
                  >
                    <td className="px-3 py-2 font-semibold">{index + 1}</td>
                    <td className="px-3 py-2">
                      <p className="font-medium flex items-center gap-1">
                        <MdPerson /> {purchase.studentName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {purchase.studentEmail}
                      </p>
                    </td>
                    <td className="px-3 py-2">{purchase.courseName}</td>
                    <td className="px-3 py-2 capitalize">{purchase.type}</td>
                    <td className="px-3 py-2 text-green-600 font-bold gap-1">
                      ${purchase.price}
                    </td>
                    <td className="px-3 py-2">{purchase.duration}</td>
                    <td className="px-3 py-2">{purchase.days}</td>
                    <td className="px-3 py-2 text-sm">
                      <p>
                        <span className="font-semibold">Method:</span>{" "}
                        {purchase.paymentMethod}
                      </p>
                      <p>
                        <span className="font-semibold">Txn ID:</span>{" "}
                        {purchase.transactionId}
                      </p>
                      <p>
                        <span className="font-semibold">Sender:</span>{" "}
                        {purchase.senderInfo}
                      </p>
                    </td>
                    <td className="px-3 py-2 text-center">
                      {purchase.confirmed ? (
                        <span className="text-green-600 font-semibold">
                          Confirmed
                        </span>
                      ) : purchase.denied ? (
                        <span className="text-red-600 font-semibold">
                          Denied
                        </span>
                      ) : (
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleConfirm(purchase._id)}
                            className="btn btn-sm btn-success"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => handleDeny(purchase._id)}
                            className="btn btn-sm btn-error"
                          >
                            Deny
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center py-6 text-gray-500">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;

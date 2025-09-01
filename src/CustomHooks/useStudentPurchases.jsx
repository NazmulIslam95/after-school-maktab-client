/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { toast } from "react-toastify";
import useAuth from "./useAuth";

const useStudentPurchases = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPurchases = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const response = await axiosSecure.get(
        `/myPurchases?email=${user.email}`
      );
      setPurchases(response.data);
    } catch (error) {
      console.error("Error fetching student purchases:", error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        toast.error("Unauthorized access to purchases. Please log in again.");
      } else {
        toast.error("Failed to fetch purchases.");
      }
      setPurchases([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPurchases();
  }, [user, axiosSecure]);

  return { purchases, loading, refetch: fetchPurchases };
};

export default useStudentPurchases;

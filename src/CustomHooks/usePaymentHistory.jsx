import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const usePaymentHistory = () => {
  const axiosSecure = useAxiosSecure();

  const fetchPayment = async () => {
    const response = await axiosSecure.get("/payments");
    return response.data;
  };

  const {
    data: payments = [],
    isLoading: loading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["payment"],
    queryFn: fetchPayment,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });

  return { payments, loading, error, refetch };
};

export default usePaymentHistory;

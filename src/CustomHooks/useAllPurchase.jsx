import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAllPurchase = () => {
  const axiosSecure = useAxiosSecure();

  const fetchPurchases = async () => {
    const response = await axiosSecure.get("/allPurchase");
    return response.data;
  };

  const {
    data: purchases = [],
    isLoading: loading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["purchases"],
    queryFn: fetchPurchases,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });

  return { purchases, loading, error, refetch };
};

export default useAllPurchase;

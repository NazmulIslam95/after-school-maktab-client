import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAllDemoReq = () => {
  const axiosSecure = useAxiosSecure();

  const fetchAllDemoReq = async () => {
    const response = await axiosSecure.get("/demoBookings");
    return response.data;
  };

  const {
    data: allDemoReq = [],
    isLoading: loading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["allDemoReq"],
    queryFn: fetchAllDemoReq,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });

  return { allDemoReq, loading, error, refetch };
};

export default useAllDemoReq;

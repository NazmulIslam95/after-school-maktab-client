import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useRecentStudents = () => {
  const axiosPublic = useAxiosPublic();

  const fetchRecentStudents = async () => {
    const response = await axiosPublic.get("/recentStudents");
    return response.data;
  };

  const {
    data: recentStudents = [],
    isLoading: loading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["recentStudents"],
    queryFn: fetchRecentStudents,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });

  return { recentStudents, loading, error, refetch };
};

export default useRecentStudents;

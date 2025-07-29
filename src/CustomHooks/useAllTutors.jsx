import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAllTutors = () => {
  const axiosSecure = useAxiosSecure();

  const fetchTutors = async () => {
    const response = await axiosSecure.get("/allTutors");
    return response.data;
  };

  const {
    data: tutors = [],
    isLoading: loading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["tutors"],
    queryFn: fetchTutors,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });

  return { tutors, loading, error, refetch };
};

export default useAllTutors;
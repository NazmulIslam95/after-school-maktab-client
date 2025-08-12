import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAllTutors = () => {
  const axiosPublic = useAxiosPublic();

  const fetchTutors = async () => {
    const response = await axiosPublic.get("/allTutors");
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

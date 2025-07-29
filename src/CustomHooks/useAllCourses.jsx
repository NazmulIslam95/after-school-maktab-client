import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useAllCourses = () => {
  const axiosPublic = useAxiosPublic();

  const fetchAllCourses = async () => {
    const response = await axiosPublic.get("/allCourses");
    return response.data;
  };

  const {
    data: allCourses = [],
    isLoading: loading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["allCourses"],
    queryFn: fetchAllCourses,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });

  return { allCourses, loading, error, refetch };
};

export default useAllCourses;

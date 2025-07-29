import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAllUsers = () => {
  const axiosSecure = useAxiosSecure();

  const fetchUsers = async () => {
    const response = await axiosSecure.get("/users");
    return response.data;
  };

  const {
    data: users = [],
    isLoading: loading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });

  return { users, loading, error, refetch };
};

export default useAllUsers;

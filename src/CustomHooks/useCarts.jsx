import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

const useCarts = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();

  const {
    refetch,
    data: carts = [],
    isLoading,
  } = useQuery({
    queryKey: ["carts", user?.email],
    enabled: !loading && !!user?.email, // ✅ only run when ready
    queryFn: async () => {
      const res = await axiosSecure(`/carts?email=${user.email}`);
      return res.data;
    },
  });

  return { carts, refetch, isLoading };
};

export default useCarts;

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useAdmin = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: isAdmin = false,
    isAdminLoading,
    error,
  } = useQuery({
    enabled: !!user?.email && !loading, // only run when user.email is available and not loading
    queryKey: ["isAdmin", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/user_isAdmin");
      return res.data.admin;
    },
  });

  if (error) {
    console.error("Error fetching admin status:", error);
  }

  return [isAdmin, isAdminLoading];
};

export default useAdmin;

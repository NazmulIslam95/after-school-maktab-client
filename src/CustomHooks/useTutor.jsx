import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

const useTutor = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: isTutor = false,
    isLoading: isTutorLoading,
    error,
  } = useQuery({
    enabled: !!user?.email && !loading,
    queryKey: ["isTutor", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/user_isTutor");
      return res.data?.tutor ?? false;
    },
  });

  if (error) {
    console.error("Error fetching tutor status:", error);
  }

  return [isTutor, isTutorLoading];
};
export default useTutor;

import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useTutor = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const {
    data: isTutor = false,
    isLoading: isTutorLoading,
    error,
  } = useQuery({
    enabled: !!user?.email && !loading,
    queryKey: ["isTutor", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/isTutor");
      return res.data?.tutor ?? false;
    },
  });

  if (error) {
    console.error("Error fetching tutor status:", error);
  }

  return [isTutor, isTutorLoading];
};
export default useTutor;
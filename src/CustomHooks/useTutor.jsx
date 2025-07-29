import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useTutor = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const {
    data: isTutor = false,
    isLoading,
    error,
  } = useQuery({
    enabled: !!user?.email && !loading, // only run when user.email is available and not loading
    queryKey: ["isTutor", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/isTutor");
      return res.data.admin;
    },
  });

  if (error) {
    console.error("Error fetching admin status:", error);
  }

  return [isTutor, isLoading];
};

export default useTutor;

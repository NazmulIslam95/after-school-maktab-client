// useCurrentUser.js
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";

const useCurrentUser = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const fetchCurrentUser = async () => {
    if (!user?.email) {
      console.warn("No user email available");
      throw new Error("No user email found");
    }
    const response = await axiosSecure.get("/users/me");
    console.log("User form Current User Hook:", response.data);
    return response.data;
  };

  const {
    data: currentUser = null,
    isLoading: loading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["currentUser", user?.email],
    queryFn: fetchCurrentUser,
    enabled: !!user?.email, // Only fetch if user email exists
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });

  return { currentUser, loading, error, refetch };
};

export default useCurrentUser;

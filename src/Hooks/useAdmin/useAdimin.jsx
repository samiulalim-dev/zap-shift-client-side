import { useQuery } from "@tanstack/react-query";
import { use } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import useAxiosSecure from "../AxiosSecure/useAxiosSecure";
import LoadingSpinner from "../../Components/Loading/LoadingSpinner";
import useUserRole from "../useUserRole/useUserRole";

const useAdmin = () => {
  const { user, loading } = use(AuthContext);
  const { role, roleLoading } = useUserRole();

  const axiosSecure = useAxiosSecure();

  const { data: isAdmin = false, isPending } = useQuery({
    queryKey: ["isAdmin", user?.email],
    enabled: role === "admin" && !roleLoading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/admin/${user?.email}`);
      return res.data.isAdmin;
    },
  });
  // console.log(isAdmin);
  return { isAdmin, isPending };
};

export default useAdmin;

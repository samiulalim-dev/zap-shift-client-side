import { useQuery } from "@tanstack/react-query";
import { use } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import useAxiosSecure from "../AxiosSecure/useAxiosSecure";
import useUserRole from "../useUserRole/useUserRole";
const useRider = () => {
  const { user, loading } = use(AuthContext);
  const { role, roleLoading } = useUserRole();
  const axiosSecure = useAxiosSecure();

  const { data: isRider = false, isLoading } = useQuery({
    queryKey: ["isRider", user?.email],
    enabled: role === "rider" && !roleLoading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/rider/${user?.email}`);
      return res.data.isRider;
    },
  });
  // console.log(isAdmin);
  return { isRider, isLoading };
};

export default useRider;

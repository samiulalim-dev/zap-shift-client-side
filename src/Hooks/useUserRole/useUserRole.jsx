// hooks/useUserRole.js
import { use, useContext, useEffect, useState } from "react";
import useAxiosSecure from "../AxiosSecure/useAxiosSecure";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const useUserRole = () => {
  const { user, loading } = use(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [role, setRole] = useState(null);
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    const fetchRole = async () => {
      if (user?.email && !loading) {
        try {
          const res = await axiosSecure.get(`/users/${user?.email}`);
          setRole(res.data.role); // 🎯 role set holo
        } catch (error) {
          console.error("Failed to fetch role", error);
        } finally {
          setRoleLoading(false);
        }
      }
    };
    fetchRole();
  }, [user, loading, axiosSecure]);

  return { role, roleLoading };
};

export default useUserRole;

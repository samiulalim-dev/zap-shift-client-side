import React from "react";
import LoadingSpinner from "../../../Components/Loading/LoadingSpinner";
import AdminDashboardHome from "./AdminDashboardHome";
import RiderDashboardHome from "./RiderDashboardHome";
import UserDashboardHome from "./UserDashboardHome";
import useUserRole from "../../../Hooks/useUserRole/useUserRole";

const DashboardHome = () => {
  const { role, roleLoading } = useUserRole();
  if (roleLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  //   console.log(role);
  if (role === "admin") {
    return <AdminDashboardHome></AdminDashboardHome>;
  }
  if (role === "rider") {
    return <RiderDashboardHome></RiderDashboardHome>;
  }
  return <UserDashboardHome></UserDashboardHome>;
};

export default DashboardHome;

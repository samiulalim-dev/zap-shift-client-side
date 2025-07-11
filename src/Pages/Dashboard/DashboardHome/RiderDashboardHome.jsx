import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import useAxiosSecure from "../../../Hooks/AxiosSecure/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../Components/Loading/LoadingSpinner";

const RiderDashboardHome = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const {
    data: summary = {},
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["riderSummary", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/rider/summary/${user.email}`);
      return res.data;
    },
  });
  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  if (isError) return <p>Error loading dashboard: {error.message}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      <div className="bg-blue-100 p-5 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-2">📦 Total Parcels</h2>
        <p className="text-3xl">{summary.totalParcels}</p>
      </div>
      <div className="bg-green-100 p-5 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-2">✅ Delivered</h2>
        <p className="text-3xl">{summary.deliveredParcels}</p>
      </div>
      <div className="bg-yellow-100 p-5 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-2">🚚 In-Transition</h2>
        <p className="text-3xl">{summary.inTransition}</p>
      </div>
      <div className="bg-purple-100 p-5 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-2">💰 My Earnings</h2>
        <p className="text-3xl">৳ {summary.earnings}</p>
      </div>
    </div>
  );
};

export default RiderDashboardHome;

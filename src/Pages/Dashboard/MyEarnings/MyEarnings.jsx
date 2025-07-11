import React, { use } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import useAxiosSecure from "../../../Hooks/AxiosSecure/useAxiosSecure";
import LoadingSpinner from "../../../Components/Loading/LoadingSpinner";

const MyEarnings = () => {
  const { user } = use(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: deliveries = [], isLoading } = useQuery({
    queryKey: ["riderDeliveries", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/rider/earnings/${user?.email}`);
      return res.data; // should contain deliveryDate, deliveryCost, etc.
    },
  });

  const calculateEarning = (parcel) => {
    const {
      senderRegion,
      senderServiceCenter,
      receiverRegion,
      receiverServiceCenter,
      cost,
    } = parcel;
    const isSameDistrict = senderServiceCenter === receiverServiceCenter;
    const isSameRegion = senderRegion === receiverRegion;

    if (isSameDistrict || isSameRegion) {
      return cost * 0.8; // 80% earn
    } else {
      return cost * 0.3; // 30% earn
    }
  };

  const getDateBasedEarning = (parcels, range) => {
    const now = new Date();

    return parcels
      .filter((p) => {
        const d = new Date(p.deliveredAt);
        if (range === "today") {
          return (
            d.getDate() === now.getDate() &&
            d.getMonth() === now.getMonth() &&
            d.getFullYear() === now.getFullYear()
          );
        }

        if (range === "week") {
          const firstDayOfWeek = new Date(now);
          firstDayOfWeek.setDate(now.getDate() - now.getDay());
          const lastDayOfWeek = new Date(firstDayOfWeek);
          lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);

          return d >= firstDayOfWeek && d <= lastDayOfWeek;
        }

        if (range === "month") {
          return (
            d.getMonth() === now.getMonth() &&
            d.getFullYear() === now.getFullYear()
          );
        }

        if (range === "year") {
          return d.getFullYear() === now.getFullYear();
        }

        return false;
      })
      .reduce((sum, p) => sum + calculateEarning(p), 0);
  };

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  const total = deliveries.reduce((sum, p) => sum + calculateEarning(p), 0);
  const cashedOut = deliveries
    .filter((p) => p.cashOutStatus === "cashed-out")
    .reduce((sum, p) => sum + calculateEarning(p), 0);
  const available = total - cashedOut;

  const todayEarning = getDateBasedEarning(deliveries, "today");
  const weeklyEarning = getDateBasedEarning(deliveries, "week");
  const monthlyEarning = getDateBasedEarning(deliveries, "month");
  const yearlyEarning = getDateBasedEarning(deliveries, "year");

  return (
    <div className="p-5 space-y-8">
      <h2 className="text-2xl font-bold">💼 My Earnings</h2>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-100 p-4 rounded-xl text-center shadow">
          <h4 className="text-xl font-semibold">Total Earnings</h4>
          <p className="text-3xl text-blue-700">{total.toFixed(2)}৳</p>
        </div>
        <div className="bg-green-100 p-4 rounded-xl text-center shadow">
          <h4 className="text-xl font-semibold">Cashed Out</h4>
          <p className="text-3xl text-green-700">{cashedOut.toFixed(2)}৳</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-xl text-center shadow">
          <h4 className="text-xl font-semibold">Available</h4>
          <p className="text-3xl text-yellow-600">{available.toFixed(2)}৳</p>
        </div>
      </div>

      {/* Earnings by Time */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-100 p-4 rounded-xl text-center shadow">
          <h4 className="text-sm font-bold">Today</h4>
          <p className="text-xl text-gray-800">{todayEarning.toFixed(2)}৳</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-xl text-center shadow">
          <h4 className="text-sm font-bold">This Week</h4>
          <p className="text-xl text-gray-800">{weeklyEarning.toFixed(2)}৳</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-xl text-center shadow">
          <h4 className="text-sm font-bold">This Month</h4>
          <p className="text-xl text-gray-800">{monthlyEarning.toFixed(2)}৳</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-xl text-center shadow">
          <h4 className="text-sm font-bold">This Year</h4>
          <p className="text-xl text-gray-800">{yearlyEarning.toFixed(2)}৳</p>
        </div>
      </div>

      {/* Transaction Table */}
      <div className="overflow-x-auto mt-6">
        <h3 className="text-xl font-semibold mb-2">📜 Transaction History</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Tracking ID</th>
              <th>Receiver</th>
              <th>Date</th>
              <th>Earning</th>
              <th>Cash Out?</th>
            </tr>
          </thead>
          <tbody>
            {deliveries.map((p) => (
              <tr key={p._id}>
                <td>{p.trackingId}</td>
                <td>{p.receiverName}</td>
                <td>{new Date(p.deliveryDate).toLocaleDateString()}</td>
                <td>{calculateEarning(p).toFixed(2)}৳</td>
                <td>
                  {p.cashOutStatus === "cashed-out" ? (
                    <span className="text-green-600 font-medium">✔️</span>
                  ) : (
                    <span className="text-yellow-600 font-medium">Pending</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyEarnings;

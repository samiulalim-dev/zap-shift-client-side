import React, { use, useState } from "react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import useAxiosSecure from "../../../Hooks/AxiosSecure/useAxiosSecure";
import LoadingSpinner from "../../../Components/Loading/LoadingSpinner";
import Swal from "sweetalert2";

const CompletedDeliveries = () => {
  const { user } = use(AuthContext);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { data: completedDeliveries = [], isLoading } = useQuery({
    queryKey: ["completedDeliveries", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/rider/completedDeliveries/${user?.email}`
      );
      return res.data;
    },
  });

  // ✅ Mutation: Mark parcel as picked-up
  const markAsPickedUpMutation = useMutation({
    mutationFn: async ({ parcelId }) => {
      const res = await axiosSecure.patch(`/parcels/cashOut/${parcelId}`);
      return res.data;
    },
    onSuccess: (data, { parcelId }) => {
      if (data.modifiedCount > 0) {
        Swal.fire(
          "✅ Success!",
          "Cashed out successfully complete. ",
          "success"
        );

        // cache update
        queryClient.setQueryData(
          ["completedDeliveries", user?.email],
          (oldData) =>
            oldData.map((parcel) =>
              parcel._id === parcelId
                ? { ...parcel, cashOutStatus: "cashed-out" }
                : parcel
            )
        );
      }
    },
    onError: () => {
      Swal.fire("❌ Error", "Failed cashOutStatus ", "error");
    },
  });

  // ✅ আয় হিসাব করার ফাংশন
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

  // ✅ total earn
  // const totalEarnings = completedDeliveries.reduce((sum, parcel) => {
  //   return sum + calculateEarning(parcel);
  // }, 0);

  const handleCashOut = async (parcel, parcelId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to cash out ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#22c55e",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Cash Out!",
    });

    if (result.isConfirmed) {
      // 🔔 যদি Backend সংযোগ থাকে তাহলে এখানে POST/PATCH করতে পারো
      markAsPickedUpMutation.mutate({ parcelId: parcelId });
    }
  };

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">✅ Completed Deliveries</h2>

      {completedDeliveries.length > 0 ? (
        <>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Tracking ID</th>
                  <th>Sender</th>
                  <th>Receiver</th>
                  <th>Cost (৳)</th>
                  <th>Your Earning (৳)</th>
                  <th>Cash Out</th>
                </tr>
              </thead>
              <tbody>
                {completedDeliveries.map((parcel) => (
                  <tr key={parcel._id}>
                    <td>{parcel.trackingId}</td>
                    <td>{parcel.senderName}</td>
                    <td>{parcel.receiverName}</td>
                    <td>{parcel.cost}৳</td>
                    <td className="text-green-600 font-semibold">
                      {calculateEarning(parcel).toFixed(2)}৳
                    </td>
                    <td>
                      {parcel.cashOutStatus === "cashed-out" ? (
                        <span className="bg-lime-400 px-3 py-2 rounded-2xl">
                          Cashed out
                        </span>
                      ) : (
                        <button
                          className="btn bg-lime-400"
                          onClick={() => handleCashOut(parcel, parcel._id)}
                        >
                          Cash Out
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* <p className="mt-6 text-right mr-3 text-xl font-bold text-green-700">
            🧮 Total Earnings: {totalEarnings.toFixed(2)}৳
          </p> */}
        </>
      ) : (
        <p className="text-gray-500">No completed deliveries found.</p>
      )}
    </div>
  );
};

export default CompletedDeliveries;

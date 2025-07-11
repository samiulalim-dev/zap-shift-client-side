import React, { use } from "react";
import useAxiosSecure from "../../../Hooks/AxiosSecure/useAxiosSecure";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingSpinner from "../../../Components/Loading/LoadingSpinner";
import Swal from "sweetalert2";

const PendingDelivery = () => {
  const { user } = use(AuthContext); // rider logged in
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const {
    data: pendingDeliveries = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["pendingDeliveries", user?.email],
    enabled: !!user?.uid,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/rider/pendingDeliveries/${user?.email}`
      );
      return res.data;
    },
  });

  // ✅ Mutation: Mark parcel as picked-up
  const markAsPickedUpMutation = useMutation({
    mutationFn: async ({ parcelId }) => {
      const res = await axiosSecure.patch(`/parcels/pickup/${parcelId}`);
      return res.data;
    },
    onSuccess: (data, { parcelId }) => {
      if (data.modifiedCount > 0) {
        Swal.fire("✅ Success!", "Parcel marked as Picked Up", "success");

        // cache update
        queryClient.setQueryData(
          ["pendingDeliveries", user?.email],
          (oldData) =>
            oldData.map((parcel) =>
              parcel._id === parcelId
                ? { ...parcel, deliveryStatus: "picked-up" }
                : parcel
            )
        );
      }
    },
    onError: () => {
      Swal.fire("❌ Error", "Failed to mark as picked up", "error");
    },
  });

  const handlePickUp = async (parcelId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to mark this parcel as Picked Up?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Picked Up!",
    });

    if (result.isConfirmed) {
      markAsPickedUpMutation.mutate({ parcelId: parcelId });
    }
  };

  const handleDeliver = async (parcelId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to mark this parcel as Delivered?",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Yes, Delivered!",
    });

    if (result.isConfirmed) {
      const res = await axiosSecure.patch(`/parcels/deliver/${parcelId}`);
      if (res.data.modifiedCount > 0) {
        Swal.fire("✅ Success!", "Parcel marked as Delivered", "success");
        refetch();
      }
    }
  };

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Pending Deliveries</h2>

      {pendingDeliveries.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Tracking ID</th>
                <th>Sender</th>
                <th>Receiver</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {pendingDeliveries.map((parcel) => (
                <tr key={parcel._id}>
                  <td>{parcel.trackingId}</td>
                  <td>{parcel.senderName}</td>
                  <td>{parcel.receiverName}</td>
                  <td className="text-warning">{parcel.deliveryStatus}</td>
                  <td>
                    {parcel.deliveryStatus === "in-transition" && (
                      <button
                        className="btn btn-warning"
                        onClick={() => handlePickUp(parcel._id, parcel)}
                      >
                        Mark as Picked Up
                      </button>
                    )}

                    {parcel.deliveryStatus === "picked-up" && (
                      <button
                        className="btn btn-success"
                        onClick={() => handleDeliver(parcel._id)}
                      >
                        Mark as Delivered
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No pending deliveries found.</p>
      )}
    </div>
  );
};

export default PendingDelivery;

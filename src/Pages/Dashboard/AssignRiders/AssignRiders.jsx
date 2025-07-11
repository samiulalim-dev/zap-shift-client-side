import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../Hooks/AxiosSecure/useAxiosSecure";
import LoadingSpinner from "../../../Components/Loading/LoadingSpinner";
import toast from "react-hot-toast";

const AssignRiders = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [regionRiders, setRegionRiders] = useState([]);

  const {
    data: assignableParcels = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["assignableParcels"],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcels/available/riders");
      return res.data;
    },
  });
  //   console.log(assignableParcels);

  const openAssignModal = async (parcel) => {
    setSelectedParcel(parcel);

    const { senderRegion, senderServiceCenter } = parcel;

    try {
      const res = await axiosSecure.get(
        `/riders?region=${senderRegion}&district=${senderServiceCenter}`
      );
      setRegionRiders(res.data);
      document.getElementById("assign_modal").showModal();
    } catch (error) {
      toast.error("Failed to load riders");
    }
  };

  const assignRider = async (parcelId, rider) => {
    // console.log(rider.email);
    try {
      const res = await axiosSecure.patch(`/parcels/assign/${parcelId}`, {
        riderId: rider._id,
        riderName: rider.name,
        riderEmail: rider.email,
      });

      if (res.data.success) {
        toast.success("Rider assigned successfully!");
        document.getElementById("assign_modal").close();
        refetch(); // update parcel list
      } else {
        toast.error("Failed to assign rider");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  if (!assignableParcels.length) {
    return <p className="text-center p-4">No assignable parcels found.</p>;
  }
  return (
    <div>
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Tracking ID</th>
            <th>Receiver</th>
            <th>Location</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {assignableParcels.map((parcel, index) => (
            <tr key={parcel._id}>
              <td>{index + 1}</td>
              <td>{parcel.trackingId}</td>
              <td>{parcel.receiverName}</td>
              <td>
                {parcel.senderRegion}, {parcel.senderServiceCenter}
              </td>
              <td>
                <span className="badge badge-warning">
                  {parcel.deliveryStatus}
                </span>
              </td>
              <td>
                <button
                  className="btn btn-sm btn-success"
                  onClick={() => openAssignModal(parcel)}
                >
                  Assign Rider
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedParcel && (
        <dialog id="assign_modal" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-2">
              Assign Rider for Parcel #{selectedParcel.trackingId}
            </h3>

            {regionRiders.length ? (
              regionRiders.map((rider) => (
                <div
                  key={rider._id}
                  className="border p-3 rounded mb-3 flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold">{rider.name}</p>
                    <p className="text-sm text-gray-500">{rider.contact}</p>
                    <p className="text-sm">
                      {rider.senderRegion}, {rider.senderServiceCenter}
                    </p>
                  </div>
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => assignRider(selectedParcel._id, rider)}
                  >
                    Assign
                  </button>
                </div>
              ))
            ) : (
              <p className="text-warning mt-3">
                No rider found in this region.
              </p>
            )}

            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default AssignRiders;

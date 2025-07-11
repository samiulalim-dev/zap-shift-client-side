import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/AxiosSecure/useAxiosSecure";
import LoadingSpinner from "../../../Components/Loading/LoadingSpinner";

const ActiveRiders = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: riders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["Active riders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/active");
      return res.data;
    },
  });

  const handleDisable = async (id) => {
    const confirm = await Swal.fire({
      title: "Disable Rider?",
      text: "Rider will be disabled and removed from active list.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, disable",
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.patch(`/riders/${id}`, {
          status: "disabled",
        });
        Swal.fire("Disabled!", "Rider has been disabled.", "success");
        refetch();
      } catch (error) {
        Swal.fire("Error!", "Could not disable rider.", "error");
      }
    }
  };
  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6 text-lime-600">Active Riders</h2>

      {riders.length === 0 ? (
        <p className="text-gray-500">No approved riders yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Region</th>
                <th>District</th>
                <th>Joined</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {riders.map((rider) => (
                <tr key={rider._id}>
                  <td>{rider.name}</td>
                  <td>{rider.email}</td>
                  <td>{rider.senderRegion}</td>
                  <td>{rider.senderServiceCenter}</td>

                  <td>{new Date(rider.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button
                      onClick={() => handleDisable(rider._id)}
                      className="btn btn-xs btn-warning"
                    >
                      Disable
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ActiveRiders;

import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/AxiosSecure/useAxiosSecure";
import LoadingSpinner from "../../../Components/Loading/LoadingSpinner";

const PendingRiders = () => {
  const [selectedRider, setSelectedRider] = useState(null);
  const axiosSecure = useAxiosSecure();

  // Fetch pending riders
  const {
    data: riders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["pendingRiders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/pending");
      return res.data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  // Approve Rider
  const handleApprove = async (id, email) => {
    try {
      await axiosSecure.patch(`/riders/${id}`, {
        status: "approved",
        email,
      });
      Swal.fire("Approved!", "Rider has been approved.", "success");
      refetch();
    } catch (err) {
      Swal.fire("Error!", "Could not approve rider.", "error");
    }
  };

  // Delete Rider
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This rider will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete!",
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.delete(`/riders/${id}`);
        Swal.fire("Deleted!", "Rider has been deleted.", "success");
        refetch();
      } catch (err) {
        Swal.fire("Error!", "Could not delete rider.", "error");
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Pending Riders</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Region</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider) => (
              <tr key={rider._id}>
                <td>{rider.name}</td>
                <td>{rider.email}</td>
                <td>
                  {rider.senderRegion},{rider.senderServiceCenter}
                </td>
                <td>{rider.status}</td>
                <td className="  flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2">
                  <button
                    onClick={() => setSelectedRider(rider)}
                    className="btn btn-xs btn-info"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleApprove(rider._id, rider.email)}
                    className="btn btn-xs btn-success"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleDelete(rider._id)}
                    className="btn btn-xs btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Rider Details Modal */}
      {selectedRider && (
        <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-gray-400 p-6 rounded-lg max-w-md w-full relative">
            <button
              onClick={() => setSelectedRider(null)}
              className="absolute top-2 right-3 text-xl font-bold text-gray-500 hover:text-red-500"
            >
              &times;
            </button>
            <h3 className="text-xl font-bold mb-2">Rider Details</h3>
            <p>
              <strong>Name:</strong> {selectedRider.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedRider.email}
            </p>
            <p>
              <strong>Age:</strong> {selectedRider.age}
            </p>
            <p>
              <strong>Region:</strong> {selectedRider.senderRegion}
            </p>
            <p>
              <strong>District:</strong> {selectedRider.senderServiceCenter}
            </p>
            <p>
              <strong>Contact:</strong> {selectedRider.contact}
            </p>
            <p>
              <strong>NID:</strong> {selectedRider.nid}
            </p>
            <p>
              <strong>Status:</strong> {selectedRider.status}
            </p>
            <p>
              <strong>Applied:</strong>{" "}
              {new Date(selectedRider.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingRiders;

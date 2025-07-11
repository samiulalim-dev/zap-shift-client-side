import React, { use } from "react";
import useAxiosSecure from "../../../Hooks/AxiosSecure/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import LoadingSpinner from "../../../Components/Loading/LoadingSpinner";

const Myparcel = () => {
  const { user } = use(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const {
    data: parcel = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["my-parcel", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });
  const handlePayment = (id) => {
    // console.log(id);
    navigate(`/dashboard/payment/${id}`);
  };
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/parcels/${id}`).then((res) => {
          if (res.data.deletedCount) {
            Swal.fire({
              title: "Deleted!",
              text: "Your parcel has been deleted.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };
  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  //   console.log(parcel);
  return (
    <div className="  w-11/12 mx-auto my-10">
      <h2 className="text-4xl font-bold mb-4">📦 My Parcels</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border rounded">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-2">No.</th>
              <th className="p-2">Type</th>
              <th className="p-2">Title</th>
              <th className="p-2">Tracking Id</th>
              <th className="p-2">Created At</th>
              <th className="p-2">Cost</th>
              <th className="p-2">Payment</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcel.map((item, index) => (
              <tr key={item._id} className="border-t">
                <td className="p-2">{index + 1}</td>
                <td className="p-2 capitalize">{item.type}</td>
                <td className="p-2">{item.title}</td>
                <td className="p-2">{item.trackingId}</td>
                <td className="p-2">
                  {new Date(item.creation_date).toLocaleString()}
                </td>
                <td className="p-2">{item.cost}৳</td>
                <td className="p-2 capitalize">
                  {item.paymentStatus || "Pending"}
                </td>
                <td className="p-2 flex gap-4">
                  <button
                    className="text-blue-600 w-5 cursor-pointer hover:text-blue-800"
                    title="View"
                  >
                    <FaEye size={20} />
                  </button>
                  {item.paymentStatus === "paid" ? (
                    ""
                  ) : (
                    <button
                      onClick={() => handlePayment(item._id)}
                      className="text-yellow-500 cursor-pointer hover:text-yellow-700"
                      title="Edit"
                    >
                      <MdOutlinePayment size={25} />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-red-500 cursor-pointer hover:text-red-700"
                    title="Delete"
                  >
                    <FaTrash size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {parcel.length === 0 && (
          <p className="text-center mt-10 text-gray-600">No parcel found.</p>
        )}
      </div>
    </div>
  );
};

export default Myparcel;

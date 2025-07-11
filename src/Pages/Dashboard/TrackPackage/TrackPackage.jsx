import React, { useState } from "react";
import useAxiosSecure from "../../../Hooks/AxiosSecure/useAxiosSecure";
import Swal from "sweetalert2";
import {
  FaCheckCircle,
  FaMapMarkerAlt,
  FaTruck,
  FaBoxOpen,
} from "react-icons/fa";

const TrackParcel = () => {
  const axiosSecure = useAxiosSecure();
  const [trackingId, setTrackingId] = useState("");
  const [parcel, setParcel] = useState(null);

  const handleTrack = async () => {
    if (!trackingId) return;

    try {
      const res = await axiosSecure.get(`/parcels/track/${trackingId}`);
      setParcel(res.data);
    } catch (err) {
      setParcel(null);
      Swal.fire(
        "❌ Not Found",
        "No parcel found with this Tracking ID",
        "error"
      );
    }
  };

  const getStepClass = (status) => {
    switch (status) {
      case "pending":
        return 0;
      case "in-transition":
        return 1;
      case "picked-up":
        return 2;
      case "delivered":
        return 3;
      default:
        return 0;
    }
  };

  const currentStep = getStepClass(parcel?.deliveryStatus);

  return (
    <div className="w-11/12 mx-auto sm:max-w-2xl sm:mx-auto mt-10 p-6 bg-base-200 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">
        📦 Track Your Parcel
      </h2>

      <div className="flex gap-2 mb-6 ">
        <input
          type="text"
          placeholder="Enter Tracking ID"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          className="input input-bordered flex-1"
        />
        <button onClick={handleTrack} className="btn btn-primary">
          Track
        </button>
      </div>

      {parcel && (
        <div className="bg-white p-5 rounded shadow">
          <h3 className="text-xl font-semibold mb-2">
            Status:{" "}
            <span className="text-primary">
              {parcel.deliveryStatus ? parcel.deliveryStatus : "Pending..."}
            </span>
          </h3>

          {/* ✅ Progress Stepper */}
          <div className="flex justify-between items-center my-6">
            <div
              className={`flex flex-col items-center ${
                currentStep >= 0 ? "text-green-600" : "text-gray-400"
              }`}
            >
              <FaBoxOpen size={24} />
              <p className="text-sm mt-1">Pending</p>
            </div>
            <div className="h-1 w-10 bg-gray-300"></div>
            <div
              className={`flex flex-col items-center ${
                currentStep >= 1 ? "text-green-600" : "text-gray-400"
              }`}
            >
              <FaTruck size={24} />
              <p className="text-sm mt-1">In-Transition</p>
            </div>
            <div className="h-1 w-10 bg-gray-300"></div>
            <div
              className={`flex flex-col items-center ${
                currentStep >= 2 ? "text-green-600" : "text-gray-400"
              }`}
            >
              <FaMapMarkerAlt size={24} />
              <p className="text-sm mt-1">Picked-Up</p>
            </div>
            <div className="h-1 w-10 bg-gray-300"></div>
            <div
              className={`flex flex-col items-center ${
                currentStep >= 3 ? "text-green-600" : "text-gray-400"
              }`}
            >
              <FaCheckCircle size={24} />
              <p className="text-sm mt-1">Delivered</p>
            </div>
          </div>

          {/* ✅ Parcel Info */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            <p>
              <strong>Sender:</strong> {parcel.senderName}
            </p>
            <p>
              <strong>Receiver:</strong> {parcel.receiverName}
            </p>
            <p>
              <strong>From:</strong> {parcel.senderRegion} -{" "}
              {parcel.senderServiceCenter}
            </p>
            <p>
              <strong>To:</strong> {parcel.receiverRegion} -{" "}
              {parcel.receiverServiceCenter}
            </p>
            <p>
              <strong>Cost:</strong> ৳ {parcel.cost}
            </p>
            <p>
              <strong>
                Create at:{new Date(parcel.creation_date).toLocaleString()}
              </strong>
            </p>
            {parcel.assignedRider && (
              <p>
                <strong>Rider:</strong> {parcel.assignedRider.name}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackParcel;

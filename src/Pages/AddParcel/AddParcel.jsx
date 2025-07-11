import { use, useState } from "react";
import { set, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import useAxiosSecure from "../../Hooks/AxiosSecure/useAxiosSecure";
import axios from "axios";

const generateTrackingId = () => {
  const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const randomPart = Math.floor(1000 + Math.random() * 9000); // 4-digit
  return `PR-${datePart}-${randomPart}`;
};
const AddParcelForm = () => {
  const { user } = use(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { register, handleSubmit, watch, setValue, reset } = useForm({
    defaultValues: {
      type: "document",
    },
  });

  const warehouseData = useLoaderData();
  const [senderDistricts, setSenderDistricts] = useState([]);
  const [receiverDistricts, setReceiverDistricts] = useState([]);

  const watchType = watch("type");

  //   const calculateCost = (data) => {
  //     const weight = parseFloat(data.weight) || 0;
  //     const type = data.type;
  //     const isWithinCity = data.senderRegion === data.receiverRegion;

  //     if (type === "document") {
  //       return isWithinCity ? 60 : 80;
  //     }

  //     // Non-document condition
  //     if (weight <= 3) {
  //       return isWithinCity ? 110 : 150;
  //     } else {
  //       const extraWeight = weight - 3;
  //       const extraCharge = extraWeight * 40;
  //       if (isWithinCity) {
  //         return 110 + extraCharge;
  //       } else {
  //         return 150 + extraCharge + 40;
  //       }
  //     }
  //   };

  const onSubmit = (data) => {
    const trackingId = generateTrackingId();
    const weight = parseFloat(data.weight) || 0;
    const isWithinCity = data.senderRegion === data.receiverRegion;
    let baseCost = 0;
    let extraCost = 0;
    let totalCost = 0;
    let costBreakdown = "";

    if (data.type === "document") {
      baseCost = isWithinCity ? 60 : 80;
      totalCost = baseCost;
      costBreakdown = `📦 Type: Document\n🚚 Area: ${
        isWithinCity ? "Within City" : "Outside City"
      }\n💰 Cost: ৳${baseCost}`;
    } else {
      if (weight <= 3) {
        baseCost = isWithinCity ? 110 : 150;
        totalCost = baseCost;
        costBreakdown = `📦 Type: Non-Document\n⚖️ Weight: ${weight}kg (≤3kg)\n🚚 Area: ${
          isWithinCity ? "Within City" : "Outside City"
        }\n💰 Cost: ৳${baseCost}`;
      } else {
        const extraWeight = weight - 3;
        extraCost = extraWeight * 40;
        baseCost = isWithinCity ? 110 : 150;
        totalCost = baseCost + extraCost + (isWithinCity ? 0 : 40);
        costBreakdown = `📦 Type: Non-Document\n⚖️ Weight: ${weight}kg (>3kg)\n🚚 Area: ${
          isWithinCity ? "Within City" : "Outside City"
        }\n💳 Base: ৳${baseCost}\n➕ Extra Weight (${extraWeight}kg): ৳${extraCost}\n${
          isWithinCity ? "" : "➕ Outside City Extra: ৳40"
        }\n💰 Total: ৳${totalCost}`;
      }
    }

    Swal.fire({
      title: "Estimated Delivery Cost",
      html: `<pre style="text-align:left">${costBreakdown}</pre>`,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "✅ Confirm",
      cancelButtonText: "✏️ Edit Info",
      customClass: {
        popup: "rounded-xl",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const parcelInfo = {
          ...data,
          cost: totalCost,
          trackingId,
          email: user.email,
          creation_date: new Date().toISOString(),
          deliveryStatus: "not-collected",
        };
        console.log("Saved parcel:", parcelInfo);

        // ⬇️ API call to save can be added here
        axiosSecure.post("/parcels", parcelInfo).then((res) => {
          //   console.log(res.data);
          if (res.data.insertedId) {
            Swal.fire("✅ Success!", "Parcel info saved!", "success");
            reset();
          }
        });
      }
    });
  };

  return (
    <div className="w-11/12 my-10 mx-auto">
      <div className="">
        <h2 className="text-3xl font-bold mb-4">Add Parcel</h2>
        <div className=" divider"></div>
        <p className=" font-bold text-xl mb-4">Enter your parcel details</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className=" space-y-6">
        {/* Parcel Info */}
        <fieldset className="border p-4 rounded">
          <legend className="font-semibold">Parcel Info</legend>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input type="radio" value="document" {...register("type")} />{" "}
                Document
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="non-document"
                  {...register("type")}
                />{" "}
                Non-document
              </label>
            </div>
            <input
              {...register("title", { required: true })}
              placeholder="Parcel Title"
              className="border rounded px-2 py-1"
            />
            {watchType === "non-document" && (
              <input
                {...register("weight")}
                placeholder="Weight (kg)"
                className="border rounded px-2 py-1"
              />
            )}
          </div>
        </fieldset>

        {/* Sender & Receiver Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Sender Info */}
          <fieldset className="border p-4 rounded">
            <legend className="font-semibold">Sender Info</legend>
            <div className="space-y-2">
              <input
                {...register("senderName")}
                placeholder="Name"
                value={user?.displayName}
                className="border rounded px-2 py-1 bg-gray-100 w-full"
              />
              <input
                {...register("senderContact", { required: true })}
                placeholder="Contact"
                className="border rounded px-2 py-1 w-full"
              />
              <select
                {...register("senderRegion", { required: true })}
                className="border rounded px-2 py-1 w-full"
                onChange={(e) => {
                  const selectedRegion = e.target.value;
                  const matchedDistricts = warehouseData
                    .filter((item) => item.region === selectedRegion)
                    .map((item) => item.district);
                  const unique = [...new Set(matchedDistricts)];
                  setSenderDistricts(unique);
                  setValue("senderRegion", selectedRegion);
                }}
              >
                <option value="">Select Region</option>
                {[...new Set(warehouseData.map((item) => item.region))].map(
                  (region, i) => (
                    <option key={i} value={region}>
                      {region}
                    </option>
                  )
                )}
              </select>
              <select
                {...register("senderServiceCenter", { required: true })}
                className="border rounded px-2 py-1 w-full"
              >
                <option value="">Select Service Center</option>
                {senderDistricts.map((district, i) => (
                  <option key={i} value={district}>
                    {district}
                  </option>
                ))}
              </select>
              <input
                {...register("senderAddress", { required: true })}
                placeholder="Address"
                className="border rounded px-2 py-1 w-full"
              />
              <textarea
                {...register("senderInstruction", { required: true })}
                placeholder="Pick-up Instruction"
                className="border rounded px-2 py-1 w-full"
              />
            </div>
          </fieldset>

          {/* Receiver Info */}
          <fieldset className="border p-4 rounded">
            <legend className="font-semibold">Receiver Info</legend>
            <div className="space-y-2">
              <input
                {...register("receiverName", { required: true })}
                placeholder="Name"
                className="border rounded px-2 py-1 w-full"
              />
              <input
                {...register("receiverContact", { required: true })}
                placeholder="Contact"
                className="border rounded px-2 py-1 w-full"
              />
              <select
                {...register("receiverRegion", { required: true })}
                className="border rounded px-2 py-1 w-full"
                onChange={(e) => {
                  const selectedRegion = e.target.value;
                  const matchedDistricts = warehouseData
                    .filter((item) => item.region === selectedRegion)
                    .map((item) => item.district);
                  const unique = [...new Set(matchedDistricts)];
                  setReceiverDistricts(unique);
                  setValue("receiverRegion", selectedRegion);
                }}
              >
                <option value="">Select Region</option>
                {[...new Set(warehouseData.map((item) => item.region))].map(
                  (region, i) => (
                    <option key={i} value={region}>
                      {region}
                    </option>
                  )
                )}
              </select>
              <select
                {...register("receiverServiceCenter", { required: true })}
                className="border rounded px-2 py-1 w-full"
              >
                <option value="">Select Service Center</option>
                {receiverDistricts.map((district, i) => (
                  <option key={i} value={district}>
                    {district}
                  </option>
                ))}
              </select>
              <input
                {...register("receiverAddress", { required: true })}
                placeholder="Address"
                className="border rounded px-2 py-1 w-full"
              />
              <textarea
                {...register("receiverInstruction", { required: true })}
                placeholder="Delivery Instruction"
                className="border rounded px-2 py-1 w-full"
              />
            </div>
          </fieldset>
        </div>

        <div className="text-center">
          <button type="submit" className="bg-lime-400  px-6 btn">
            Submit Parcel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddParcelForm;

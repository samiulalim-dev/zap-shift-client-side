import React, { use, useState } from "react";
import { useForm } from "react-hook-form";
import agent from "../../assets/images/agent-pending.png";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/AxiosSecure/useAxiosSecure";

const BeARider = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { user } = use(AuthContext);
  const axiosSecure = useAxiosSecure();
  //   console.log(user);
  const warehouseData = useLoaderData();
  const [senderDistricts, setSenderDistricts] = useState([]);

  const onSubmit = async (data) => {
    // console.log("✅ Rider Form Data:", data);
    const riderData = {
      ...data,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    // console.log(riderData);

    try {
      const res = await axiosSecure.post("/riders", riderData);

      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Rider request submitted successfully!",
        });
        reset(); // Clear form
      }
    } catch (err) {
      if (err.response?.status === 409) {
        Swal.fire({
          icon: "warning",
          title: "Already Registered",
          text: "You already submitted a request!",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: "Something went wrong!",
        });
      }
    }
  };

  return (
    <div className="w-11/12 mx-auto bg-white my-10 rounded-3xl px-4 py-12 flex flex-col-reverse md:flex-row items-center gap-8">
      {/* Left: Form */}
      <div>
        <h2 className="text-4xl font-bold  mb-2">Be a Rider</h2>
        <p className="text-gray-600 mb-6">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>

        <div className=" divider"></div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <h2 className=" text-2xl font-bold">Tell About Yourself</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <input
                type="text"
                value={user?.displayName}
                readOnly
                placeholder="Your Name"
                {...register("name", { required: true })}
                className="input input-bordered w-full"
              />
            </div>

            {/* Age */}
            <div>
              <input
                type="number"
                placeholder="Your age"
                {...register("age", { required: true, min: 18 })}
                className="input input-bordered w-full"
              />
              {errors.number && <p>Age number is required</p>}
              {errors.age && (
                <p className="text-red-500 text-sm">Age must be 18 or above</p>
              )}
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                readOnly
                value={user?.email}
                placeholder="Your Email"
                {...register("email", { required: true })}
                className="input input-bordered w-full"
              />
            </div>

            {/* NID */}
            <div>
              <input
                type="text"
                placeholder="NID No"
                {...register("nid", { required: true })}
                className="input input-bordered w-full"
              />
              {errors.nid && (
                <p className="text-red-500 text-sm">NID is required</p>
              )}
            </div>

            {/* Contact */}
            <div>
              <input
                type="text"
                placeholder="Contact"
                {...register("contact", { required: true })}
                className="input input-bordered w-full"
              />
              {errors.contact && (
                <p className="text-red-500 text-sm">
                  Contact number is required
                </p>
              )}
            </div>

            {/* Region */}
            <div>
              <select
                {...register("senderRegion", { required: true })}
                className="input input-bordered w-full"
                onChange={(e) => {
                  const selectedRegion = e.target.value;
                  const matchedDistricts = warehouseData
                    .filter((item) => item.region === selectedRegion)
                    .map((item) => item.district);
                  const unique = [...new Set(matchedDistricts)];
                  setSenderDistricts(unique);
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
            </div>
            {/* district */}
            <div className=" col-span-2">
              <select
                {...register("senderServiceCenter", { required: true })}
                className="input input-bordered w-full"
              >
                <option value="">Select Service Center</option>
                {senderDistricts.map((district, i) => (
                  <option key={i} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            className="btn bg-lime-400 hover:bg-lime-500 text-black mt-4 w-full"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>

      {/* Right: Image */}
      <div className="flex justify-center">
        <img
          src={agent}
          alt="Rider Illustration"
          className="max-w-xs md:max-w-md"
        />
      </div>
    </div>
  );
};

export default BeARider;

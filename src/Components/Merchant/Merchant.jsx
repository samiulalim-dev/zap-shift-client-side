import React from "react";
import location_merchant from "../../assets/images/location-merchant.png";

const Merchant = () => {
  return (
    <div className="  w-11/12 mx-auto border-gray-400 border-t-4 border-dashed">
      <div className=" my-10 mt-20 bg-[url('assets/images/be-a-merchant-bg.png')] bg-no-repeat  bg-[#03373D] rounded-2xl">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img src={location_merchant} className=" rounded-lg shadow-2xl" />
          <div className=" p-16">
            <h1 className="text-3xl text-white font-bold">
              Merchant and Customer Satisfaction <br /> is Our First Priority
            </h1>
            <p className="py-6 text-white">
              We offer the lowest delivery charge with the highest value along
              with 100% safety of your product. Pathao courier delivers your
              parcels in every corner of Bangladesh right on time.
            </p>
            <div className=" md:flex flex-col md:flex-row items-center gap-8">
              <button className="rounded-full mb-4 md:mb-0 btn bg-[#CAEB66] ">
                Become a Merchant
              </button>
              <button className="rounded-full text-[#CAEB66] border-[#CAEB66] btn btn-outline  ">
                Earn with Profast Courier
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Merchant;

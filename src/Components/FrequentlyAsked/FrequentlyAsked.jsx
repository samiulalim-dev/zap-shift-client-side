import React from "react";

const FrequentlyAsked = () => {
  return (
    <div className=" w-11/12 mx-auto my-10">
      <div className=" text-center ">
        <h2 className=" text-2xl md:text-4xl font-bold">
          Frequently Asked Question (FAQ)
        </h2>
        <p className=" my-5 text-gray-500">
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro. Achieve proper alignment, reduce <br /> pain, and strengthen your
          body with ease!
        </p>
      </div>
      <div>
        <div className="collapse collapse-arrow bg-base-100 border border-base-300">
          <input type="radio" name="my-accordion-2" defaultChecked />
          <div className="collapse-title font-semibold">
            How long does delivery take?
          </div>
          <div className="collapse-content text-sm">
            We usually deliver within 24–72 hours depending on the destination.
            Express delivery is available in Dhaka within 4–6 hours.
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-100 border border-base-300">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title font-semibold">
            Which areas do you deliver to?
          </div>
          <div className="collapse-content text-sm">
            We deliver all over Bangladesh — including Dhaka, Chattogram,
            Sylhet, Khulna, Rajshahi, and remote areas.
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-100 border border-base-300">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title font-semibold">
            Do you offer Cash on Delivery (COD)?
          </div>
          <div className="collapse-content text-sm">
            Yes, we offer 100% secure Cash on Delivery service across
            Bangladesh. The collected amount is deposited to your account on
            time.
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-100 border border-base-300">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title font-semibold">
            Can I track my parcel in real-time?
          </div>
          <div className="collapse-content text-sm">
            Absolutely! You can use our Live Parcel Tracking feature to see the
            real-time location and status of your shipment. time.
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-100 border border-base-300">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title font-semibold">
            What is your return policy?
          </div>
          <div className="collapse-content text-sm">
            We offer reverse logistics, meaning customers can return or exchange
            products with full tracking and coordination with the seller.
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrequentlyAsked;

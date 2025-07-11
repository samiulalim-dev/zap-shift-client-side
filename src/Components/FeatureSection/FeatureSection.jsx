import React from "react";
import liveTracking from "../../assets/images/live-tracking.png";
import safeDelivery from "../../assets/images/safe-delivery.png";
import call_center from "../../assets/images/call_center.png";

const features = [
  {
    title: "Live Parcel Tracking",
    description:
      "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
    image: liveTracking,
  },
  {
    title: "100% Safe Delivery",
    description:
      "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
    image: safeDelivery,
  },
  {
    title: "24/7 Call Center Support",
    description:
      "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
    image: call_center,
  },
];

const FeatureCards = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="w-11/12 mx-auto px-4">
        <div className="grid gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-4 md:flex items-center gap-6 hover:shadow-lg transition"
            >
              {/* Left side image */}
              <div className="p-8 md:border-r-4 flex md:flex-none justify-center items-center border-gray-400 border-dashed  mb-4 md:mb-0">
                <img
                  data-aos="zoom-in"
                  src={feature.image}
                  alt={feature.title}
                  className="rounded-lg w-[192px]   object-cover"
                />
              </div>

              {/* Right side content */}
              <div className="md:w-2/3">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;

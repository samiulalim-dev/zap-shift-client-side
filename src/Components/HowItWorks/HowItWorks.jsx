import React from "react";
import {
  FaTruckPickup,
  FaMoneyCheckAlt,
  FaMapMarkedAlt,
  FaHandshake,
} from "react-icons/fa";

const howItWorks = [
  {
    title: "Booking Pick & Drop",
    icon: <FaTruckPickup className="text-4xl text-green-600 mb-3" />,
    description:
      "Easily schedule parcel pick-up from your location and get it delivered to any destination with our seamless booking system.",
  },
  {
    title: "Cash On Delivery",
    icon: <FaMoneyCheckAlt className="text-4xl text-green-600 mb-3" />,
    description:
      "Receive full payment on delivery. We ensure secure and verified cash collection from your customers.",
  },
  {
    title: "Delivery Hub",
    icon: <FaMapMarkedAlt className="text-4xl text-green-600 mb-3" />,
    description:
      "We operate multiple delivery hubs across the country to ensure fast and efficient logistics coverage.",
  },
  {
    title: "Booking SME & Corporate",
    icon: <FaHandshake className="text-4xl text-green-600 mb-3" />,
    description:
      "Dedicated solutions for SMEs and Corporate clients with personalized logistics and contract support.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 ">
      <div className="w-11/12 mx-auto px-4 text-center">
        <h2 className="text-4xl text-start font-bold  mb-4">How It Works</h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorks.map((item, index) => (
            <div
              key={index}
              className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-md transition text-center"
            >
              <div className="flex justify-center">{item.icon}</div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

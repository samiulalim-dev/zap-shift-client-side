import { Elements } from "@stripe/react-stripe-js";
import React from "react";
import CheckOutPayment from "./CheckOutPayment";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(import.meta.env.VITE_pulishable_key);
const Payment = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckOutPayment></CheckOutPayment>
    </Elements>
  );
};

export default Payment;

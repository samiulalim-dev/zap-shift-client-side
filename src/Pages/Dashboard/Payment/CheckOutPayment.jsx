import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import React, { use, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../../Hooks/AxiosSecure/useAxiosSecure";
import LoadingSpinner from "../../../Components/Loading/LoadingSpinner";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";

const CheckOutPayment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = use(AuthContext);
  //   console.log(id);
  const axiosSecure = useAxiosSecure();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { data: parcelInfo = {}, isLoading } = useQuery({
    queryKey: ["parcelInfo", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${id}`);
      return res.data;
    },
  });

  const amount = parcelInfo.cost;
  //   console.log(amount);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }
    setLoading(true);
    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }
    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      setError(error.message);
    } else {
      // console.log("PaymentMethod", paymentMethod);
    }
    const res = await axiosSecure.post("/create-payment-intent", {
      amount,
      id,
    });
    const clientSecret = res.data.clientSecret;
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            email: user.email,
          },
        },
      });

    if (confirmError) {
      console.log(confirmError.message);
    } else {
      if (paymentIntent.status === "succeeded") {
        const paymentInfo = {
          amount,
          transactionId: paymentIntent.id,
          email: user.email,
          id,
          status: "success",
          method: "Stripe",
        };
        console.log("Payment successful!", paymentIntent);
        // Save payment info to DB
        axiosSecure.post("/payments", paymentInfo).then((res) => {
          // console.log(res.data);
          if (res.data.insertedId) {
            // ✅ Show success alert
            setLoading(false);
            Swal.fire({
              title: "Payment Successful!",
              text: `Your transactionId : ${paymentIntent.id}`,
              icon: "success",
              confirmButtonText: "Go to My Parcels",
            }).then((result) => {
              if (result.isConfirmed) {
                // 🔁 Redirect after confirm
                navigate("/dashboard");
              }
            });
          }
        });
      }
    }
  };

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  //   console.log(parcelInfo);

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-base-200 p-5 rounded-xl max-w-md mx-auto my-10"
    >
      <CardElement></CardElement>
      <button
        className=" btn w-full bg-lime-400 "
        type="submit"
        disabled={!stripe || loading}
      >
        {loading ? "Processing..." : `Pay $ ${amount}`}
      </button>
      {error && <span className=" text-red-500">{error}</span>}
    </form>
  );
};

export default CheckOutPayment;

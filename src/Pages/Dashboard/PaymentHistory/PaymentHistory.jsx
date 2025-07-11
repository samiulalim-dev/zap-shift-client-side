import { useQuery } from "@tanstack/react-query";
import React, { use } from "react";
import useAxiosSecure from "../../../Hooks/AxiosSecure/useAxiosSecure";
import LoadingSpinner from "../../../Components/Loading/LoadingSpinner";
import { AuthContext } from "../../../AuthProvider/AuthProvider";

const PaymentHistory = () => {
  const { user } = use(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { isLoading, data: payments = [] } = useQuery({
    queryKey: ["paymentHistory", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });
  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  //   console.log(payments);
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Payment History</h2>

      {payments.length === 0 ? (
        <p>No payment records found.</p>
      ) : (
        <table className="table w-full border">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th>#</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Transaction ID</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={payment._id}>
                <td>{index + 1}</td>
                <td>৳{payment.amount}</td>
                <td>{payment.method}</td>
                <td>{payment.transactionId}</td>
                <td className="text-green-600 font-semibold">
                  {payment.status}
                </td>
                <td>{new Date(payment.paid_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PaymentHistory;

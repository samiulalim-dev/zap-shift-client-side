import { useQuery } from "@tanstack/react-query";
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];
const BAR_COLORS = ["#8884d8", "#ffc658", "#ff8042"];
// ✅ Icons
import {
  FaUsers,
  FaUserTie,
  FaBox,
  FaMoneyBillWave,
  FaTruck,
  FaHourglassHalf,
  FaCheckCircle,
  FaUserClock,
} from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/AxiosSecure/useAxiosSecure";
import LoadingSpinner from "../../../Components/Loading/LoadingSpinner";

const AdminDashboardHome = () => {
  const axiosSecure = useAxiosSecure();

  const { data = {}, isLoading } = useQuery({
    queryKey: ["adminDashboard"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/summary");
      return res.data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  const {
    totalUsers,
    totalRiders,
    totalParcels,
    totalPayments,
    pendingParcels,
    deliveredParcels,
    inTransition,
    pendingRiderRequests,
  } = data;

  const parcelData = [
    { name: "picked up", value: pendingParcels },
    { name: "Delivered", value: deliveredParcels },
    { name: "In-Transition", value: inTransition },
  ];

  const barChartData = [
    { name: "Users", count: totalUsers },
    { name: "Riders", count: totalRiders },
    { name: "Pending Rider Req", count: pendingRiderRequests },
  ];

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-4">📊 Admin Dashboard</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          title="Users"
          value={totalUsers}
          icon={<FaUsers className="text-blue-600" />}
          bg="bg-blue-100"
        />
        <StatCard
          title="Riders"
          value={totalRiders}
          icon={<FaUserTie className="text-purple-600" />}
          bg="bg-purple-100"
        />
        <StatCard
          title="Parcels"
          value={totalParcels}
          icon={<FaBox className="text-green-600" />}
          bg="bg-green-100"
        />
        <StatCard
          title="Payments"
          value={`৳${totalPayments}`}
          icon={<FaMoneyBillWave className="text-orange-600" />}
          bg="bg-orange-100"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Picked up Parcels"
          value={pendingParcels}
          icon={<FaHourglassHalf className="text-red-600" />}
          bg="bg-red-100"
        />
        <StatCard
          title="In-Transition"
          value={inTransition}
          icon={<FaTruck className="text-yellow-600" />}
          bg="bg-yellow-100"
        />
        <StatCard
          title="Delivered"
          value={deliveredParcels}
          icon={<FaCheckCircle className="text-lime-600" />}
          bg="bg-lime-100"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StatCard
          title="Pending Rider Requests"
          value={pendingRiderRequests}
          icon={<FaUserClock className="text-indigo-600" />}
          bg="bg-indigo-100"
        />
      </div>

      {/* pie chart */}

      <h2 className="text-2xl font-bold">📈 Admin Dashboard Charts</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-4">📦 Parcel Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={parcelData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {parcelData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-4">👥 Users & Riders</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barChartData}>
              <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" barSize={80}>
                {barChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={BAR_COLORS[index % BAR_COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

// ✅ Updated StatCard component
const StatCard = ({ title, value, icon, bg }) => (
  <div className={`p-4 rounded-xl ${bg} shadow flex items-center gap-4`}>
    <div className="text-3xl">{icon}</div>
    <div>
      <h4 className="text-sm font-semibold">{title}</h4>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);
export default AdminDashboardHome;
